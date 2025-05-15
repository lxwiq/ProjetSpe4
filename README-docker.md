# Configuration Docker pour l'Application Collaborative Documents

Cette configuration Docker permet de déployer facilement l'application Collaborative Documents avec ses trois composants principaux : frontend, backend et base de données PostgreSQL.

## Prérequis

- Docker
- Docker Compose

## Structure

La configuration Docker comprend trois services :

1. **db** : Base de données PostgreSQL
2. **backend** : API Node.js/Express
3. **frontend** : Application Angular

## Démarrage rapide

1. Lancez les conteneurs avec Docker Compose :
   ```bash
   docker-compose up -d
   ```

2. Accédez à l'application :
   - Frontend : http://localhost
   - Backend API : http://localhost:3000

## Utilisateurs par défaut

Deux utilisateurs sont créés automatiquement lors de l'initialisation de la base de données :

1. **Administrateur**
   - Nom d'utilisateur : `admin`
   - Email : `admin@example.com`
   - Mot de passe : `test123`
   - Droits : Administrateur

2. **Utilisateur standard**
   - Nom d'utilisateur : `user`
   - Email : `user@example.com`
   - Mot de passe : `test123`
   - Droits : Utilisateur standard

## Volumes persistants

Les données suivantes sont persistantes et survivront au redémarrage des conteneurs :

- **Données PostgreSQL** : Stockées dans le volume Docker `postgres_data`
- **Fichiers uploadés** : Stockés dans le dossier `./backend/src/uploads` qui est monté dans le conteneur

## Ports exposés

- **Frontend** : Port 80
- **Backend** : Port 3000
- **PostgreSQL** : Port 5432

## Personnalisation

### Variables d'environnement

Vous pouvez personnaliser les variables d'environnement dans le fichier `docker-compose.yml` :

- **Base de données** :
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`
  - `POSTGRES_DB`

- **Backend** :
  - `NODE_ENV`
  - `PORT`
  - `JWT_SECRET_KEY`
  - `JWT_REFRESH_SECRET_KEY`
  - etc.

## Commandes utiles

- **Démarrer les services** :
  ```bash
  docker-compose up -d
  ```

- **Arrêter les services** :
  ```bash
  docker-compose down
  ```

- **Voir les logs** :
  ```bash
  docker-compose logs -f
  ```

- **Reconstruire les images** :
  ```bash
  docker-compose build
  ```

- **Supprimer les volumes** (attention : cela supprimera toutes les données) :
  ```bash
  docker-compose down -v
  ```

## Dépannage

- **Problème de connexion à la base de données** : Vérifiez que le service PostgreSQL est en cours d'exécution et que les variables d'environnement sont correctement configurées.
- **Erreurs de migration Prisma** : Vérifiez les logs du backend pour voir les erreurs spécifiques.
- **Problèmes de réseau entre les conteneurs** : Assurez-vous que tous les services sont sur le même réseau Docker (`app-network`).

## Sécurité

Pour un déploiement en production, il est recommandé de :

1. Changer les mots de passe par défaut
2. Utiliser des secrets Docker pour les informations sensibles
3. Configurer HTTPS pour le frontend et le backend
4. Limiter l'accès aux ports exposés
