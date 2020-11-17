FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn workspace @portaler/api-server install --non-interactive

RUN yarn build:api

ENV NODE_ENV production

CMD ["yarn", "start:api"]
