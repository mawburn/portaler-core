# <img src="/assets/logo/logo-32x32.png" /> Portaler

Portaler is a self hosted mapping tool for Avalonian Roads in Albion Online.

## Monorepo

This is a monorepo utilizing [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). Individual applications can be found in the [packages](/packages) folder.

**NOTE:**
The backend is currently being transitioned over from Go. To setup the backend, follow the instructions found here:

https://github.com/Tebro/albion-mapper-backend

### Running the Frontend

```
yarn
yarn start:frontend
```

### Building the Frontend

```
yarn
yarn build:frontend
```

The built application files can be found in `/packages/build`.
