FROM node:20.5-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i && npm run build

CMD [ "npm", "run", "start:prod" ]

