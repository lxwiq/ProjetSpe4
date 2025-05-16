# Tests pour l'API Backend

**Groupe 9 : Axel / Safae et Loïc**

Ce répertoire contient les tests pour les routes de l'API backend utilisant Jest et Supertest.

## Structure

- `routes/` - Tests pour les routes API
  - `auth.test.js` - Tests pour les routes d'authentification
  - `user-routes.test.js` - Tests pour les routes utilisateur
  - `document-routes.test.js` - Tests pour les routes de documents
  - `collaboration-routes.test.js` - Tests pour les fonctionnalités collaboratives
  - `messaging-routes.test.js` - Tests pour la messagerie
- `setup.js` - Configuration globale pour les tests

## Exécution des tests

Pour exécuter tous les tests :

```bash
npm test
```

Pour exécuter un fichier de test spécifique :

```bash
npm test -- tests/routes/auth.test.js
```

Pour exécuter les tests avec un rapport de couverture :

```bash
npm test -- --coverage
```

## Couverture des tests

Les tests couvrent les fonctionnalités suivantes :

### Routes d'authentification
- Connexion avec des identifiants valides
- Connexion avec un email invalide
- Connexion avec un mot de passe invalide
- Gestion des erreurs

### Routes utilisateur
- Récupération de tous les utilisateurs
- Modification des informations utilisateur
- Gestion des erreurs

### Routes de documents
- Récupération de tous les documents d'un utilisateur
- Ajout d'un nouveau document
- Suppression d'un document
- Gestion des permissions
- Gestion des erreurs

### Routes collaboratives
- Invitation à collaborer
- Gestion des appels audio WebRTC
- Messagerie instantanée
- Notifications en temps réel

## Mocking

Les tests utilisent les capacités de mocking de Jest pour simuler :
- Le client Prisma pour les opérations de base de données
- JWT pour l'authentification
- bcrypt pour le hachage des mots de passe
- Socket.IO pour les communications en temps réel
- WebRTC pour les appels audio

Cela permet de tester les routes sans nécessiter une connexion réelle à la base de données ou des connexions WebRTC.