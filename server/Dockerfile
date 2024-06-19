# 서버 빌드 & 배포
FROM node:21.7.1 AS server-builder

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
