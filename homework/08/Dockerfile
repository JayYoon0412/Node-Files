FROM node:14
WORKDIR /authentication/

COPY ./package.json /authentication/
COPY ./yarn.lock /authentication/
RUN yarn install

COPY . /authentication/
CMD npm run dev