package handler

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	"github.com/pkg/errors"
	"github.com/portaler-zone/portaler-core/go/internal/discord"
	"github.com/sirupsen/logrus"
)

// Config is the config for the handler.
type Config struct {
	Logger        *logrus.Logger
	ClientID      string
	ClientSecret  string
	DiscordClient *discord.Client
}

// Handler is the global handler for the api.
type Handler struct {
	http.Handler

	clientid      string
	clientsecret  string
	discordClient *discord.Client
	logger        *logrus.Logger
}

func isValidConfig(c Config) error {
	if c.Logger == nil {
		return errors.New("logger cannot be nil")
	}
	return nil
}

// New returns a new handler.
func New(c Config) (*Handler, error) {
	if err := isValidConfig(c); err != nil {
		return nil, errors.Wrap(err, "invalid handler config")
	}

	h := Handler{
		logger:        c.Logger,
		clientid:      c.ClientID,
		clientsecret:  c.ClientSecret,
		discordClient: c.DiscordClient,
	}

	r := chi.NewRouter()

	// Middleware set up
	r.Use(middleware.Recoverer)

	r.Route("/", func(r chi.Router) {
		// set up routes
		r.Get("/login", h.Login)
		r.Get("/callback", h.CallBack)
	})
	r.Get("/health", h.health)

	h.Handler = r
	return &h, nil
}

func (h *Handler) health(w http.ResponseWriter, r *http.Request) {
	// Add any DB, Redis, or server pings here to have a full health check.
	render.JSON(w, r, struct {
		Health string `json:"health"`
	}{
		Health: "OK",
	})
}
