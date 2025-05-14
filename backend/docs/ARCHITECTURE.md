# Architecture du Backend

Ce document décrit l'architecture technique du backend de l'application de collaboration documentaire.

## Vue d'ensemble

Le backend est construit avec les technologies suivantes :

- **Express.js** : Framework web pour Node.js
- **Prisma ORM** : ORM pour l'accès à la base de données PostgreSQL
- **Socket.IO** : Bibliothèque pour la communication en temps réel
- **JWT** : Mécanisme d'authentification avec tokens

L'architecture suit le modèle MVC (Modèle-Vue-Contrôleur) adapté pour une API REST avec les composants suivants :

- **Routes** : Définissent les points d'entrée de l'API
- **Contrôleurs** : Contiennent la logique métier
- **Services** : Encapsulent les opérations complexes et l'accès aux données
- **Middlewares** : Traitent les requêtes avant qu'elles n'atteignent les contrôleurs
- **Modèles** : Définis dans le schéma Prisma

## Structure des dossiers

```
backend/
├── prisma/                  # Schéma et migrations Prisma
├── src/
│   ├── authentification/    # Logique d'authentification
│   ├── config/              # Fichiers de configuration
│   ├── controllers/         # Contrôleurs
│   ├── generated/           # Code généré par Prisma
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

### Requêtes HTTP

1. La requête arrive sur une route définie dans `app.js`
2. Les middlewares globaux sont appliqués (CORS, parsing JSON, etc.)
3. Les middlewares spécifiques sont appliqués (authentification, validation, etc.)
4. Le contrôleur approprié traite la requête
5. Le contrôleur utilise les services pour accéder aux données via Prisma
6. La réponse est renvoyée au client

```
Client → Routes → Middlewares → Contrôleurs → Services → Prisma → Base de données
```

### Communication en temps réel (WebSockets)

1. Le client se connecte via Socket.IO
2. Le middleware d'authentification vérifie le token JWT
3. Le client est ajouté aux salles appropriées (documents, conversations)
4. Les événements sont traités par les gestionnaires dans `websockets/`
5. Les services sont utilisés pour persister les données si nécessaire

```
Client → Socket.IO → Middleware d'authentification → Gestionnaires d'événements → Services → Prisma → Base de données
```

## Authentification et sécurité

### Flux d'authentification

1. L'utilisateur envoie ses identifiants à `/login`
2. Le serveur vérifie les identifiants et génère deux tokens JWT :
   - Token d'accès (courte durée, 15 minutes)
   - Token de rafraîchissement (longue durée, 7 jours)
3. Les tokens sont envoyés au client dans des cookies HTTP-only
4. Le client utilise le token d'accès pour les requêtes authentifiées
5. Quand le token d'accès expire, le client utilise le token de rafraîchissement pour en obtenir un nouveau

### Authentification à deux facteurs (2FA)

1. L'utilisateur active la 2FA dans son profil
2. Un secret est généré et un QR code est affiché
3. L'utilisateur scanne le QR code avec une application d'authentification
4. Lors de la connexion, après la vérification des identifiants, un token temporaire est généré
5. L'utilisateur doit fournir un code 2FA valide pour obtenir un token d'accès complet

### Sécurité

- **Helmet** : Configure les en-têtes HTTP pour la sécurité
- **Rate Limiting** : Limite le nombre de requêtes pour prévenir les attaques par force brute
- **Validation des entrées** : Vérifie toutes les entrées utilisateur
- **Gestion des erreurs** : Centralise et standardise les réponses d'erreur
- **Cookies sécurisés** : HTTP-only, Secure (en production), SameSite

## Édition collaborative en temps réel

### Architecture

L'édition collaborative utilise Socket.IO pour la communication en temps réel entre les clients et le serveur.

1. Un utilisateur rejoint un document via l'événement `document:join`
2. Le serveur ajoute l'utilisateur à la salle correspondante
3. Les modifications sont envoyées via l'événement `document:update`
4. Le serveur diffuse les modifications à tous les utilisateurs dans la salle
5. Les curseurs sont synchronisés via l'événement `document:cursor-update`
6. Les documents sont sauvegardés périodiquement et lors de la déconnexion

### Gestion des conflits

1. Chaque modification est horodatée et associée à un utilisateur
2. Les modifications sont appliquées dans l'ordre de réception
3. En cas de conflit, la dernière modification reçue est prioritaire
4. Les versions des documents sont stockées pour permettre la restauration

## Appels audio

L'architecture des appels audio est basée sur WebRTC avec une signalisation via Socket.IO.

1. Un utilisateur initie un appel via l'événement `call:start`
2. Le serveur crée un enregistrement d'appel et notifie les participants
3. Les participants rejoignent l'appel via l'événement `call:join`
4. Les clients échangent des offres et réponses SDP via le serveur
5. Une fois connectés, les flux audio circulent directement entre les clients (P2P)
6. Le serveur maintient l'état de l'appel et gère les déconnexions

## Extensibilité

L'architecture est conçue pour être facilement extensible :

- **Nouveaux types de documents** : Ajouter des modèles dans le schéma Prisma
- **Nouvelles fonctionnalités collaboratives** : Créer de nouveaux événements WebSocket
- **Intégrations externes** : Ajouter des services dédiés

## Performances et mise à l'échelle

- **Optimisation des requêtes** : Prisma permet de sélectionner précisément les champs nécessaires
- **Lazy loading** : Chargement à la demande des données pour optimiser les performances
- **Pagination** : Limitation du nombre de résultats par requête pour réduire la charge
