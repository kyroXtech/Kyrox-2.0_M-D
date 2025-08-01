FROM node:lts-buster

RUN git clone https://github.com/kyroXtech/Kyrox-2.0_M-D.git /root/Kyrox-2.0

WORKDIR /root/Kyrox-2.0

Installer les dépendances avec npm ou yarn
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1

COPY . .

EXPOSE 9090

CMD ["npm", "start"]
