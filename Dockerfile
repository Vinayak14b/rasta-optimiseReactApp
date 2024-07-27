# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Increase the memory limit
ENV NODE_OPTIONS=--max-old-space-size=4096

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run the application
CMD ["npm", "start"]
