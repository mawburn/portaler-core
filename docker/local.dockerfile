FROM node:12-alpine as build

WORKDIR /usr/build

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY shared ./shared
COPY packages/api-server ./packages/api-server
COPY packages/frontend ./packages/frontend

ENV REACT_APP_DISABLE_AUTH true

RUN yarn install --non-interactive --pure-lockfile

RUN yarn build:shared
RUN yarn build:api
RUN yarn build:front
RUN yarn clean

FROM node:12-alpine

RUN apk update
RUN apk add nginx
RUN mkdir -p /run/nginx
RUN adduser -D -g 'www' www
RUN mkdir -p /www
RUN chown -R www:www /var/lib/nginx
RUN chown -R www:www /www

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY docker/all/nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=build /usr/build/shared /usr/app/shared
COPY --from=build /usr/build/packages/api-server /usr/app/packages/api-server
COPY --from=build /usr/build/packages/frontend/build /www

ENV NODE_ENV production
ENV PORT 4242
ENV HOST localhost
ENV DISABLE_AUTH true
ENV ADMIN_KEY 1234
ENV DISCORD_REDIRECT_URI none
ENV DISCORD_BOT_TOKEN none
ENV DISCORD_PUBLIC_TOKEN none
ENV DISCORD_CLIENT_TOKEN none
ENV DISCORD_SECRET_TOKEN none
ENV DISCORD_ROLE none

RUN yarn install --pure-lockfile --non-interactive --production

EXPOSE 80

RUN apk add --no-cache --upgrade bash
ADD docker/all/all.sh /
RUN chmod +x /all.sh

CMD ["sh", "/all.sh"]
