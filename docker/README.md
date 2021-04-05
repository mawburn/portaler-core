# Running Portaler Locally

Portaler is really not made to be ran locally or on your own server, but it can be done if you know your way around the tools. Portaler is open source to provide transparency and insight to other developers on what is going on.

1. Update the values in .env.example
2. Run `docker-compose up -d` from this folder.
3. After the first run, you may need to start and stop the api-server because the bin-etl need to suck down initial data. For ease you can just do: `docker-compose restart` to restart everything

You'll probably want to disable auth in the ENV file if you're running this locally.

The frontend needs to be ran separately and point to the api in its own .env file. You can run the frontend in dev mode with webpack dev server by running `yarn dev:front` from root, or building it with `yarn build:front` and serving the static files from the `build` folder from a web servers like nginx, apache, or anywhere that you can upload static web files like S3 or Netlify.
