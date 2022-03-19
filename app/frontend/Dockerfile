FROM node:16-alpine

EXPOSE 3000

WORKDIR /frontend

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]
