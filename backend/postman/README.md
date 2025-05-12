# Tests API avec Postman

Ce dossier contient une collection Postman pour tester les API de l'application.

## Prérequis

1. Créer des utilisateurs de test (admin et non-admin) :
   ```
   node scripts/create-users.js
   ```
   Ce script créera :
   - Un administrateur (email: admin@example.com, mot de passe: admin_password)
   - Un utilisateur standard (email: user@example.com, mot de passe: user_password)

## Comment utiliser

1. Téléchargez et installez [Postman](https://www.postman.com/downloads/)
2. Ouvrez Postman et importez la collection :
   - Cliquez sur "Import" en haut à gauche
   - Sélectionnez le fichier `Admin_API_Collection.json`
3. Configurez les variables d'environnement :
   - Créez un nouvel environnement (cliquez sur l'icône d'engrenage en haut à droite)
   - Ajoutez les variables suivantes :
     - `baseUrl` : URL de base de votre API (par défaut : http://localhost:3000)
     - `adminToken` : Laissez vide (sera rempli automatiquement)
     - `userToken` : Laissez vide (sera rempli automatiquement)
     - `testUserId` : Laissez vide (sera rempli automatiquement)

## Exécution des tests

La collection est conçue pour être exécutée dans l'ordre :

1. Exécutez d'abord "Login Admin" pour obtenir un token d'administrateur
2. Exécutez ensuite "Login User" pour obtenir un token d'utilisateur standard
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
- **Supprimer un document inexistant** : `DELETE /documents/999999` - Tente de supprimer un document qui n'existe pas
- **Ajouter un document sans titre** : `POST /documents/add` - Tente d'ajouter un document sans titre

### Gestion des utilisateurs (admin uniquement)
- **Récupérer tous les utilisateurs** : `GET /admin/users`
- **Créer un utilisateur** : `POST /admin/users`
- **Désactiver un compte utilisateur** : `PUT /admin/users/:userId/deactivate`
- **Réactiver un compte utilisateur** : `PUT /admin/users/:userId/activate`

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
