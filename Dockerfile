FROM node:alpine
WORKDIR /home/node/app
COPY . .
RUN npm install
CMD npm run app