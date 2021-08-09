<p align="center">
  <img alt="Portaler logo" src="https://portaler.zone/logo.png" />
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

Take a look at the project board here:  
https://github.com/Portaler-Zone/portaler-core/projects/1

Fork the Repo & Submit PRs! Lets do this people. As of this writing, Portaler supports over 20,000 unique users a month across 357 servers and we could probably grow to even larger than that! It's a good project to work on if you're looking for an open source project to contribute to. I look for good code quality and solid practices. We run on barely any hardware and I want to keep it that way.

<p align="center">
  <img alt="Unique Visitors" width="250px" height="117px" src="https://i.imgur.com/wFyf4cK.png" />
  <br />
  <img alt="Servers" width="250px" height="381px" src="https://i.imgur.com/5kcZ2Ll.png" />
</p>

I ([mawburn](https://github.com/mawburn)) love mentoring developers, so don't be afraid to ask "dumb" questions in our Discord channel [#contributors](https://discord.gg/QAjhJ4YNsD), because we all start somewhere and I probably haven't documented things that well. I'm more than open to helping people learn JS/TS/Node/React/whatever, so if you don't have direct experience here no worries! This is your time to learn.

---

**Contents**

- [What it is](#what-it-is)
- [About the codebase](#about-the-codebase)
- [Running](#running)
- [Supporting](#supporting)
- [Development](#development)
- [Self-hosting Guide](./selfhosting.md)

<br />

# What it is

Portaler is a mapping tool for Avalonian Roads in Albion Online, that provides real time private data to your guild or alliance. It is fully Albion TOS compliant, because every user action is completely manual and nothing is automatically pulled or scraped from the Albion client or network packets. This tool simply provides a clean way for guilds/alliances share roads mapping internally.

The data we use to populate information is collected from [Albion Data Project](https://www.albion-online-data.com/).

<p align="center">
  <img src="https://portaler.zone/screenshot.png" width="600px" alt="screenshot" />
</p>

---

### Monorepo

This is a monorepo utilizing [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). Individual applications can be found in the [packages](/packages) folder.

## About the codebase

We have split up the project into 2 main workspaces. Main Packages and Shared.

### Main Packages

Contained under packages/\* folder

- [api-server](/packages/api-server)
  - The main API server
- [bin-etl](/packages/bin-etl)
  - Checks for updates to the world.json file in https://github.com/broderickhyman/ao-bin-dumps
  - Populates the database with initial information or updates information when the world.json changes
- [discord-bot](/packages/discord-bot)
  - The discord bot that allows roles to be assigned to users
  - Also contains the database migration files
- [fontend](/packages/frontend)
  - The React frontend

### Locally shared libraries

Contained under the shared/\* folder

- [data-models](/shared/data-models)
  - A collection of commonly shared data functions and models for the database & redis
- [logger](/shared/logger)
  - An opinionated extension of Winston Logger that logs actions to the database
- [types](/shared/types)
  - Just simply typescript type definitions shared across the different packages
- [universal-utils](/shared/universal-utils)
  - A collection of common utilities that can be used in either the frontend or node servers

---

## Running

If you would like to run the project on your own server, we provide Dockerhub images and you can find a docker-compose.yml file in the [docker](/docker) folder. If you would like to just run the project, you do not need to build the dockerfiles contained in the `./docker` folder, just simply update the `.env.example` file with your variables, the variables in the docker-compose.yml and run:

    docker-compose up -d

Links to our DockerHub images:

- [api-server](https://hub.docker.com/repository/docker/mawburn/portaler)
- [bin-etl](https://hub.docker.com/repository/docker/mawburn/portaler-etl)
- [discord-bot](https://hub.docker.com/repository/docker/mawburn/portaler-bot)

You will also need to create an application and a Discord developer account and get a Github access token.

- [Discord](https://discord.com/developers/docs/intro)
- [Github](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

---

## Supporting

[<img width="200px" height="auto" src="https://i.imgur.com/ly3lalz.png" />](https://www.patreon.com/portaler?fan_landing=true)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q42OP4V)

---

## Development

This project requires that you have yarn installed.

[Yarn installation instructions](https://classic.yarnpkg.com/en/docs/install/)

### Overview of root scripts

Be sure to check out the scripts we have provided in the root [package.json](./package.json) file, that will make your life easier.

There are a number of scripts that can be run from the root of the project that make life a little easier.

To run the following commands, from the root of the project simply type:

    yarn <command>

- `build:data` - Builds the shared/data-models package
- `build:logger` - Builds the shared/logger package
- `build:utils` - Builds the shared/universal-utils package
- `build:shared` - Builds both of the above concurrently
- `dev:api` - Starts the api-server in development mode
- `dev:bot` - Starts the discord-bot in development mode
- `dev:front` - Starts the frontend in development mode
- `dev:homepage` - Starts the Gatsby homepage in development mode
- `dev:binetl` - Starts the bin-etl in development mode
- `build:api` - Builds the api-server for production
- `build:bot` - Builds the dicsord-bot for production
- `build:binetl` - Builds the bin-etl for production
- `build:front` - Builds the frontend for production
- `build:homepage` - Builds the homepage for production
- `start:api` - Starts the api-server from production mode (must be built first)
- `start:bot` - Starts the discord-bot from production mode (must be built first)
- `start:bintetl` - Starts the bin-elt from production most (must be built first)
- `clean:shared` - Deletes the node_modules folder for all the shared/\* modules
- `clean:packages` - Deletes the node_modules folder for all the packages/\* modules
- `clean` - Deletes all node_modules folders everywhere
- `clean:out` - Deletes all built projects
- `clean:all` - Deletes all built projects & node_modules
- `lint` - Provides a lint output of all the files in the entire project
- `lint:fix` - Attempts to lint and fix all the files in the entire project
