#!/bin/bash

sleep 30s
yarn start:hermes
sleep 45s
yarn start:api

nginx -g 'daemon off;'