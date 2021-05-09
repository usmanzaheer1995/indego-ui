FROM node:15.14.0-alpine3.11

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY . .
RUN npm install

# start app
CMD ["npm", "start"]