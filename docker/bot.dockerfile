FROM node:12 as build

WORKDIR /usr/src/app

COPY ../ .

RUN yarn install --non-interactive

RUN yarn build:bot

ENV NODE_ENV production

CMD ["yarn", "start:bot"]
