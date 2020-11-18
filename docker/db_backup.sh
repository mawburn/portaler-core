#!/bin/bash

docker exec -t your-db-container pg_dumpall -c -U postgres | gzip > ./db/dump_`date +%d-%m-%Y"_"%H_%M_%S`.gz