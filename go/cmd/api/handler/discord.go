package handler

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/portaler-zone/portaler-core/go/internal/auth"
	"github.com/portaler-zone/portaler-core/go/internal/web/respond"
)

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	callback := url.QueryEscape("https://localhost:4000/callback")
	qparams := fmt.Sprintf(`client_id=%s&redirect_uri=%s&response_type=code&scope=identify+guilds+connections`, h.clientid, callback)
	redirect := fmt.Sprintf(`https://discord.com/api/oauth2/authorize?%s`, qparams)
	http.Redirect(w, r, redirect, http.StatusTemporaryRedirect)
}

func (h *Handler) CallBack(w http.ResponseWriter, r *http.Request) {
	data := url.Values{}
	data.Set("client_id", h.clientid)
	data.Set("client_secret", h.clientsecret)
	data.Set("grant_type", "authorization_code")
	data.Set("code", r.URL.Query().Get("code"))
	data.Set("redirect_uri", "https://localhost:4000/callback")
	data.Set("scope", "identify and guild")

	req, err := http.NewRequest(http.MethodPost, "https://discord.com/api/v6/oauth2/token", strings.NewReader(data.Encode()))
	if err != nil {
		respond.WithError(w, r, http.StatusInternalServerError, err)
		return
	}

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Authorization", "Basic "+basicAuth(h.clientid, h.clientsecret))

	client := http.DefaultClient
	resp, err := client.Do(req)
	if err != nil {
		respond.WithError(w, r, http.StatusInternalServerError, err)
		return
	}
	if resp.StatusCode != http.StatusOK {
		respond.WithError(w, r, http.StatusInternalServerError, err)
		return
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		respond.WithError(w, r, http.StatusInternalServerError, err)
		return
	}
	defer resp.Body.Close()

	var discordAuth auth.Discord
	err = json.Unmarshal(body, &discordAuth)
	if err != nil {
		respond.WithError(w, r, http.StatusInternalServerError, err)
		return
	}

	member, err := h.discordClient.GetMemberFromAuthToken(discordAuth.AccessToken)
	if err != nil {
		respond.WithError(w, r, http.StatusInternalServerError, err)
		return
	}

	if !member.HasRole(auth.PortalerRole) {
		respond.WithError(w, r, http.StatusUnauthorized, fmt.Errorf("user does not have portaler role"))
		return
	}

	h.authClient.AddUserToCache(auth.User{
		DiscordAuth: discordAuth,
		Info:        member,
	})

	respond.WithSuccess(w, r, http.StatusOK, respond.DefaultOK)
}

func basicAuth(username, password string) string {
	auth := username + ":" + password
	return base64.StdEncoding.EncodeToString([]byte(auth))
}
