FROM node:12 as build

WORKDIR /usr/src/app

COPY ../ .

RUN yarn install --non-interactive

RUN yarn build:api

ENV NODE_ENV production

CMD ["yarn", "start:api"]
