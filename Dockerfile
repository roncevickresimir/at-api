FROM node:18-buster-slim AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:18-buster-slim AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]