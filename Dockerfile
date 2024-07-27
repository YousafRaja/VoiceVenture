FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run tests
RUN npm test

# Expose the application port
EXPOSE 8080

# Start the application
CMD [ "node", "server.js" ]
