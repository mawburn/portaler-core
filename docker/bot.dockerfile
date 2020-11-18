FROM node:12-alpine as build

WORKDIR /usr/build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY shared ./shared
COPY packages/discord-bot ./packages/discord-bot

RUN yarn install --non-interactive --pure-lockfile

RUN yarn build:bot
RUN yarn clean

FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=build /usr/build/shared /usr/app/shared
COPY --from=build /usr/build/packages/discord-bot /usr/app/packages/discord-bot

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production
RUN yarn global add forever

CMD ["forever", "start", "packages/discord-bot/out/index.js"]
