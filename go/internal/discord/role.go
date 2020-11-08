package discord

import (
	"fmt"
)

type Role struct {
	ID   string `json:"id" msgpack:"id"`
	Name string `json:"name" msgpack:"name"`
}

func (c *Client) GetRoles() ([]Role, error) {
	discordRoles, err := c.ds.GuildRoles(c.serverid)
	if err != nil {
		return nil, fmt.Errorf("guild roles: %w", err)
	}
	var roles []Role
	for _, r := range discordRoles {
		roles = append(roles, Role{
			ID:   r.ID,
			Name: r.Name,
		})
	}
	return roles, nil
}

func (c *Client) reloadRoles() error {
	roles, err := c.GetRoles()
	if err != nil {
		return fmt.Errorf("get roles: %w", err)
	}

	c.mutex.Lock()
	c.roles = rolesToMap(roles)
	c.mutex.Unlock()

	return nil
}

func rolesToMap(roles []Role) map[string]Role {
	roleMap := make(map[string]Role)
	for _, r := range roles {
		roleMap[r.ID] = r
	}
	return roleMap
}
