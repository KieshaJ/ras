FROM node:lts-alpine

WORKDIR /client

COPY package.json ./

COPY . ./

RUN yarn

CMD ["yarn", "start"]
