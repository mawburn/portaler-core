FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn workspace @portaler/discord-bot install --non-interactive

RUN yarn build:bot

ENV NODE_ENV production

CMD ["yarn", "start:bot"]
