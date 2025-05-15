# Tests API avec Postman

Ce dossier contient des collections Postman pour tester les API de l'application.

## Collections disponibles

1. **Admin_API_Collection.json** - Tests des fonctionnalités d'administration et de base
2. **Collaborative_Features_Collection.json** - Tests des fonctionnalités collaboratives
3. **Calls_API_Collection.json** - Tests des fonctionnalités d'appels audio

## Prérequis

1. Les utilisateurs de test sont créés automatiquement lors de l'initialisation de la base de données :
   - Un administrateur (email: admin@example.com, mot de passe: test123)
   - Un utilisateur standard (email: user@example.com, mot de passe: test123)

## Comment utiliser

1. Téléchargez et installez [Postman](https://www.postman.com/downloads/)
2. Ouvrez Postman et importez les collections :
   - Cliquez sur "Import" en haut à gauche
   - Sélectionnez les fichiers JSON des collections
3. Configurez les variables d'environnement :
   - Créez un nouvel environnement (cliquez sur l'icône d'engrenage en haut à droite)
   - Ajoutez les variables suivantes :
     - `baseUrl` : URL de base de votre API (par défaut : http://localhost:3000)
     - `adminToken` : Laissez vide (sera rempli automatiquement)
     - `userToken` : Laissez vide (sera rempli automatiquement)
     - `testUserId` : Laissez vide (sera rempli automatiquement)
     - `testDocumentId` : Laissez vide (sera rempli automatiquement)
     - `callId` : Définissez à 1 ou un ID d'appel valide

## Exécution des tests

Les collections sont conçues pour être exécutées dans l'ordre :

1. Exécutez d'abord les requêtes d'authentification pour obtenir les tokens
2. Exécutez ensuite les requêtes de création de document pour obtenir un ID de document
3. Vous pouvez ensuite exécuter les autres requêtes dans l'ordre que vous souhaitez

Les tests automatisés vérifieront que les réponses sont correctes et stockeront automatiquement les tokens et IDs nécessaires.

## Routes disponibles

### Authentification
- **Login Admin** : `POST /login` - Connexion avec un compte administrateur
- **Login User** : `POST /login` - Connexion avec un compte utilisateur standard

### Gestion des documents
- **Récupérer tous les documents** : `GET /documents` - Récupère tous les documents de l'utilisateur connecté
- **Ajouter un document** : `POST /documents/add` - Ajoute un nouveau document
- **Supprimer un document** : `DELETE /documents/:id` - Supprime un document

### Gestion des utilisateurs (admin uniquement)
- **Récupérer tous les utilisateurs** : `GET /admin/users`
- **Créer un utilisateur** : `POST /admin/users`
- **Désactiver un compte utilisateur** : `PUT /admin/users/:userId/deactivate`
- **Réactiver un compte utilisateur** : `PUT /admin/users/:userId/activate`

### Fonctionnalités collaboratives
- **Récupérer les utilisateurs actifs** : `GET /collaborative-documents/:documentId/active-users`
- **Récupérer les invitations** : `GET /collaborative-documents/:documentId/invitations`
- **Inviter un utilisateur** : `POST /collaborative-documents/:documentId/invite`
- **Récupérer les appels actifs** : `GET /collaborative-documents/:documentId/calls`

### Appels audio
- **Récupérer les appels actifs** : `GET /calls/document/:documentId/active`
- **Récupérer les détails d'un appel** : `GET /calls/:callId`
- **Terminer un appel** : `PUT /calls/:callId/end`

### Tests de sécurité
- **Accès refusé - Utilisateur non admin** : Tente d'accéder à une route admin avec un token d'utilisateur standard
- **Accès refusé - Sans token** : Tente d'accéder à une route admin sans token
- **Accès refusé - Token invalide** : Tente d'accéder à une route admin avec un token invalide

## Tests automatisés

Chaque requête contient des tests automatisés qui vérifient :
- Le code de statut HTTP
- La structure de la réponse
- Les valeurs spécifiques dans la réponse
- L'absence de données sensibles (comme les mots de passe)

Les tests stockent également automatiquement les tokens et IDs nécessaires pour les requêtes suivantes.

## Note sur les tests WebSocket

Les fonctionnalités qui utilisent WebSocket (comme la création d'appels audio ou l'édition collaborative en temps réel) ne peuvent pas être testées directement avec Postman. Ces collections se concentrent sur les endpoints REST qui peuvent être testés directement.
