FROM node:12-alpine as build

WORKDIR /usr/build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY shared ./shared
COPY packages/bin-etl ./packages/bin-etl

RUN yarn install --non-interactive --pure-lockfile

RUN yarn build:shared
RUN yarn build:binetl
RUN yarn clean

FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=build /usr/build/shared /usr/app/shared
COPY --from=build /usr/build/packages/bin-etl /usr/app/packages/bin-etl

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

CMD ["yarn", "start:binetl"]
