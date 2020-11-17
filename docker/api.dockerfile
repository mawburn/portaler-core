FROM node:12-alpine as build

WORKDIR /usr/build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY packages/types  ./packages/types
COPY packages/data-models ./packages/data-models
COPY packages/api-server ./packages/api-server

RUN yarn workspace @portaler/types install --non-interactive --pure-lockfile
RUN yarn workspace @portaler/data-models install --non-interactive --pure-lockfile
RUN yarn workspace @portaler/api-server install --non-interactive --pure-lockfile

RUN yarn build:data
RUN yarn build:api
RUN yarn clean

FROM node:12-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY --from=build /usr/build/packages/data-models /usr/app/packages/data-models
COPY --from=build /usr/build/packages/api-server /usr/app/packages/api-server

ENV NODE_ENV production
ENV PORT 4242

RUN yarn install --pure-lockfile --non-interactive --production

EXPOSE 4242

CMD ["yarn", "start:api"]
