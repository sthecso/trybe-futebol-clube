FROM node:16-alpine
WORKDIR /backend
COPY package.json ./
RUN npm install
EXPOSE 3001
COPY . ./
CMD [ "npm", "start" ]
#  ...
