# <img src="/assets/logo/logo-32x32.png" /> Portaler

[![Netlify Status](https://api.netlify.com/api/v1/badges/76c8bf82-cf50-4310-8121-8196249f49bc/deploy-status)](https://app.netlify.com/sites/portaler/deploys)

Portaler is a self hosted mapping tool for Avalonian Roads in Albion Online.

<img src="https://i.imgur.com/bSn5AC8.png" width="600px" alt="screenshot" />

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
yarn build:front
```

The built application files can be found in `/packages/build`.

### Running the Backend for development

_TBD_

---

## Supporting

If you'd like to buy me a coffee to help with server costs, feel free to support the project.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Q5Q42OP4V)

However, if you wish to donate on an ongoing basis I would rather you support the [Albion Data Project](https://www.albion-online-data.com/).

[<img width="200px" height="auto" src="https://i.imgur.com/ly3lalz.png" />](https://www.patreon.com/bePatron?u=10422119)

This is where most of our data comes from, as well as most other Albion fan tools or sites.
