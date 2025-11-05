# Dockerize React Application

This folder contains examples and instructions for Dockerizing a React application using multi-stage builds.

## Overview

Docker containerization allows you to package your React application with all its dependencies, ensuring consistent behavior across different environments.

## Contents

- `Dockerfile` - Multi-stage Docker build configuration for React applications
- `.dockerignore` - Files and directories to exclude from the Docker build context

## Multi-Stage Build Benefits

1. **Smaller Image Size**: Only production artifacts are included in the final image
2. **Improved Security**: Development dependencies are not shipped to production
3. **Faster Deployment**: Optimized layer caching and reduced image size
4. **Clean Separation**: Build and runtime environments are separated

## Usage

### Build the Docker Image
```bash
docker build -t react-app .
```

### Run the Container
```bash
docker run -p 3000:80 react-app
```

The application will be available at `http://localhost:3000`

## Docker Image Layers

1. **Build Stage**: Uses Node.js image to install dependencies and build the React app
2. **Production Stage**: Uses lightweight Nginx image to serve the static files

## Best Practices

- Use specific version tags for base images
- Leverage layer caching by copying package files first
- Include only necessary files using `.dockerignore`
- Use multi-stage builds to minimize final image size
- Run containers as non-root users when possible
- Use environment variables for configuration

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)
