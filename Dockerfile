FROM node:13-alpine

WORKDIR /root

RUN apk add --update --no-cache postgresql-client

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./

RUN npm install
RUN npm run build

ENTRYPOINT ["node", "dist/index.js"]
