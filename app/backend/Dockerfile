FROM node:16-alpine
WORKDIR /usr/backend
COPY package.json ./
RUN npm install
EXPOSE 3001
COPY . ./
CMD [ "npm","run","dev" ]
#  ...
