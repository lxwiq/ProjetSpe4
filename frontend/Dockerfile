# Stage 1: Build the Angular application
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Install netcat for checking backend connection
RUN apk add --no-cache netcat-openbsd

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copy custom nginx configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Intégrer directement les commandes du script d'entrypoint
CMD /bin/sh -c '\
    echo "Démarrage du frontend Angular..." && \
    echo "Vérification de la disponibilité du backend..." && \
    BACKEND_HOST=${BACKEND_HOST:-backend} && \
    BACKEND_PORT=${BACKEND_PORT:-3000} && \
    RETRY_COUNT=0 && \
    MAX_RETRIES=30 && \
    until nc -z $BACKEND_HOST $BACKEND_PORT || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do \
        echo "En attente du backend ($BACKEND_HOST:$BACKEND_PORT)... Tentative $((RETRY_COUNT+1))/$MAX_RETRIES" && \
        RETRY_COUNT=$((RETRY_COUNT+1)) && \
        sleep 2; \
    done && \
    if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then \
        echo "Avertissement: Le backend n'\''est pas accessible après $MAX_RETRIES tentatives. Le frontend démarre quand même."; \
    else \
        echo "Backend accessible à $BACKEND_HOST:$BACKEND_PORT"; \
    fi && \
    if [ -n "$API_URL" ]; then \
        echo "Configuration de l'\''URL de l'\''API: $API_URL" && \
        find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|http://localhost:3000|$API_URL|g" {} \; ; \
    fi && \
    echo "Démarrage de Nginx..." && \
    nginx -g "daemon off;"'
