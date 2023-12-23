# Base image
FROM node:20.10.0-alpine as production

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies only if NODE_ENV is not set to "development"
RUN if [ "$NODE_ENV" = "production" ]; then yarn install --production; else yarn install; fi

# Bundle app source
COPY . .

# If NODE_ENV is set to "production", create a "dist" folder with the production build
RUN if [ "$NODE_ENV" = "production" ]; then yarn run build; fi

# Start the server using the appropriate command based on the environment
CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then node dist/main; else yarn start:dev; fi" ]
