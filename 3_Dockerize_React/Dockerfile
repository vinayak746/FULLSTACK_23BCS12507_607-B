# Multi-stage Dockerfile for React Application

# Stage 1: Build Stage
# Use Node.js as the base image for building the React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm cache clean --force
# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Production Stage
# Use Nginx to serve the static files
FROM nginx:alpine AS production

# Copy custom nginx configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from build stage to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
