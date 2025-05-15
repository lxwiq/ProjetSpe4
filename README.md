# Application de Collaboration Documentaire

Une application web complète permettant l'édition collaborative de documents en temps réel avec des fonctionnalités avancées comme les appels audio, la messagerie et les notifications.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Choix technologiques](#choix-technologiques)
3. [Architecture du projet](#architecture-du-projet)
4. [Flux de données](#flux-de-données)
5. [Fonctionnalités principales](#fonctionnalités-principales)
6. [Installation et déploiement](#installation-et-déploiement)
7. [Utilisateurs par défaut](#utilisateurs-par-défaut)
8. [Développement](#développement)
9. [Tests](#tests)
10. [Documentation](#documentation)

## Vue d'ensemble

Cette application permet aux utilisateurs de créer, éditer et partager des documents en temps réel. Elle offre une interface utilisateur moderne et réactive, avec des fonctionnalités avancées comme l'édition collaborative, les appels audio, et un système complet de gestion des utilisateurs et des permissions.

## Choix technologiques

### Frontend (Angular)

Angular a été choisi pour le frontend pour les raisons suivantes :

- **Architecture robuste** : Angular fournit une structure claire et organisée pour les applications complexes
- **Typage fort avec TypeScript** : Permet de détecter les erreurs à la compilation et améliore la maintenabilité
- **Composants autonomes** : Facilite la réutilisation du code et la séparation des responsabilités
- **Réactivité native** : Avec les signaux et RxJS pour une gestion efficace des états et des événements asynchrones
- **Performances optimisées** : Grâce au lazy loading, à la détection de changements OnPush et à la compilation AOT
- **Écosystème complet** : Outils intégrés pour les tests, le routing, la gestion des formulaires, etc.
- **Support à long terme** : Mises à jour régulières et support de Google

### Backend (Express.js)

Express.js a été choisi pour le backend pour les raisons suivantes :

- **Légèreté et flexibilité** : Framework minimaliste qui permet une grande liberté d'architecture
- **Performances élevées** : Traitement rapide des requêtes HTTP
- **Middleware ecosystem** : Large choix de middlewares pour diverses fonctionnalités
- **Intégration facile** : Compatible avec de nombreuses bibliothèques et bases de données
- **Scalabilité** : Peut être facilement mis à l'échelle pour gérer un grand nombre d'utilisateurs
- **Support de WebSockets** : Intégration simple avec Socket.IO pour les fonctionnalités en temps réel
- **Communauté active** : Documentation abondante et support communautaire

### Autres technologies clés

- **PostgreSQL** : Base de données relationnelle robuste et performante
- **Prisma ORM** : ORM moderne avec typage fort pour l'accès à la base de données
- **Socket.IO** : Communication bidirectionnelle en temps réel entre client et serveur
- **JWT** : Authentification sécurisée basée sur des tokens
- **WebRTC** : Communication audio peer-to-peer pour les appels
- **Tailwind CSS** : Framework CSS utilitaire pour un design responsive et moderne
- **Docker** : Conteneurisation pour un déploiement simplifié et cohérent

## Architecture du projet

### Structure du frontend

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/              # Services, guards, interceptors, modèles
│   │   ├── features/          # Composants organisés par fonctionnalité
│   │   ├── layouts/           # Composants de mise en page
│   │   ├── shared/            # Composants, directives et pipes réutilisables
│   │   ├── app.component.ts   # Composant racine
│   │   ├── app.config.ts      # Configuration de l'application
│   │   └── app.routes.ts      # Configuration des routes
│   ├── assets/                # Ressources statiques
│   ├── environments/          # Configuration par environnement
│   └── styles.css             # Styles globaux
```

### Structure du backend

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

## Flux de données

### Communication HTTP

1. Le frontend envoie des requêtes HTTP au backend via les services Angular
2. Les intercepteurs HTTP ajoutent les tokens d'authentification
3. Le backend traite les requêtes via les routes et contrôleurs
4. Les services backend accèdent à la base de données via Prisma
5. Les réponses sont renvoyées au frontend sous forme de JSON

### Communication en temps réel

1. Le frontend se connecte au backend via Socket.IO
2. L'authentification est vérifiée via les tokens JWT
3. Les événements sont émis et reçus de manière bidirectionnelle
4. Les modifications de documents sont diffusées à tous les utilisateurs connectés
5. Les curseurs et sélections sont synchronisés en temps réel

### Appels audio

1. La signalisation est gérée via Socket.IO
2. Les connexions peer-to-peer sont établies via WebRTC
3. Les flux audio sont transmis directement entre les clients
4. Le backend maintient l'état des appels et gère les participants

## Fonctionnalités principales

### Authentification et sécurité

- Authentification par email/mot de passe
- Authentification à deux facteurs (2FA)
- Gestion des sessions avec JWT (tokens d'accès et de rafraîchissement)
- Protection contre les attaques par force brute
- Gestion des rôles (utilisateur, administrateur)

### Gestion des documents

- Création, modification et suppression de documents
- Organisation en dossiers
- Support pour différents types de fichiers (texte, images, PDF)
- Métadonnées et historique des versions

### Collaboration en temps réel

- Édition collaborative avec synchronisation instantanée
- Visualisation des curseurs et sélections des autres utilisateurs
- Chat intégré dans l'éditeur
- Système d'invitation à collaborer
- Appels audio entre collaborateurs

### Interface utilisateur

- Design responsive avec Tailwind CSS
- Navigation intuitive
- Tableau de bord personnalisé
- Notifications en temps réel
- Mode administrateur pour la gestion des utilisateurs

## Installation et déploiement

### Avec Docker (recommandé)

1. Clonez le dépôt :
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Lancez les conteneurs avec Docker Compose :
   ```bash
   docker-compose up -d
   ```

3. Accédez à l'application :
   - Frontend : http://localhost
   - Backend API : http://localhost:3000
   - Documentation API : http://localhost:3000/api-docs

### Installation manuelle

#### Backend

1. Installez les dépendances :
   ```bash
   cd backend
   npm install
   ```

2. Configurez les variables d'environnement :
   ```bash
   cp .env.example .env
   # Modifiez le fichier .env avec vos propres valeurs
   ```

3. Générez le client Prisma et exécutez les migrations :
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Démarrez le serveur :
   ```bash
   npm run dev
   ```

#### Frontend

1. Installez les dépendances :
   ```bash
   cd frontend
   npm install
   ```

2. Démarrez le serveur de développement :
   ```bash
   ng serve
   ```

3. Accédez à l'application dans votre navigateur :
   ```
   http://localhost:4200
   ```

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

## Développement

### Frontend

- Générer un nouveau composant : `ng generate component features/nom-composant`
- Construire pour la production : `ng build`
- Lancer les tests : `ng test`

### Backend

- Démarrer en mode développement : `npm run dev`
- Démarrer en mode production : `npm start`
- Exécuter les tests : `npm test`

## Tests

### Tests unitaires

- Frontend : Tests Karma/Jasmine
- Backend : Tests Jest

### Tests d'API

Une collection Postman est disponible dans `backend/postman/` pour tester les API.

## Documentation

- Documentation API : Disponible via Swagger UI à `http://localhost:3000/api-docs`
- Documentation des routes API : Voir `frontend/API.md`
- Architecture du backend : Voir `backend/docs/ARCHITECTURE.md`
- Flux de données : Voir `backend/docs/DATA_FLOWS.md`