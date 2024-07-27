# Use an official Node runtime based on Alpine as a parent image
FROM node:14-alpine

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the application in production
RUN npm install -g serve

# Expose the port that serve will use
EXPOSE 8080

# Command to run the application using serve
CMD ["serve", "-s", "build", "-l", "8080"]
