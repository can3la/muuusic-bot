FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src src
RUN npm run build

CMD [ "node", "." ]
