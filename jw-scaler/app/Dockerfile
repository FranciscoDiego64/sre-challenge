# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the image
COPY package*.json ./

# Install the application's dependencies inside the Docker image
RUN npm install

# Copy the rest of the application code into the image
COPY . .

# Specify the command to run the application
CMD [ "node", "index.js" ]

# Expose the port the app runs on
EXPOSE 3000
