<p align="center">
  <img alt="portaler" src="https://portaler.zone/portaler-github.png" />
</p>

<p align="center">
  <img src="https://static.wikia.nocookie.net/enfuturama/images/0/0d/Hermes.png/revision/latest?cb=20170719011119" height="240px" />
</p>

# Portaler Hermes

Hermes is a maintenance bot that performs administrative tasks in the background.

Hermes is needed because it needs to perform actions while running as a single instance and keeps things running smooth. Originally, these tasks were run by the Discord bot simply because it usually runs as a single instance, but that's not really where they belong and those tasks should be abstracted to their own service.

## API

Hermes also tells the other services when they are good to go by checking the redis and postgres connections for them and providing a simple rest API they can check.

http://localhost:3434/health

Which returns `{ serverReady: true }`

The API will shut down after an hour, which should be plenty of time. It doesn't need to run forever. The backgorund services will keep running forever.

In the future Hermes could provide a ton of functionality like health checks, database backups, and alert scripts.
