FROM node:16-alpine
WORKDIR /app
EXPOSE 3001
ADD node_modules.tar.gz .
COPY . .
ENTRYPOINT [ "npm", "start" ] 
