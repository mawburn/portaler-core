
This repo is not actively maintained. I was hoping some of the community could take it over, but nobody has really stepped forward. It'll remain open source.

If you would like to continue development or deploying this, feel free to fork it.

[How to fork a repo](https://www.demiplane.com/).

Thank you all for your support.

----

# Portaler has been moved to community development

<p align="center">
  <img alt="Portaler logo" width="128px" height="128px" src="https://portaler.zone/logo.png" />
</p>

<p align="center">
  An Albion Online Avalonian Roads shared mapping tool
</p>

<p align="center">
  <a href="https://discord.gg/3GwNSgvR5g">
    <img alt="discord" src="https://portaler.zone/discord.png" />
  </a>
</p>

## Contents

- [What it is](#what-it-is)
- [Development](./docs/devsetup.md)
- [Running](#running)
  - [Self-hosting Guide](./docs/selfhosting.md)

# What it is

Portaler is a mapping tool for Avalonian Roads in Albion Online, that provides real time private data to your guild or alliance. It is fully Albion TOS compliant, because every user action is completely manual and nothing is automatically pulled or scraped from the Albion client or network packets. This tool simply provides a clean way for guilds/alliances share roads mapping internally.

The data we use to populate information is collected from [Albion Data Project](https://www.albion-online-data.com/).

<p align="center">
<a href="https://i.imgur.com/1J2Cxjh.png" target="_blank" rel="noopener nofollow noreferrer">
  <img src="https://i.imgur.com/8YGEFEy.png" alt="Screenshot" />
</a>
</p>

## Running

There is a full [Self-hosting Guide here](./docs/selfhosting.md), but a simple version can be found below.

If you would like to run the project on your own server, we provide DockerHub images and you can find a docker-compose.yml file in the [docker](/docker) folder. If you would like to just run the project, you do not need to build the docker files contained in the `./docker` folder, just simply update the `.env.example` file with your variables, the variables in the docker-compose.yml and run:

```sh
docker-compose up -d
```

To setup your .env files with keys, follow the [Github Token instructions here](./docs/devsetup#getting-a-github-access-token) and the [Discord instructions here](./docs/discord.md).

Links to our DockerHub images:

- [api-server](https://hub.docker.com/repository/docker/mawburn/portaler)
- [bin-etl](https://hub.docker.com/repository/docker/mawburn/portaler-etl)
- [discord-bot](https://hub.docker.com/repository/docker/mawburn/portaler-bot)

## Development

[Click here for Development Setup](./docs/devsetup.md)
