#!/bin/sh

echo "Starting services"
cd /usr/app && yarn start:api & nginx -g "daemon off;"
echo "Application running!"