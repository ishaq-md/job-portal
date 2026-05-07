# Use the high-performance, lightweight Nginx Alpine image
FROM nginx:alpine

# Copy custom Nginx configuration to support Cloud Run's port 8080 expectation
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy all static website assets into Nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
