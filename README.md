# <img src="/assets/logo/logo-32x32.png" /> Portaler

Portaler is a self hosted mapping tool for Avalonian Roads in Albion Online.

<img src="https://imgur.com/bSn5AC8" width="600px" alt="screenshot" />

## Monorepo

This is a monorepo utilizing [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). Individual applications can be found in the [packages](/packages) folder.

**NOTE:**
The backend is currently being transitioned over from Go. To setup the backend, follow the instructions found here:

https://github.com/Tebro/albion-mapper-backend

Once we move the backend, we will be providing full docker containers and docker-compose files to setup on your own server.

### Running the Frontend for development

Run from root of the project:

```
yarn
yarn dev:front
```

### Building the Frontend

Run from root of the project:

```
yarn
yarn build:frontend
```

The built application files can be found in `/packages/build`.

### Running the Backend for development

Run from root of the project:

```
yarn dev:api
```
