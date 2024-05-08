# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# install openssl
RUN apk --no-cache add openssl

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# webpack
RUN npx webpack

# generate prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Bind the port that the app runs on
EXPOSE 3000

# Define the Docker "start" command, which will run the app
CMD ["node", "dist/app.js"]

