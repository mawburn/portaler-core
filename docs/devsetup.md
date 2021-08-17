# Setting up your development environment

This doc should be a 1 stop shop for getting your local development environment setup.

- [File / Folder Structure](#file--folder-structure)
  - [Packages](#packages)
  - [Shared](#locally-shared-libraries)
- [Using Workspaces](#yarn-workspaces)
- [Env Files & Needed Keys](#env-files--needed-keys)
  - [Github Token Setup](#getting-a-github-access-token)
  - [Discord Token Setup](#getting-discord-configs)
- [WORK FROM ROOT FIRST!](#root-first)
  - [Overview of Root Scripts](#overview-of-root-scripts)

## File & Folder Structure

First thing you should know is how the file and folder structure is setup. This will greatly help you work with this repo.

**Portaler Core** is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that utilizes [Yarn Workspaces](#yarn-workspaces) to provide an easy way to manage this.

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

## Install Yarn

Currently, this project requires Yarn 1.x to be installed for using workspaces.

[Yarn installation instructions](https://classic.yarnpkg.com/en/docs/install/)

NPM [released workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) in v7.x, but this has not been tested. `If you'd like to contribute to this section, feel free`.

If you'd like to know about Workspaces, both of the above links should provide enough explanation.

## Env Files & Needed Keys

To run everything in Portaler, you're going to need to understand environment files or `.env` files and you'll need to know what the different keys you'll need are and where to get them.

An `.env` file is simply contains variables that are usually machine wide or in secure stores when in production. Things such as secrets or API keys. For dev we usually use `.env` files for ease of use. There isn't anything fancy here, there is no `.env.production` or `.env.development` like you see in some projects, there are simply `.env.example` files which are example setups meant to be checked in and `.env` files that are ignored in the `.gitignore`.

Each package will or should have an `.env.example` file. The TL;DR is to simply copy this file to `.env` and start filling in the blanks.

```sh
cp .env.example .env
```

### Getting a Github Access Token

This is only needed for the `bin-etl` package, but if you're trying to use the API then you'll need to run this at least once to populate the database, or manually fill it in yourself.

[Creating a Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) is extremely easy. The `bin-etl` is reading from a public repo, so it needs **NO** scopes.

Click the screenshot below to see an example:

<a href="./github-token.png" target="_blank" rel="noopener">
  <img src="./github-token-thumb.png" alt="github token example" />
</a>

Once created, this token goes in your `/packages/bin-etl/.env` file as the variable `ACCESS_TOKEN=`.

ie:

```sh
WORLD_FILE_URL=https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/cluster/world.json

ACCESS_TOKEN=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
```

### Getting Discord Configs

The Discord stuff is by far the most intense. It's needed in the API and Discord Bot, and hopefully in the future Frontend when we have self-signup working (issues [#64](https://github.com/Portaler-Zone/portaler-core/issues/64) and [#65](https://github.com/Portaler-Zone/portaler-core/issues/65)).

Since this process is a little more involved, it has it's own tutorial here:

[Discord Token Setup](./discord.md)

\* _Note:_ If you're just working on the **frontend** you can simply configure the `.env` variables:

In `/packages/api/.env`:

```sh
# used for dev only
FRONTEND_PORT=3000
DISABLE_AUTH=true
```

In `/packages/frontend/.env`:

```sh
# Dev only
REACT_APP_AUTH=http://localhost:3000
REACT_APP_DISABLE_AUTH=true
```

## Root First

With the exception of installing new libraries, it's better and easier to work from the root directory. Working from individual directories can sometimes get weird.

External libraries are installed in their individual There are commands that allow you to install libraries from root, but they are verbose and annoying. Most people just `cd` into the correct directory and install normally. Yarn Workspaces will take care of the rest. The few packages installed at root are for development purposes only.

### Overview of Root Scripts

Be sure to check out the `"scripts": {}` we have provided in the root [package.json](./package.json) file, that will make your life easier.

There are a number of scripts that can be run from the root of the project that make life a little easier.

To run the following commands, from the root of the project simply type:

```sh
yarn <command>
```

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
