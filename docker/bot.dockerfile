FROM node:12-alpine as build

RUN apk add yarn

WORKDIR /usr/src/build

COPY ../packages/discord-bot .
COPY ../yarn.lock .
COPY ../package.json .

RUN yarn install --pure-lockfile --non-interactive --production

RUN yarn build:bot

FROM node:12-alpine

RUN apk add yarn

WORKDIR /usr/src/app

COPY --from=build /src/src/build/discord-bot/package.json .
COPY --from=build /usr/src/build/discord-bot/out .

RUN yarn install --pure-lockfile --non-interactive --production

ENV NODE_ENV production

CMD ["yarn", "start"]
