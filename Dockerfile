# Step 1: Build the Vite React App
FROM node:16-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Increase the memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

# Step 2: Serve With Nginx
FROM nginx:1.23-alpine

# Remove the default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build artifacts from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
