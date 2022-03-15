FROM node:16-alpine

WORKDIR /app

COPY . .

ADD node_modules.tar.gz ./

EXPOSE 3000

CMD [ "npm", "start" ]
