# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY package.json package-lock.son ./

# Install all the dependencies
RUN npm install

COPY . .

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 8890