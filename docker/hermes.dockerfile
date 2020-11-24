FROM node:12-alpine as build

WORKDIR /usr/build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY shared ./shared
COPY packages/hermes ./packages/hermes

RUN yarn install --non-interactive --pure-lockfile

RUN yarn build:api
RUN yarn clean

FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=build /usr/build/shared /usr/app/shared
COPY --from=build /usr/build/packages/hermes /usr/app/packages/hermes

ENV NODE_ENV production
ENV PORT 3434

RUN yarn install --pure-lockfile --non-interactive --production

EXPOSE 3434

CMD ["yarn", "start:hermes"]
