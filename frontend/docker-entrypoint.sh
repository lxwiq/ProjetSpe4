#!/bin/sh

# Afficher des informations sur l'environnement
echo "Démarrage du frontend Angular..."
echo "Environnement: $NODE_ENV"

# Vérifier si le backend est accessible
echo "Vérification de la disponibilité du backend..."
BACKEND_HOST=${BACKEND_HOST:-backend}
BACKEND_PORT=${BACKEND_PORT:-3000}
RETRY_COUNT=0
MAX_RETRIES=30

until nc -z $BACKEND_HOST $BACKEND_PORT || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
  echo "En attente du backend ($BACKEND_HOST:$BACKEND_PORT)... Tentative $((RETRY_COUNT+1))/$MAX_RETRIES"
  RETRY_COUNT=$((RETRY_COUNT+1))
  sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "Avertissement: Le backend n'est pas accessible après $MAX_RETRIES tentatives. Le frontend démarre quand même."
else
  echo "Backend accessible à $BACKEND_HOST:$BACKEND_PORT"
fi

# Remplacer les variables d'environnement dans les fichiers de configuration si nécessaire
if [ -n "$API_URL" ]; then
  echo "Configuration de l'URL de l'API: $API_URL"
  # Remplacer l'URL de l'API dans les fichiers statiques si nécessaire
  find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|http://localhost:3000|$API_URL|g" {} \;
fi

# Démarrer Nginx
echo "Démarrage de Nginx..."
exec nginx -g "daemon off;"
