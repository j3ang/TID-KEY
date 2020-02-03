FROM node:8.17

WORKDIR /usr/src/app

COPY package.json .
# COPY package-lock.json .

RUN npm install keystone@4.0.0 --save
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start