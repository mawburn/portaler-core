package discord

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/bwmarrin/discordgo"
	"github.com/sirupsen/logrus"
)

type Client struct {
	ds       *discordgo.Session
	serverid string
	token    string
	roles    map[string]Role

	httpClient *http.Client
	logger     *logrus.Logger
	mutex      sync.RWMutex
	ticker     *time.Ticker
	done       chan (bool)
}

func New(token string, serverid string, updateFreq time.Duration, logger *logrus.Logger) (*Client, error) {
	discord, err := discordgo.New("Bot " + token)
	if err != nil {
		return nil, fmt.Errorf("discordgo new: %w", err)
	}

	c := Client{
		ds:         discord,
		serverid:   serverid,
		logger:     logger,
		httpClient: http.DefaultClient,
	}

	if err := c.reloadRoles(); err != nil {
		return nil, fmt.Errorf("loading roles: %w", err)
	}

	c.ticker = time.NewTicker(updateFreq)
	go func() {
		for {
			select {
			case <-c.done:
				return
			case <-c.ticker.C:
				c.logger.Info("reloading role data")
				if err := c.reloadRoles(); err != nil {
					c.logger.WithError(err).Warn("reloading role data")
				}
			}
		}
	}()

	return &c, nil
}

func (c Client) GetGuildName(serverid string) (string, error) {
	guild, err := c.ds.Guild(serverid)
	if err != nil {
		return "", fmt.Errorf("guild: %w", err)
	}
	return guild.Name, nil
}
