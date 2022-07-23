FROM node:16.15.0

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve" ]