# Documentation des Routes API

Ce document liste toutes les routes API disponibles dans le backend de l'application de collaboration documentaire, organisées par catégorie fonctionnelle.

## Table des matières

- [Authentification](#authentification)
- [Utilisateurs](#utilisateurs)
- [Documents](#documents)
- [Documents Collaboratifs](#documents-collaboratifs)
- [Messagerie](#messagerie)
- [Notifications](#notifications)
- [Administration](#administration)
- [Authentification à deux facteurs (2FA)](#authentification-à-deux-facteurs-2fa)
- [Gestion des Tokens](#gestion-des-tokens)

## Authentification

### Connexion utilisateur
- **Chemin**: `/login`
- **Méthode**: `POST`
- **Description**: Authentifie un utilisateur et génère des tokens JWT
- **Paramètres**:
  - **Corps**: 
    - `email` (string, requis): Email de l'utilisateur
    - `password` (string, requis): Mot de passe de l'utilisateur
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: 
    ```json
    {
      "user": {
        "id": 1,
        "username": "exemple",
        "email": "user@exemple.com"
      },
      "requires2FA": false
    }
    ```
- **Codes de statut**:
  - `200`: Connexion réussie
  - `400`: Paramètres invalides
  - `401`: Identifiants incorrects
  - `429`: Trop de tentatives (rate limiting)

### Déconnexion
- **Chemin**: `/auth/logout`
- **Méthode**: `POST`
- **Description**: Déconnecte l'utilisateur en invalidant ses tokens
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: `{ "message": "Déconnexion réussie" }`
- **Codes de statut**:
  - `200`: Déconnexion réussie
  - `401`: Non authentifié

### Vérification de session
- **Chemin**: `/auth/check-session`
- **Méthode**: `GET`
- **Description**: Vérifie si la session de l'utilisateur est valide
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: `{ "valid": true, "user": { ... } }`
- **Codes de statut**:
  - `200`: Session valide
  - `401`: Session invalide

## Utilisateurs

### Récupérer tous les utilisateurs
- **Chemin**: `/users`
- **Méthode**: `GET`
- **Description**: Récupère la liste de tous les utilisateurs
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets utilisateur
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé

### Récupérer un utilisateur par ID
- **Chemin**: `/users/:id`
- **Méthode**: `GET`
- **Description**: Récupère les informations d'un utilisateur spécifique
- **Paramètres**:
  - **URL**: `id` (integer, requis): ID de l'utilisateur
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet utilisateur
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Utilisateur non trouvé

### Modifier un utilisateur
- **Chemin**: `/users/:id`
- **Méthode**: `PUT`
- **Description**: Modifie les informations d'un utilisateur
- **Paramètres**:
  - **URL**: `id` (integer, requis): ID de l'utilisateur
  - **Corps**: Champs à modifier (username, email, etc.)
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet utilisateur mis à jour
- **Codes de statut**:
  - `200`: Succès
  - `400`: Paramètres invalides
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Utilisateur non trouvé

### Créer un utilisateur
- **Chemin**: `/users`
- **Méthode**: `POST`
- **Description**: Crée un nouvel utilisateur
- **Paramètres**:
  - **Corps**: 
    - `username` (string, requis): Nom d'utilisateur
    - `email` (string, requis): Email
    - `password` (string, requis): Mot de passe
  - **En-têtes**: Token d'authentification (admin)
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet utilisateur créé
- **Codes de statut**:
  - `201`: Utilisateur créé
  - `400`: Paramètres invalides
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `409`: Email déjà utilisé

## Documents

### Récupérer tous les documents
- **Chemin**: `/documents`
- **Méthode**: `GET`
- **Description**: Récupère tous les documents accessibles par l'utilisateur
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets document
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié

### Récupérer un document par ID
- **Chemin**: `/documents/:id`
- **Méthode**: `GET`
- **Description**: Récupère un document spécifique
- **Paramètres**:
  - **URL**: `id` (integer, requis): ID du document
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet document
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Document non trouvé

### Ajouter un document
- **Chemin**: `/documents`
- **Méthode**: `POST`
- **Description**: Crée un nouveau document ou dossier
- **Paramètres**:
  - **Corps** (multipart/form-data): 
    - `title` (string, requis): Titre du document
    - `content` (string, optionnel): Contenu du document
    - `parentFolderId` (integer, optionnel): ID du dossier parent
    - `isFolder` (boolean, optionnel): Indique si c'est un dossier
    - `file` (file, optionnel): Fichier à télécharger
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet document créé
- **Codes de statut**:
  - `201`: Document créé
  - `400`: Paramètres invalides
  - `401`: Non authentifié
  - `500`: Erreur serveur

### Modifier un document
- **Chemin**: `/documents/:id`
- **Méthode**: `PUT`
- **Description**: Modifie un document existant
- **Paramètres**:
  - **URL**: `id` (integer, requis): ID du document
  - **Corps**: 
    - `title` (string, optionnel): Nouveau titre
    - `content` (string, optionnel): Nouveau contenu
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet document mis à jour
- **Codes de statut**:
  - `200`: Succès
  - `400`: Paramètres invalides
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Document non trouvé

### Supprimer un document
- **Chemin**: `/documents/:id`
- **Méthode**: `DELETE`
- **Description**: Supprime un document
- **Paramètres**:
  - **URL**: `id` (integer, requis): ID du document
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: `{ "message": "Document supprimé avec succès" }`
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Document non trouvé

### Inviter un utilisateur à collaborer
- **Chemin**: `/documents/:id/invite`
- **Méthode**: `POST`
- **Description**: Invite un utilisateur à collaborer sur un document
- **Paramètres**:
  - **URL**: `id` (integer, requis): ID du document
  - **Corps**: 
    - `invitedUserId` (integer, requis): ID de l'utilisateur invité
    - `permissionLevel` (string, optionnel): Niveau de permission (read, write, admin)
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet invitation
- **Codes de statut**:
  - `201`: Invitation envoyée
  - `400`: Paramètres invalides
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Document ou utilisateur non trouvé

### Récupérer les collaborateurs d'un document
- **Chemin**: `/documents/:id/collaborators`
- **Méthode**: `GET`
- **Description**: Récupère la liste des collaborateurs d'un document
- **Paramètres**:
  - **URL**: `id` (integer, requis): ID du document
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets collaborateur
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Document non trouvé

## Documents Collaboratifs

### Récupérer les utilisateurs actifs sur un document
- **Chemin**: `/collaborative-documents/:documentId/active-users`
- **Méthode**: `GET`
- **Description**: Récupère la liste des utilisateurs actuellement actifs sur un document
- **Paramètres**:
  - **URL**: `documentId` (integer, requis): ID du document
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets utilisateur actif
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé

### Inviter un utilisateur à un document
- **Chemin**: `/collaborative-documents/:documentId/invite`
- **Méthode**: `POST`
- **Description**: Invite un utilisateur à collaborer sur un document
- **Paramètres**:
  - **URL**: `documentId` (integer, requis): ID du document
  - **Corps**: 
    - `invitedUserId` (integer, requis): ID de l'utilisateur invité
    - `permissionLevel` (string, optionnel): Niveau de permission
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet invitation
- **Codes de statut**:
  - `201`: Invitation envoyée
  - `400`: Paramètres invalides
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `500`: Erreur serveur

### Récupérer les appels actifs pour un document
- **Chemin**: `/collaborative-documents/:documentId/calls`
- **Méthode**: `GET`
- **Description**: Récupère les appels audio actifs pour un document
- **Paramètres**:
  - **URL**: `documentId` (integer, requis): ID du document
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets appel
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé

## Messagerie

### Récupérer les conversations
- **Chemin**: `/messaging/conversations`
- **Méthode**: `GET`
- **Description**: Récupère toutes les conversations de l'utilisateur
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets conversation
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié

### Récupérer les messages d'une conversation
- **Chemin**: `/messaging/conversations/:conversationId/messages`
- **Méthode**: `GET`
- **Description**: Récupère tous les messages d'une conversation
- **Paramètres**:
  - **URL**: `conversationId` (integer, requis): ID de la conversation
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets message
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Conversation non trouvée

### Envoyer un message
- **Chemin**: `/messaging/conversations/:conversationId/messages`
- **Méthode**: `POST`
- **Description**: Envoie un message dans une conversation
- **Paramètres**:
  - **URL**: `conversationId` (integer, requis): ID de la conversation
  - **Corps**: 
    - `content` (string, requis): Contenu du message
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet message créé
- **Codes de statut**:
  - `201`: Message envoyé
  - `400`: Paramètres invalides
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Conversation non trouvée

## Notifications

### Récupérer les notifications
- **Chemin**: `/notifications`
- **Méthode**: `GET`
- **Description**: Récupère toutes les notifications de l'utilisateur
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Liste d'objets notification
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié

### Marquer une notification comme lue
- **Chemin**: `/notifications/:notificationId/mark-read`
- **Méthode**: `PUT`
- **Description**: Marque une notification comme lue
- **Paramètres**:
  - **URL**: `notificationId` (integer, requis): ID de la notification
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet notification mis à jour
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé
  - `404`: Notification non trouvée

## Administration

### Récupérer les statistiques
- **Chemin**: `/admin/stats`
- **Méthode**: `GET`
- **Description**: Récupère les statistiques d'utilisation de l'application
- **Paramètres**:
  - **En-têtes**: Token d'authentification (admin)
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet statistiques
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé (non admin)

### Bloquer un utilisateur
- **Chemin**: `/admin/users/:userId/block`
- **Méthode**: `PUT`
- **Description**: Bloque un utilisateur
- **Paramètres**:
  - **URL**: `userId` (integer, requis): ID de l'utilisateur
  - **En-têtes**: Token d'authentification (admin)
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet utilisateur mis à jour
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé (non admin)
  - `404`: Utilisateur non trouvé

### Débloquer un utilisateur
- **Chemin**: `/admin/users/:userId/unblock`
- **Méthode**: `PUT`
- **Description**: Débloque un utilisateur
- **Paramètres**:
  - **URL**: `userId` (integer, requis): ID de l'utilisateur
  - **En-têtes**: Token d'authentification (admin)
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: Objet utilisateur mis à jour
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié
  - `403`: Accès refusé (non admin)
  - `404`: Utilisateur non trouvé

## Authentification à deux facteurs (2FA)

### Configuration de la 2FA
- **Chemin**: `/2fa/setup`
- **Méthode**: `GET`
- **Description**: Génère un secret et un QR code pour configurer la 2FA
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: 
    ```json
    {
      "secret": "ABCDEFGHIJKLMNOP",
      "qrCodeUrl": "data:image/png;base64,..."
    }
    ```
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié

### Vérification de la configuration 2FA
- **Chemin**: `/2fa/verify-setup`
- **Méthode**: `POST`
- **Description**: Vérifie et active la 2FA pour l'utilisateur
- **Paramètres**:
  - **Corps**: 
    - `token` (string, requis): Code à 6 chiffres
    - `secret` (string, requis): Secret généré précédemment
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: `{ "success": true }`
- **Codes de statut**:
  - `200`: Succès
  - `400`: Code invalide
  - `401`: Non authentifié

### Désactivation de la 2FA
- **Chemin**: `/2fa/disable`
- **Méthode**: `POST`
- **Description**: Désactive la 2FA pour l'utilisateur
- **Paramètres**:
  - **En-têtes**: Token d'authentification
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: `{ "success": true }`
- **Codes de statut**:
  - `200`: Succès
  - `401`: Non authentifié

### Vérification 2FA lors de la connexion
- **Chemin**: `/2fa/verify-login`
- **Méthode**: `POST`
- **Description**: Vérifie le code 2FA lors de la connexion
- **Paramètres**:
  - **Corps**: 
    - `token` (string, requis): Code à 6 chiffres
    - `tempToken` (string, requis): Token temporaire reçu après la première étape de connexion
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: 
    ```json
    {
      "user": { ... },
      "accessToken": "...",
      "refreshToken": "..."
    }
    ```
- **Codes de statut**:
  - `200`: Succès
  - `400`: Code invalide
  - `401`: Token temporaire invalide

## Gestion des Tokens

### Rafraîchissement de token
- **Chemin**: `/token/refresh`
- **Méthode**: `POST`
- **Description**: Génère un nouveau token d'accès à partir d'un token de rafraîchissement
- **Paramètres**:
  - **Corps**: 
    - `refreshToken` (string, requis): Token de rafraîchissement
- **Réponse**:
  - **Format**: JSON
  - **Contenu**: 
    ```json
    {
      "accessToken": "...",
      "refreshToken": "..."
    }
    ```
- **Codes de statut**:
  - `200`: Succès
  - `400`: Token manquant
  - `401`: Token invalide ou expiré