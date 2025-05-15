# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install netcat for the entrypoint script
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

# Make the entrypoint script executable
RUN chmod +x docker-entrypoint.sh

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Use the entrypoint script
ENTRYPOINT ["./docker-entrypoint.sh"]
