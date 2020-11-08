package auth

import (
	"time"

	goCache "github.com/patrickmn/go-cache"
	"github.com/portaler-zone/portaler-core/go/internal/discord"
)

type Client struct {
	userCache cache
}

type User struct {
	DiscordAuth Discord
	Info        discord.Member
}

func New(userTtl time.Duration) *Client {
	return &Client{
		userCache: goCache.New(userTtl, userTtl),
	}
}

func (c *Client) AddUserToCache(u User) {
	c.userCache.SetDefault(u.DiscordAuth.AccessToken, u)
}

func (c *Client) HaveUser(token string) bool {
	_, found := c.userCache.Get(token)
	return found
}
