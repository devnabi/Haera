# 클라이언트 빌드 & 배포
FROM node:21.7.1 AS client-builder

WORKDIR /client

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "run", "serve"]
