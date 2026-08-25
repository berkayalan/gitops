FROM node:24-bookworm-slim
LABEL Creator=berkayalan
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]