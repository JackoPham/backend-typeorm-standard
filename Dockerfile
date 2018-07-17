FROM node:9
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN  npm cache clean
COPY . /usr/src/app
EXPOSE 5002
CMD [ "npm","start" ]
# RUN npm install