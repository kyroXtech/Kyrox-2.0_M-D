FROM node:lts-buster
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/kyroXtech/Kyrox-2.0_M-D.git /home/node/kyrox-2.0_M-D
WORKDIR /home/node/kyrox-2._M-D
RUN chmod -R 777 /home/node/kyrox-2.0_M-D/
RUN yarn install --network-concurrency 1
EXPOSE 9090
ENV NODE_ENV=production
CMD ["npm", "start"]
