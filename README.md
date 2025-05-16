# Application de Collaboration Documentaire

Une application web complète permettant l'édition collaborative de documents en temps réel avec des fonctionnalités avancées comme les appels audio WebRTC, la messagerie instantanée et les notifications en temps réel.

**Groupe 9 : Axel / Safae et Loïc**

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

Cette application permet aux utilisateurs de créer, éditer et partager des documents en temps réel. Elle offre une interface utilisateur moderne et réactive, avec des fonctionnalités avancées comme l'édition collaborative en temps réel, les appels audio via WebRTC, la messagerie instantanée, les notifications en temps réel, et un système complet de gestion des utilisateurs et des permissions.

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
2. Les intercepteurs HTTP ajoutent les tokens d'authentification (JWT)
3. Le backend traite les requêtes via les routes et contrôleurs
4. Les services backend accèdent à la base de données via Prisma
5. Les réponses sont renvoyées au frontend sous forme de JSON standardisé

### Édition collaborative en temps réel

1. **Rejoindre un document**
   - Le client envoie un événement `document:join` avec l'ID du document
   - Le serveur vérifie les permissions de l'utilisateur
   - L'utilisateur est ajouté à la salle Socket.IO correspondante
   - Le serveur envoie le contenu actuel du document et la liste des utilisateurs actifs

2. **Mise à jour du document**
   - Le client envoie un événement `document:update` avec les modifications
   - Le serveur met à jour le contenu en mémoire via `RealtimeDocumentService`
   - Le serveur diffuse les modifications à tous les autres utilisateurs dans la salle
   - Les curseurs et sélections sont synchronisés via des événements dédiés

3. **Sauvegarde du document**
   - Le client déclenche une sauvegarde (manuelle ou automatique)
   - Le serveur écrit le contenu dans le fichier physique
   - Le serveur crée une nouvelle version du document dans la base de données
   - Le serveur notifie tous les utilisateurs que le document a été sauvegardé

### Appels audio

1. **Démarrer un appel**
   - L'utilisateur A démarre un appel via l'événement `call:start`
   - Le serveur crée un enregistrement d'appel dans la base de données
   - Le serveur notifie les autres utilisateurs du document

2. **Rejoindre un appel**
   - L'utilisateur B rejoint l'appel via l'événement `call:join`
   - Le serveur ajoute l'utilisateur comme participant à l'appel
   - Le serveur notifie tous les participants qu'un nouvel utilisateur a rejoint

3. **Établissement de la connexion WebRTC**
   - Les utilisateurs échangent des offres SDP et des candidats ICE via Socket.IO
   - Une fois connectés, les flux audio circulent directement entre les clients (P2P)
   - Le backend ne fait que la signalisation, pas le transfert des flux audio

4. **Terminer un appel**
   - Un utilisateur quitte l'appel via l'événement `call:leave`
   - Le serveur met à jour l'état de l'appel et notifie les autres participants

### Système de notifications

1. **Création d'une notification**
   - Une action déclenche la création d'une notification (invitation, message, etc.)
   - La notification est enregistrée dans la base de données
   - Si le destinataire est connecté, la notification est envoyée en temps réel

2. **Réception et gestion**
   - Le client reçoit la notification via l'événement `notification:received`
   - L'utilisateur peut marquer la notification comme lue
   - Le statut est mis à jour dans la base de données

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
- Visualisation des utilisateurs actifs sur un document
- Sauvegarde automatique et en temps réel des documents
- Système d'invitation à collaborer
- Affichage du dernier utilisateur ayant modifié un document ('dernière modification par: [username]')

### Communication et collaboration

- Appels audio entre collaborateurs via WebRTC
- Messagerie instantanée avec historique des messages
- Chat intégré dans l'éditeur de documents
- Notifications en temps réel pour les messages privés
- Système de notification pour les invitations à collaborer

### Interface utilisateur

- Design responsive avec Tailwind CSS
- Navigation intuitive avec bouton retour fonctionnel en mode édition
- Tableau de bord personnalisé
- Notifications en temps réel
- Mode administrateur pour la gestion des utilisateurs

## Installation et déploiement

### Avec Docker (recommandé)

1. Décompressez l'archive du projet :
   ```bash
   unzip projet-collaboration-documentaire.zip
   cd projet-collaboration-documentaire
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

- **Documentation API** : Disponible via Swagger UI à `http://localhost:3000/api-docs`
- **Architecture du backend** : Voir [`backend/docs/ARCHITECTURE.md`](backend/docs/ARCHITECTURE.md) pour plus de détails sur l'architecture
- **Flux de données détaillés** : Voir [`backend/docs/DATA_FLOWS.md`](backend/docs/DATA_FLOWS.md) pour des diagrammes et explications approfondies

Ce README centralisé fournit une vue d'ensemble du projet. Pour des informations plus spécifiques, consultez les fichiers README dédiés :
- [`frontend/README.md`](frontend/README.md) : Documentation complète du frontend Angular
- [`backend/README.md`](backend/README.md) : Détails sur le backend
- [`README-docker.md`](README-docker.md) : Instructions détaillées pour le déploiement avec Docker