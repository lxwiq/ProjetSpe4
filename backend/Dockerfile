# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install netcat for checking database connection
RUN apk add --no-cache netcat-openbsd

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client with the correct binary targets
RUN npx prisma generate

# Create uploads directory
RUN mkdir -p src/uploads/documents

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Intégrer directement les commandes du script d'entrypoint
CMD /bin/sh -c '\
    echo "Waiting for PostgreSQL to be ready..." && \
    while ! nc -z db 5432; do \
      sleep 1; \
    done && \
    echo "PostgreSQL is ready!" && \
    echo "Running Prisma migrations..." && \
    npx prisma migrate deploy && \
    echo "Generating Prisma client..." && \
    npx prisma generate && \
    echo "Initializing database with users..." && \
    node init-db.js && \
    echo "Starting the application..." && \
    node app.js'
