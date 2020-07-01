FROM node:alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json .

RUN npm install --silent --no-optional \
    && npm install nodemon -g --silent

COPY . .

EXPOSE 8000
