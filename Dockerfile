FROM node:13-alpine3.11

WORKDIR /root

RUN apk add --update --no-cache postgresql-client

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm run build

ENTRYPOINT ["node", "dist/index.js"]