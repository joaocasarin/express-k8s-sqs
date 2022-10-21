FROM node:16.17.0-alpine3.16 as build
ENV APP=/home/app
WORKDIR $APP
RUN chown node:node $APP
USER node
COPY --chown=node:node ./* $APP/
RUN yarn install --frozen-lockfile &&\
    yarn build

FROM node:16.17.0-alpine3.16 as production
ENV APP=/home/app
ENV NODE_ENV=production
WORKDIR $APP
RUN chown node:node $APP
USER node
COPY --chown=node:node --from=build $APP/dist/ $APP/dist/
COPY --chown=node:node package.json yarn.lock $APP/
RUN yarn install --frozen-lockfile &&\
    rm -rf "$(yarn cache dir)"
EXPOSE 8080
CMD yarn start
