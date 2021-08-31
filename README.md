<p align="center">
  <img alt="Portaler logo" width="128px" height="128px" src="https://portaler.zone/logo.png" />
</p>

<p align="center">
  An Albion Online Avalonion Roads shared mapping tool
</p>

<p align="center">
  <a href="https://discord.gg/QAjhJ4YNsD">
    <img alt="discord" src="https://portaler.zone/discord.png" />
  </a>
</p>

## Looking for Contributors!

I don't have as much time to keep up with this as when I first built it. If you're a developer or a budding developer, I would love to have your help!

**[Get Setup Developing!](./docs/devsetup.md)**

Take a look at the project board here:  
https://github.com/Portaler-Zone/portaler-core/projects/1

Fork the Repo & Submit PRs! Lets do this people. As of this writing, Portaler supports over 20,000 unique users a month across 357 servers and we could probably grow to even larger than that! It's a good project to work on if you're looking for an open source project to contribute to. I look for good code quality and solid practices. We run on barely any hardware and I want to keep it that way.

<p align="center">
  <img alt="Unique Visitors" width="250px" height="117px" src="https://i.imgur.com/wFyf4cK.png" />
  <br />
  <img alt="Servers" width="250px" height="381px" src="https://i.imgur.com/5kcZ2Ll.png" />
</p>

I ([mawburn](https://github.com/mawburn)) love mentoring developers, so don't be afraid to ask "dumb" questions in our Discord channel [#contributing](https://discord.gg/QAjhJ4YNsD), because we all start somewhere and I probably haven't documented things that well. I'm more than open to helping people learn JS/TS/Node/React/whatever, so if you don't have direct experience here no worries! This is your time to learn.

---

**Contents**

- [What it is](#what-it-is)
- [Development](./docs/devsetup)
- [Running](#running)
  - [Self-hosting Guide](./selfhosting.md)

<br />

# What it is

Portaler is a mapping tool for Avalonian Roads in Albion Online, that provides real time private data to your guild or alliance. It is fully Albion TOS compliant, because every user action is completely manual and nothing is automatically pulled or scraped from the Albion client or network packets. This tool simply provides a clean way for guilds/alliances share roads mapping internally.

The data we use to populate information is collected from [Albion Data Project](https://www.albion-online-data.com/).

<p align="center">
<a href="https://i.imgur.com/1J2Cxjh.png" target="_blank" rel="noopener nofollow noreferrer">
  <img src="https://i.imgur.com/8YGEFEy.png" alt="Screenshot" />
</a>
</p>

## Running

There is a full [Self-hosting Guide here](./selfhosting.md), but a simple version can be found below.

If you would like to run the project on your own server, we provide Dockerhub images and you can find a docker-compose.yml file in the [docker](/docker) folder. If you would like to just run the project, you do not need to build the dockerfiles contained in the `./docker` folder, just simply update the `.env.example` file with your variables, the variables in the docker-compose.yml and run:

```sh
docker-compose up -d
```

To setup your .env files with keys, follow the [Github Token instructions here](./docs/devsetup#getting-a-github-access-token) and the [Discord instructions here](./docs/discord.md).

Links to our DockerHub images:

- [api-server](https://hub.docker.com/repository/docker/mawburn/portaler)
- [bin-etl](https://hub.docker.com/repository/docker/mawburn/portaler-etl)
- [discord-bot](https://hub.docker.com/repository/docker/mawburn/portaler-bot)

## Development

[Click here for Development Setup](./docs/devsetup)
