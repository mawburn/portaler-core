FROM node:12-alpine as build

RUN apk add yarn

WORKDIR /usr/src/build

COPY ../packages/api-server .
COPY ../yarn.lock .
COPY ../package.json .

RUN yarn install --pure-lockfile --non-interactive 

RUN yarn build:api

FROM node:12-alpine

RUN apk add yarn

WORKDIR /usr/src/app

COPY --from=build /src/src/buidl/api-server/package.json .
COPY --from=build /usr/src/build/api-server/out .

RUN yarn install --pure-lockfile --non-interactive --production

ENV NODE_ENV production

CMD ["yarn", "start"]
