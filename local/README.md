<p align="center">
  <img alt="portaler" src="https://portaler.zone/portaler-github.png" />
</p>

# Portaler Local

We build a distribute a special version of Portaler that is meant to run on your local machine and configured out of the box. However, there are some requirements that you'll need to be setup. Unfortunately, sometimes they can be tricky if you're on Windows, but it can be done.

## Docker

To deploy Portaler, we use docker and here you will find what's called a `docker-compose.yml` file. this is a magical file that will spin up several prebuilt services for you and run them on your local machine all in their own little containers. For running local, it's not that great, but it works and remember Portaler is built to be ran on a linux server as a web service.

### First, you'll need to install Docker itself:

https://docs.docker.com/get-docker/

Just simply follow the instructions to install docker on your local machine.

### Next you'll need to install Docker Compose

Windows users will need to download the exe from here:

https://github.com/docker/compose/releases

## Running Portaler

In this folder, you'll find a [docker-compose.yml file here](./docker-compose.yml).

Simply download or copy hte contents of this file, and move it to an area where you can access it with the command line and run:

    docker-compose up -d

And then once it's fully booted up, Portaler should be accessible from http://localhost:8042 and you're good to go using it locally with no authentication or discord bots needed!

## Updating Portaler

You should be able to update portaler through the Docker desktop you installed in the first step. We do not have a release schedule, but all stable releases will be under the release tag.

Happy mapping!
