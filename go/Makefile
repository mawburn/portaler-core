.DEFAULT_GOAL := all
all: vendor vet security test

server: # install and start up the api server
	go install ./... && api

cert:
	mkcert localhost
	mv localhost-key.pem key.pem
	mv localhost.pem certificate.pem

security:
	go get github.com/securego/gosec/cmd/gosec/...

test:
	go test -v -cover -race -count=1 ./...

vet:
	go vet -mod=vendor ./...

generate:
	go generate ./...

vendor:
	go mod tidy && go mod vendor

.PHONY: all security test vendor vet
