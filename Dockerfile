# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY /dist /usr/share/nginx/html

# Expose port 8890
EXPOSE 8890