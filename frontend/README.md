# Frontend Angular - Application de Collaboration Documentaire

Ce frontend Angular fournit une interface utilisateur moderne et réactive pour l'application de collaboration documentaire, permettant l'édition en temps réel, les appels audio, et la gestion des documents.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture et structure](#architecture-et-structure)
3. [Fonctionnalités principales](#fonctionnalités-principales)
4. [Modèles de données](#modèles-de-données)
5. [Services principaux](#services-principaux)
6. [Communication avec le backend](#communication-avec-le-backend)
7. [Installation et démarrage](#installation-et-démarrage)
8. [Développement](#développement)
9. [Documentation API](#documentation-api)

## Vue d'ensemble

Le frontend est développé avec Angular 19, utilisant les dernières fonctionnalités comme les composants autonomes, les signaux, et la nouvelle syntaxe de contrôle de flux (`@if`, `@for`, `@switch`). Il offre une expérience utilisateur fluide et réactive pour la collaboration en temps réel sur des documents.

### Pourquoi Angular ?

Angular a été choisi pour ce projet pour plusieurs raisons :

- **Architecture robuste** : Structure claire et organisée pour les applications complexes
- **Typage fort avec TypeScript** : Détection des erreurs à la compilation et meilleure maintenabilité
- **Composants autonomes** : Facilite la réutilisation du code et la séparation des responsabilités
- **Réactivité native** : Avec les signaux et RxJS pour une gestion efficace des états et des événements asynchrones
- **Performances optimisées** : Grâce au lazy loading, à la détection de changements OnPush et à la compilation AOT
- **Écosystème complet** : Outils intégrés pour les tests, le routing, la gestion des formulaires, etc.

## Architecture et structure

Le frontend suit une architecture modulaire organisée par fonctionnalités, avec une séparation claire des responsabilités.

### Structure des dossiers

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/              # Services, guards, interceptors, modèles
│   │   │   ├── guards/        # Guards pour la protection des routes
│   │   │   ├── interceptors/  # Intercepteurs HTTP
│   │   │   ├── models/        # Interfaces et types
│   │   │   └── services/      # Services partagés
│   │   ├── features/          # Composants organisés par fonctionnalité
│   │   │   ├── admin/         # Fonctionnalités d'administration
│   │   │   ├── auth/          # Authentification (login, 2FA)
│   │   │   ├── dashboard/     # Tableau de bord principal
│   │   │   ├── documents/     # Gestion et édition de documents
│   │   │   └── user/          # Profil utilisateur et paramètres
│   │   ├── layouts/           # Composants de mise en page
│   │   │   ├── main-layout/   # Layout principal avec navbar
│   │   │   ├── navbar/        # Barre de navigation
│   │   │   └── footer/        # Pied de page
│   │   ├── shared/            # Composants, directives et pipes réutilisables
│   │   │   ├── components/    # Composants partagés (boutons, modals, etc.)
│   │   │   ├── directives/    # Directives personnalisées
│   │   │   └── pipes/         # Pipes personnalisés
│   │   ├── app.component.ts   # Composant racine
│   │   ├── app.config.ts      # Configuration de l'application
│   │   └── app.routes.ts      # Configuration des routes
│   ├── assets/                # Ressources statiques (images, sons, etc.)
│   ├── environments/          # Configuration par environnement
│   └── styles.css             # Styles globaux (Tailwind CSS)
```

### Principes architecturaux

- **Composants autonomes** : Chaque composant est autonome et peut être utilisé indépendamment
- **Lazy loading** : Les modules sont chargés à la demande pour optimiser les performances
- **Séparation des responsabilités** : Les composants gèrent l'UI, les services gèrent la logique métier
- **Réactivité** : Utilisation des signaux et de RxJS pour une gestion réactive de l'état
- **Injection de dépendances** : Services injectés pour faciliter les tests et la maintenance

## Fonctionnalités principales

### Authentification et sécurité

- Connexion par email/mot de passe
- Support de l'authentification à deux facteurs (2FA)
- Gestion des tokens JWT avec rafraîchissement automatique
- Protection des routes avec des guards
- Gestion des rôles (utilisateur, administrateur)

### Gestion des documents

- Création, modification et suppression de documents
- Organisation en dossiers
- Support pour différents types de fichiers (texte, images, PDF)
- Visualisation adaptée au type de document
- Historique des versions

### Édition collaborative en temps réel

- Édition simultanée par plusieurs utilisateurs
- Visualisation des curseurs et sélections des autres utilisateurs
- Synchronisation instantanée des modifications
- Chat intégré dans l'éditeur
- Sauvegarde automatique et manuelle

### Appels audio

- Appels audio entre collaborateurs d'un document
- Signalisation via WebSockets
- Communication peer-to-peer via WebRTC
- Détection d'activité vocale
- Contrôles audio (muet/actif)

### Interface utilisateur

- Design responsive avec Tailwind CSS
- Thème cohérent et moderne
- Notifications en temps réel
- Tableau de bord personnalisé
- Mode administrateur pour la gestion des utilisateurs

## Modèles de données

Les principaux modèles de données utilisés dans le frontend sont définis dans le dossier `core/models/` :

### Utilisateur (`user.model.ts`)

```typescript
export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  profile_picture?: string;
  is_admin: boolean;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at?: string;
  last_login?: string;
}
```

### Document (`document.model.ts`)

```typescript
export interface Document {
  id: number;
  title: string;
  content?: string;
  file_path?: string;
  file_type?: string;
  file_size?: number;
  owner_id: number;
  parent_folder_id?: number;
  is_folder?: boolean;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  last_modified_by?: number;
  auto_save_interval?: number;
  owner?: DocumentUser;
}
```

### Appel (`call.model.ts`)

```typescript
export interface Call {
  id: number;
  document_id: number;
  initiated_by: number;
  started_at: string;
  ended_at?: string;
  call_type: 'audio' | 'video';
  status: 'active' | 'ended' | 'failed';
  initiator?: CallUser;
  participants?: CallParticipant[];
}
```

## Services principaux

Les services principaux sont définis dans le dossier `core/services/` :

### AuthService

Gère l'authentification, les sessions utilisateur et les autorisations.

```typescript
// Méthodes principales
login(credentials: LoginCredentials): Observable<LoginResponse>
logout(): Observable<any>
checkSession(): Observable<boolean>
refreshToken(): Observable<TokenResponse>
```

### DocumentService

Gère les opérations CRUD sur les documents via l'API REST.

```typescript
// Méthodes principales
getDocuments(): Observable<Document[]>
getDocumentById(id: number): Observable<Document>
createDocument(document: CreateDocumentRequest): Observable<Document>
updateDocument(id: number, document: UpdateDocumentRequest): Observable<Document>
deleteDocument(id: number): Observable<any>
```

### CollaborativeDocumentService

Gère l'édition collaborative en temps réel des documents.

```typescript
// Méthodes principales
joinDocument(documentId: number): Observable<{document: Document, activeUsers: ActiveDocumentUser[], currentContent: string}>
updateContent(documentId: number, content: string, delta?: any): void
saveDocument(documentId: number): Observable<{documentId: number, savedAt: Date}>
leaveDocument(documentId: number): void
```

### WebsocketService

Gère la communication en temps réel via Socket.IO.

```typescript
// Méthodes principales
connect(): void
disconnect(): void
emit(event: string, data: any, callback?: (response: any) => void): void
onDocumentContentChanged(): Observable<any>
onDocumentCursorMoved(): Observable<any>
onNotificationReceived(): Observable<any>
```

### CallService

Gère les appels audio via WebRTC.

```typescript
// Méthodes principales
startCall(documentId: number): Observable<Call>
joinCall(callId: number): Observable<Call>
leaveCall(callId: number): Observable<void>
toggleMute(): void
```

## Communication avec le backend

Le frontend communique avec le backend de deux manières principales :

### 1. API REST (HTTP)

Pour les opérations CRUD standard, le frontend utilise des requêtes HTTP via le module `HttpClient` d'Angular :

- **GET** : Récupération de données (documents, utilisateurs, etc.)
- **POST** : Création de nouvelles ressources
- **PUT** : Mise à jour de ressources existantes
- **DELETE** : Suppression de ressources

Toutes les requêtes HTTP sont interceptées par `AuthInterceptor` qui ajoute automatiquement les tokens d'authentification.

### 2. WebSockets (Socket.IO)

Pour la communication en temps réel, le frontend utilise Socket.IO :

- **Édition collaborative** : Synchronisation des modifications de documents
- **Curseurs et sélections** : Partage de la position des curseurs
- **Chat** : Messages instantanés entre collaborateurs
- **Appels audio** : Signalisation pour WebRTC
- **Notifications** : Alertes en temps réel

## Installation et démarrage

### Prérequis

- Node.js (v18+)
- npm (v9+)
- Angular CLI (v19+)

### Installation

```bash
# Installer les dépendances
npm install
```

### Démarrage du serveur de développement

```bash
# Démarrer le serveur de développement
ng serve
```

L'application sera accessible à l'adresse `http://localhost:4200/`.

### Construction pour la production

```bash
# Construire l'application pour la production
ng build
```

Les fichiers de build seront générés dans le dossier `dist/`.

## Développement

### Génération de composants

```bash
# Générer un nouveau composant
ng generate component features/nom-composant

# Générer un nouveau service
ng generate service core/services/nom-service

# Générer un nouveau pipe
ng generate pipe shared/pipes/nom-pipe
```

### Tests

```bash
# Exécuter les tests unitaires
ng test

# Exécuter les tests avec couverture de code
ng test --code-coverage
```

## Documentation API

Cette section documente les principales routes API utilisées par le frontend pour communiquer avec le backend.

### Authentification

- **POST /login** : Authentification utilisateur
  - Corps : `{ email, password }`
  - Réponse : `{ user, accessToken, refreshToken, requireTwoFactor }`

- **POST /auth/logout** : Déconnexion utilisateur
  - Réponse : `{ message: "Déconnexion réussie" }`

- **GET /auth/check-session** : Vérification de session
  - Réponse : `{ authenticated, user }`

- **POST /token/refresh** : Rafraîchissement de token
  - Corps : `{ refreshToken }`
  - Réponse : `{ accessToken, refreshToken }`

### Documents

- **GET /documents** : Récupération de tous les documents
  - Réponse : `{ documents[] }`

- **GET /documents/:id** : Récupération d'un document par ID
  - Réponse : `{ document }`

- **POST /documents** : Création d'un document
  - Corps : `{ title, content, parentFolderId, isFolder }`
  - Réponse : `{ document }`

- **PUT /documents/:id** : Mise à jour d'un document
  - Corps : `{ title, content }`
  - Réponse : `{ document }`

- **DELETE /documents/:id** : Suppression d'un document
  - Réponse : `{ message: "Document supprimé" }`

### Collaboration en temps réel (WebSockets)

- **document:join** : Rejoindre un document
  - Émission : `{ documentId }`
  - Réception : `{ document, activeUsers, content }`

- **document:update** : Mettre à jour le contenu d'un document
  - Émission : `{ documentId, content, delta }`
  - Réception (broadcast) : `{ ops, userId, timestamp }`

- **document:cursor-update** : Mettre à jour la position du curseur
  - Émission : `{ documentId, position }`
  - Réception (broadcast) : `{ userId, position }`

- **document:save** : Sauvegarder un document
  - Émission : `{ documentId }`
  - Réception : `{ documentId, savedAt, versionNumber }`

### Appels audio (WebSockets)

- **call:start** : Démarrer un appel
  - Émission : `{ documentId }`
  - Réception : `{ callId, documentId, participants }`

- **call:join** : Rejoindre un appel
  - Émission : `{ callId }`
  - Réception : `{ callId, userId }`

- **call:leave** : Quitter un appel
  - Émission : `{ callId }`
  - Réception : `{ callId, userId }`

- **call:signal** : Signalisation WebRTC
  - Émission : `{ callId, userId, signal }`
  - Réception : `{ callId, userId, signal }`

Pour plus de détails sur l'API complète, consultez la documentation Swagger disponible à l'adresse `http://localhost:3000/api-docs` lorsque le backend est en cours d'exécution.

---

Ce README fournit une vue d'ensemble du frontend Angular de l'application de collaboration documentaire. Pour plus d'informations sur le projet complet, consultez le [README principal](../README.md) à la racine du projet.
