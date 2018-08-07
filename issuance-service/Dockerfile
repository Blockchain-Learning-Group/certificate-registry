FROM node:9.3.0

MAINTAINER Adam Lemmon <adam@blockscalesolutions.com>

RUN npm install -g yarn

# Create app directory
COPY . /usr/src/issuance-service
WORKDIR /usr/src/issuance-service

# Install app dependencies
RUN yarn

CMD ["yarn", "start"]
EXPOSE 3001
