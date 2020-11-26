FROM node:12-alpine as build

WORKDIR /usr/build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY shared ./shared
COPY packages/api-server ./packages/api-server

RUN yarn install --non-interactive --pure-lockfile

RUN yarn build:shared
RUN yarn build:api
RUN yarn clean

FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=build /usr/build/shared /usr/app/shared
COPY --from=build /usr/build/packages/api-server /usr/app/packages/api-server

ENV NODE_ENV production
ENV PORT 4242

RUN yarn install --pure-lockfile --non-interactive --production

EXPOSE 4242

CMD ["yarn", "start:api"]
