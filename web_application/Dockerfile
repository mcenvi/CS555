# Specify the base image
FROM node:14-alpine

# Set the working directory in the Docker image filesystem
WORKDIR /app

# Copy the package.json and package-lock.json files into the Docker image
COPY package*.json ./

# Install the dependencies in the Docker image
RUN npm install

# Copy the rest of the frontend code into the Docker image
COPY . .

# Expose port 3000 in the Docker image to allow communication to/from server
EXPOSE 3000

# Start the application within the Docker image
CMD ["npm", "start"]
