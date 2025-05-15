# Backend de l'Application de Collaboration Documentaire

Ce backend fournit une API RESTful et des fonctionnalités WebSocket pour une application de collaboration documentaire en temps réel.

## Technologies utilisées

- **Express.js** : Framework web pour Node.js
- **Prisma ORM** : ORM pour l'accès à la base de données PostgreSQL
- **Socket.IO** : Bibliothèque pour la communication en temps réel
- **JWT** : Mécanisme d'authentification avec tokens
- **Jest** : Framework de test

## Prérequis

- Node.js (v14+)
- PostgreSQL (v12+)
- npm ou yarn

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Configurer les variables d'environnement :
   ```bash
   cp .env.example .env
   ```
   Puis modifier le fichier `.env` avec vos propres valeurs.

4. Générer le client Prisma :
   ```bash
   npx prisma generate
   ```

5. Exécuter les migrations de base de données :
   ```bash
   npx prisma migrate dev
   ```

## Démarrage

Pour démarrer le serveur en mode développement :
```bash
npm run dev
```

Pour démarrer le serveur en mode production :
```bash
npm start
```

## Tests

Pour exécuter tous les tests :
```bash
npm test
```

Pour exécuter des tests spécifiques :
```bash
npm run test:token  # Exécute uniquement les tests liés aux tokens
```

## Documentation API

La documentation API est disponible via Swagger UI à l'adresse suivante :
```
http://localhost:3000/api-docs
```

## Structure du projet

```
backend/
├── prisma/                  # Schéma et migrations Prisma
├── src/
│   ├── authentification/    # Logique d'authentification
│   ├── config/              # Fichiers de configuration
│   ├── controllers/         # Contrôleurs
│   ├── lib/                 # Bibliothèques partagées
│   ├── middlewares/         # Middlewares Express
│   ├── routes/              # Définitions des routes
│   ├── services/            # Services métier
│   ├── uploads/             # Stockage des fichiers uploadés
│   └── websockets/          # Gestion des WebSockets
├── tests/                   # Tests unitaires et d'intégration
├── docs/                    # Documentation
└── app.js                   # Point d'entrée de l'application
```

## Fonctionnalités principales

### Authentification et gestion des utilisateurs

- Authentification (connexion/déconnexion) avec JWT
- Authentification à deux facteurs (2FA)
- Gestion des rôles (utilisateur, administrateur)
- Modification du profil utilisateur
- Création, blocage et déblocage de comptes par un administrateur

### Gestion des documents

- Stockage des documents textuels et non textuels (PDF, images, etc.)
- Affichage des documents avec métadonnées
- Modification collaborative en temps réel
- Suppression, remplacement et gestion des droits d'accès

### Collaboration en temps réel

- Édition collaborative en temps réel via WebSockets
- Sauvegarde automatique des modifications
- Système d'invitation à collaborer sur un document
- Gestion des appels audio entre collaborateurs

### Sécurité

- Protection contre les attaques par force brute (rate limiting)
- Validation stricte des entrées utilisateur
- Gestion des droits d'accès et des rôles
- Rotation des tokens JWT

## Endpoints API principaux

### Authentification

- `POST /login` : Authentification utilisateur
- `POST /auth/logout` : Déconnexion utilisateur
- `GET /auth/check-session` : Vérification de session
- `POST /token/refresh` : Rafraîchissement de token

### Utilisateurs

- `GET /users` : Récupération de tous les utilisateurs
- `GET /users/:id` : Récupération d'un utilisateur par ID
- `PUT /users/:id` : Modification d'un utilisateur
- `POST /users` : Création d'un utilisateur

### Documents

- `GET /documents` : Récupération de tous les documents
- `GET /documents/:id` : Récupération d'un document par ID
- `POST /documents` : Création d'un document
- `PUT /documents/:id` : Modification d'un document
- `DELETE /documents/:id` : Suppression d'un document

### Collaboration

- `POST /documents/:id/invite` : Invitation à collaborer
- `GET /documents/:id/collaborators` : Récupération des collaborateurs
- `DELETE /documents/:id/collaborators/:collaboratorId` : Suppression d'un collaborateur

## Événements WebSocket

### Documents

- `document:join` : Rejoindre un document
- `document:leave` : Quitter un document
- `document:update` : Mettre à jour le contenu d'un document
- `document:cursor-update` : Mettre à jour la position du curseur
- `document:save` : Sauvegarder un document

### Appels

- `call:start` : Démarrer un appel
- `call:join` : Rejoindre un appel
- `call:leave` : Quitter un appel
- `call:offer` : Envoyer une offre WebRTC
- `call:answer` : Répondre à une offre WebRTC
- `call:ice-candidate` : Échanger des candidats ICE

## Documentation technique

Pour plus de détails sur l'architecture et les flux de données, consultez les documents suivants :

- [Architecture](./docs/ARCHITECTURE.md)
- [Flux de données](./docs/DATA_FLOWS.md)
