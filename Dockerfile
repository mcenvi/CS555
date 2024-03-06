# Specify the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the frontend code to the container
COPY . .

# Build the frontend code
RUN npm run build

# Expose the port on which the frontend will run
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]
