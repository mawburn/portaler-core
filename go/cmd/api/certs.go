package main

import (
	"crypto/tls"
	"io/ioutil"

	"github.com/pkg/errors"
)

func loadCert() (tls.Certificate, error) {
	cert, err := loadFromFile("certificate.pem")
	if err != nil {
		return tls.Certificate{}, errors.Wrap(err, "error loading certificate")
	}

	key, err := loadFromFile("key.pem")
	if err != nil {
		return tls.Certificate{}, errors.Wrap(err, "error loading key")
	}

	tlscert, err := tls.X509KeyPair([]byte(cert), []byte(key))
	if err != nil {
		return tls.Certificate{}, errors.Wrap(err, "parse x509 key pair")
	}

	return tlscert, nil
}

func loadFromFile(n string) (string, error) {
	f, err := ioutil.ReadFile(n)
	if err != nil {
		return "", errors.Wrapf(err, "reading file: %s", n)
	}

	return string(f), nil
}
