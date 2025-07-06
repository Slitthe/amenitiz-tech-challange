FROM node:21.7.3

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

ENTRYPOINT ["npm"]

CMD ["run", "preview"]