# Setting up your development environment

This doc should be a 1 stop shop for getting your local development environment setup.

- [File / Folder Structure](#file--folder-structure)
  - [Packages](#packages)
  - [Shared](#locally-shared-libraries)

## File & Folder Structure

First thing you should know is how the file and folder structure is setup. This will greatly help you work with this repo.

**Portaler Core** is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that utilizes [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to provide an easy way to manage this.

Individual applications can be found in the [/packages](../packages) folder. Portaler consists of 5 individual applications, all which can be worked on (mostly) independently and 3 or 4 shared services under [/shared](../shared)

### Packages

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

## Env Files & Needed Keys

To run everything in Portaler, you're going to need to understand environment files or `.env` files and you'll need to know what the different keys you'll need are and where to get them.

An `.env` file is simply contains variables that are usually machine wide or in secure stores when in production. Things such as secrets or API keys. For dev we usually use `.env` files for ease of use. There isn't anything fancy here, there is no `.env.production` or `.env.development` like you see in some projects, there are simply `.env.example` files which are example setups meant to be checked in and `.env` files that are ignored in the `.gitignore`.

Each package will or should have an `.env.example` file. The TL;DR is to simply copy this file to `.env` and start filling in the blanks.

```shell
cp .env.example .env
```

### List of all externals

To run the full stack you'll need keys from Discord and Github.

#### Getting Github Access Token

This is only needed for the `bin-etl` package, but if you're trying to use the API then you'll need to run this at least once to populate the database, or manually fill it in yourself.

[Creating a Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) is extremely easy. The `bin-etl` is reading from a public repo, so it needs **NO** scopes.

Click the screenshot below to see an example:

<p align="center">
  <a href="./github-token.png" target="_blank" rel="noopener">
    <img src="github-token-thumb.png" alt="github token example" />
  </a>
</p>

Once created, this token goes in your `/packages/bin-etl/.env` file as the variable `ACCESS_TOKEN=`.

ie:

```.env
WORLD_FILE_URL=https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/cluster/world.json
ACCESS_TOKEN=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
```

#### Getting Discord Configs

The Discord stuff is by far the most intense.
