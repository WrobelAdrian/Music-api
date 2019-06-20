FROM node:8.9-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY node_modules ./node_modules

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
