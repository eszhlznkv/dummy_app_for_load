FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
# Run this stuff
CMD [ "node", "server.js" ]
