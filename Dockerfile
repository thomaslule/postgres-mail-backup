FROM alpine:3.11

WORKDIR /root

RUN apk add --update --no-cache postgresql-client nodejs npm

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./

RUN npm install
RUN npm run build

ENTRYPOINT ["node", "dist/index.js"]
