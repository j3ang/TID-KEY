FROM node:8.17

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
ADD . /usr/src/app

EXPOSE 3000

CMD npm start