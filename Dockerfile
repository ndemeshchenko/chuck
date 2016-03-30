FROM node

RUN mkdir -p /opt/local/chuck
WORKDIR /opt/local/chuck

COPY package.json /opt/local/chuck
RUN npm install

COPY . /opt/local/chuck

CMD ["node", "bin/bot.js"]

