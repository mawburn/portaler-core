package respond

import (
	"encoding/json"
	"net/http"
)

func WithSuccess(w http.ResponseWriter, r *http.Request, httpStatus int, body interface{}) {
	if ct := w.Header().Get("Content-Type"); ct == "" {
		w.Header().Set("Content-Type", "application/json")
	}

	w.WriteHeader(httpStatus)
	json.NewEncoder(w).Encode(body)
}

type success struct {
	Status string `json:"status"`
}

var (
	DefaultOK = success{
		Status: "success",
	}
)

type errResponse struct {
	Error     string `json:"error,omitempty"`
	ErrorCode string `json:"code,omitempty"`
	Status    int    `json:"status,omitempty"`
}

func WithError(w http.ResponseWriter, r *http.Request, httpStatus int, err error) {
	WithCodedError(w, r, httpStatus, "", err)
}

func WithCodedError(w http.ResponseWriter, r *http.Request, httpStatus int, code string, err error) {
	serr := http.StatusText(httpStatus)
	if err != nil {
		serr = err.Error()
	}

	if ct := w.Header().Get("Content-Type"); ct == "" {
		w.Header().Set("Content-Type", "application/json")
	}
	w.WriteHeader(httpStatus)

	json.NewEncoder(w).Encode(errResponse{
		Error:     serr,
		Status:    httpStatus,
		ErrorCode: code,
	})
}
