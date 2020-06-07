FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
#EXPOSE $PORT
# Run this stuff
#CMD [ "node", "server.js" ]

CMD node server.js --bind 0.0.0.0:$PORT
