FROM node:18-buster-slim

WORKDIR /usr/src/app

COPY --chown=node:node dist/ /usr/src/app/dist/
COPY --chown=node:node node_modules/ /usr/src/app/node_modules/
# env
COPY --chown=node:node config/ /usr/src/app/config/
# resolve tsconfig.paths aliases
COPY --chown=node:node tsconfig.json /usr/src/app/
COPY --chown=node:node tsconfig-paths.js /usr/src/app/

USER node
EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "--require=./tsconfig-paths.js", "dist/index.js" ]