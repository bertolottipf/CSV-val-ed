FROM node:20-alpine



# docker image build -t react-app-image:latest .
# docker create --name react-app-cont -p 3000:3000 react-app-image:latest


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers

COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY public/ ./public
COPY src/ ./src

EXPOSE 3000

CMD [ "npm", "run", "start", ">", "./src/log.log"]
