package discord

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Member struct {
	ID       string `json:"id" msgpack:"id"`
	UserName string `json:"username" msgpack:"username"`
	Roles    []Role `json:"roles" msgpack:"roles"`
}

func (m Member) HasRole(roleName string) bool {
	for _, r := range m.Roles {
		if r.Name == roleName {
			return true
		}
	}
	return false
}

func (c *Client) GetMemberFromAuthToken(token string) (Member, error) {
	me, err := c.GetMe(token)
	if err != nil {
		return Member{}, fmt.Errorf("get me: %w", err)
	}

	return c.GetMember(me.ID)
}

func (c *Client) GetMember(id string) (Member, error) {
	discordMember, err := c.ds.GuildMember(c.serverid, id)
	if err != nil {
		return Member{}, fmt.Errorf("guild member: %w", err)
	}

	var roles []Role
	for _, rid := range discordMember.Roles {
		roles = append(roles, c.roles[rid])
	}

	mem := Member{
		ID:       discordMember.User.ID,
		UserName: discordMember.Nick,
		Roles:    roles,
	}

	return mem, nil
}

func (c *Client) GetMe(token string) (Member, error) {
	req, err := http.NewRequest(http.MethodGet, "https://discord.com/api/users/@me", nil)
	if err != nil {
		return Member{}, fmt.Errorf("new request: %w", err)
	}
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return Member{}, fmt.Errorf("do request: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return Member{}, fmt.Errorf("do request bad status code: %v", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return Member{}, fmt.Errorf("read body: %w", err)
	}

	var m Member
	err = json.Unmarshal(body, &m)
	if err != nil {
		return Member{}, fmt.Errorf("unmarshal body: %w", err)
	}

	return m, nil
}
