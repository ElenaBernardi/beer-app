FROM node:12.2.0

WORKDIR /app

COPY . /app

RUN npm install --no-progress

EXPOSE 3000

CMD [ "node", "-r", "esm", "server.js" ]