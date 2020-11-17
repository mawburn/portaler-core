FROM node:12-alpine as build

WORKDIR /usr/build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY packages/types  ./packages/types
COPY packages/data-models ./packages/data-models
COPY packages/discord-bot ./packages/discord-bot

RUN yarn workspace @portaler/types install --non-interactive --pure-lockfile
RUN yarn workspace @portaler/data-models install --non-interactive --pure-lockfile
RUN yarn workspace @portaler/discord-bot install --non-interactive --pure-lockfile

RUN yarn build:data
RUN yarn build:bot
RUN yarn clean

FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=build /usr/build/packages/data-models /usr/app/packages/data-models
COPY --from=build /usr/build/packages/discord-bot /usr/app/packages/discord-bot

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

CMD ["yarn", "start:bot"]
