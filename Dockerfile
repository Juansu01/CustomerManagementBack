FROM --platform=linux/amd64 node:18


COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","start:prod" ]
