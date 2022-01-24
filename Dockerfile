FROM node:16-alpine as build

RUN apk add --no-cache curl bash && \
    curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

ENV NODE_ENV=production

COPY package.json .

RUN npm i && \
    node-prune


FROM alpine

RUN apk add --no-cache nodejs npm && \
    npm i -g pm2 && \
    adduser -D -u 1000 node

USER node

CMD ["pm2-runtime", "pm2.config.js"]

COPY --from=build node_modules node_modules
COPY . .