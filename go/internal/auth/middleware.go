package auth

import (
	"net/http"
	"strings"
)

func (c *Client) RequireValidToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !c.allowAll {
			token := strings.Replace(r.Header.Get("Authorization"), "Bearer ", "", 1)

			if !c.HaveUser(token) {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		}
		next.ServeHTTP(w, r)
	})
}
