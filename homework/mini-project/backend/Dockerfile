FROM node:14
WORKDIR /files/

COPY ./package.json /files/
COPY ./yarn.lock /files/
RUN yarn install

COPY . /files/
CMD npm run dev