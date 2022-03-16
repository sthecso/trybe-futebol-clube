FROM node:14-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm i
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]
