package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"github.com/pkg/errors"
	"github.com/portaler-zone/portaler-core/go/cmd/api/handler"
	"github.com/portaler-zone/portaler-core/go/internal/discord"
	"github.com/sirupsen/logrus"
)

type cfg struct {
	Port                int    `envconfig:"PORT" default:"4000"`
	Debug               bool   `envconfig:"DEBUG" default:"false"`
	ServerID            string `envconfig:"SERVER_ID" required:"true"`
	BotToken            string `envconfig:"BOT_TOKEN" required:"true"`
	DiscordClientID     string `envconfig:"CLIENT_ID" required:"true"`
	DiscordClientSecret string `envconfig:"CLIENT_SECRET" required:"true"`
}

var config cfg
var log *logrus.Logger

func init() {
	log = logrus.New()

	if err := godotenv.Load(); err != nil {
		log.Println(errors.Wrap(err, "no .env file loaded"))
	}

	if err := envconfig.Process("", &config); err != nil {
		log.Fatal(errors.Wrap(err, "envconfig process"))
	}

	if !config.Debug {
		log.SetFormatter(&logrus.JSONFormatter{})
	}
}

func main() {
	log.Println("Portaler Zone Mapping Server Now Starting!")

	cert, err := loadCert()
	if err != nil {
		log.Fatal(errors.Wrap(err, "loading cert"))
	}

	discordClient, err := discord.New(config.BotToken, config.ServerID, 15*time.Minute, log)
	if err != nil {
		log.WithError(err).Fatal("creatng new discord client")
	}

	// set up our global handler
	h, err := handler.New(handler.Config{
		Logger:        log,
		ClientID:      config.DiscordClientID,
		ClientSecret:  config.DiscordClientSecret,
		DiscordClient: discordClient,
	})
	if err != nil {
		log.Fatal(errors.Wrap(err, "handler new"))
	}

	server := &http.Server{
		Handler: h,
		Addr:    fmt.Sprintf(":%d", config.Port),
		TLSConfig: &tls.Config{
			Certificates: []tls.Certificate{cert},
		},
	}

	// do graceful server shutdown
	go gracefulShutdown(server, time.Second*30)

	log.Infof("listening on port %d", config.Port)
	if err := server.ListenAndServeTLS("", ""); err != http.ErrServerClosed {
		log.WithError(err).Fatal("cannot start a server")
	}
}

// gracefulShutdown shuts down our server in a graceful way.
func gracefulShutdown(server *http.Server, timeout time.Duration) {
	sigStop := make(chan os.Signal)

	signal.Notify(sigStop, syscall.SIGTERM, syscall.SIGINT, syscall.SIGKILL)

	<-sigStop

	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.WithError(err).Fatal("graceful shutdown failed")
	}

	log.Info("graceful shutdown complete")
}
