# Flux de données complexes

**Groupe 9 : Axel / Safae et Loïc**

Ce document détaille les flux de données pour les fonctionnalités complexes du backend.

## Édition collaborative en temps réel

L'édition collaborative en temps réel est l'une des fonctionnalités les plus complexes de l'application. Elle permet à plusieurs utilisateurs de modifier simultanément un document et de voir les modifications des autres en temps réel.

### Composants impliqués

- **Client** : Interface utilisateur avec éditeur de texte
- **Socket.IO** : Bibliothèque de communication en temps réel
- **RealtimeDocumentService** : Service gérant les documents actifs
- **DocumentService** : Service d'accès aux données des documents
- **Prisma** : ORM pour la persistance des données

### Flux de données

```
┌────────┐         ┌─────────┐         ┌─────────────────────┐         ┌──────────┐
│ Client │◄────────┤Socket.IO│◄────────┤RealtimeDocumentSvc │◄────────┤DocumentSvc│
└────┬───┘         └────┬────┘         └──────────┬──────────┘         └─────┬────┘
     │                  │                         │                          │
     │ document:join    │                         │                          │
     │─────────────────►│                         │                          │
     │                  │ joinDocument()          │                          │
     │                  │────────────────────────►│                          │
     │                  │                         │ getDocumentById()        │
     │                  │                         │─────────────────────────►│
     │                  │                         │                          │
     │                  │                         │◄─────────────────────────│
     │                  │◄────────────────────────│                          │
     │◄─────────────────│                         │                          │
     │                  │                         │                          │
     │ document:update  │                         │                          │
     │─────────────────►│                         │                          │
     │                  │ updateDocumentContent() │                          │
     │                  │────────────────────────►│                          │
     │                  │                         │                          │
     │                  │◄────────────────────────│                          │
     │◄─────────────────│                         │                          │
     │                  │                         │                          │
     │ document:save    │                         │                          │
     │─────────────────►│                         │                          │
     │                  │ saveDocument()          │                          │
     │                  │────────────────────────►│                          │
     │                  │                         │ createDocumentVersion()  │
     │                  │                         │─────────────────────────►│
     │                  │                         │                          │
     │                  │                         │◄─────────────────────────│
     │                  │◄────────────────────────│                          │
     │◄─────────────────│                         │                          │
     │                  │                         │                          │
     │ disconnect       │                         │                          │
     │─────────────────►│                         │                          │
     │                  │ leaveDocument()         │                          │
     │                  │────────────────────────►│                          │
     │                  │                         │                          │
     │                  │                         │                          │
└────┴───┘         └────┴────┘         └──────────┴──────────┘         └─────┴────┘
```

### Étapes détaillées

1. **Rejoindre un document**
   - Le client envoie un événement `document:join` avec l'ID du document
   - Le serveur vérifie les permissions de l'utilisateur via `DocumentService`
   - L'utilisateur est ajouté à la salle Socket.IO correspondante
   - Le serveur ajoute l'utilisateur à la liste des utilisateurs actifs du document
   - Le serveur envoie le contenu actuel du document et la liste des utilisateurs actifs

2. **Mise à jour du document**
   - Le client envoie un événement `document:update` avec les modifications
   - Le serveur met à jour le contenu en mémoire via `RealtimeDocumentService`
   - Le serveur diffuse les modifications à tous les utilisateurs dans la salle

3. **Sauvegarde du document**
   - Le client envoie un événement `document:save` ou la sauvegarde est déclenchée automatiquement
   - Le serveur crée une nouvelle version du document via `DocumentService`
   - Le serveur notifie tous les utilisateurs que le document a été sauvegardé

4. **Déconnexion**
   - Lorsqu'un utilisateur se déconnecte, le serveur le retire de la liste des utilisateurs actifs
   - Si c'était le dernier utilisateur, le document est sauvegardé automatiquement

### Gestion des conflits et synchronisation

- Chaque modification est horodatée et associée à un utilisateur
- Les modifications sont appliquées dans l'ordre de réception
- Pour les documents textuels, les modifications sont envoyées sous forme de deltas (opérations de transformation)
- En cas de conflit, la dernière modification reçue est prioritaire
- Des mécanismes de synchronisation évités la duplication de texte lors de l'édition collaborative
- L'affichage du dernier utilisateur ayant modifié un document ('dernière modification par: [username]') est mis à jour en temps réel

## Appels audio WebRTC entre collaborateurs

Les appels audio permettent aux utilisateurs de communiquer en temps réel pendant qu'ils collaborent sur un document. L'implémentation suit les patterns WebRTC d'angular.fr/realtime/webrtc.

### Composants impliqués

- **Client** : Interface utilisateur avec WebRTC
- **Socket.IO** : Signalisation pour WebRTC
- **CallService** : Service de gestion des appels
- **NotificationService** : Service de notification des utilisateurs
- **Prisma** : ORM pour la persistance des données

### Flux de données

```
┌────────┐         ┌─────────┐         ┌───────────┐         ┌─────────────────┐
│ Client │◄────────┤Socket.IO│◄────────┤ CallSvc   │◄────────┤NotificationSvc  │
└────┬───┘         └────┬────┘         └─────┬─────┘         └────────┬────────┘
     │                  │                    │                         │
     │ call:start       │                    │                         │
     │─────────────────►│                    │                         │
     │                  │ createCall()       │                         │
     │                  │───────────────────►│                         │
     │                  │                    │ createCallNotification()│
     │                  │                    │────────────────────────►│
     │                  │                    │                         │
     │                  │                    │◄────────────────────────│
     │                  │◄───────────────────│                         │
     │◄─────────────────│                    │                         │
     │                  │                    │                         │
     │                  │                    │                         │
     │                  │ call:started       │                         │
     │                  │─────────────────────────────────────────────►│
     │                  │                    │                         │
     │ call:join        │                    │                         │
     │─────────────────►│                    │                         │
     │                  │ joinCall()         │                         │
     │                  │───────────────────►│                         │
     │                  │                    │                         │
     │                  │◄───────────────────│                         │
     │◄─────────────────│                    │                         │
     │                  │                    │                         │
     │ call:offer       │                    │                         │
     │─────────────────►│                    │                         │
     │                  │ call:offer         │                         │
     │                  │─────────────────────────────────────────────►│
     │                  │                    │                         │
     │                  │ call:answer        │                         │
     │◄─────────────────│                    │                         │
     │                  │                    │                         │
     │ call:ice-candidate                    │                         │
     │─────────────────►│                    │                         │
     │                  │ call:ice-candidate │                         │
     │                  │─────────────────────────────────────────────►│
     │                  │                    │                         │
     │ call:end         │                    │                         │
     │─────────────────►│                    │                         │
     │                  │ endCall()          │                         │
     │                  │───────────────────►│                         │
     │                  │                    │                         │
     │                  │◄───────────────────│                         │
     │◄─────────────────│                    │                         │
     │                  │                    │                         │
└────┴───┘         └────┴────┘         └─────┴─────┘         └────────┴────────┘
```

### Étapes détaillées

1. **Démarrer un appel**
   - L'utilisateur A initie un appel via l'événement `call:start` avec l'ID du document
   - Le serveur crée un enregistrement d'appel via `CallService`
   - Le serveur envoie des notifications aux utilisateurs actifs sur le document via `NotificationService`

2. **Rejoindre un appel**
   - L'utilisateur B rejoint l'appel via l'événement `call:join`
   - Le serveur ajoute l'utilisateur comme participant à l'appel
   - Le serveur notifie tous les participants qu'un nouvel utilisateur a rejoint

3. **Établissement de la connexion WebRTC**
   - L'utilisateur A envoie une offre SDP via l'événement `call:offer`
   - Le serveur transmet l'offre à l'utilisateur B
   - L'utilisateur B répond avec une réponse SDP via l'événement `call:answer`
   - Les utilisateurs échangent des candidats ICE via l'événement `call:ice-candidate`
   - Une fois connectés, les flux audio circulent directement entre les clients (P2P)

4. **Terminer un appel**
   - Un utilisateur termine l'appel via l'événement `call:end`
   - Le serveur met à jour l'état de l'appel et notifie tous les participants
   - Les connexions WebRTC sont fermées

## Système de messagerie

L'application dispose de deux systèmes de messagerie distincts :

1. **Messagerie de document** : Intégrée à l'éditeur pour la communication pendant l'édition, sans historique des messages.

2. **Messagerie générale** : Accessible depuis la barre de navigation, avec historique complet des conversations.

## Système de notifications

Le système de notifications permet d'informer les utilisateurs des événements importants comme les invitations à collaborer, les nouveaux messages privés, etc.

### Composants impliqués

- **Client** : Interface utilisateur avec affichage des notifications
- **Socket.IO** : Transmission en temps réel des notifications
- **NotificationService** : Service de gestion des notifications
- **Prisma** : ORM pour la persistance des données

### Flux de données

```
┌────────────┐      ┌─────────────┐      ┌──────────────────┐      ┌──────────┐
│ Action     │      │ Controller/ │      │ NotificationSvc  │      │ Socket.IO │
│ Initiator  │─────►│ Service     │─────►│                  │─────►│          │
└────────────┘      └─────────────┘      └────────┬─────────┘      └────┬─────┘
                                                  │                     │
                                                  │ createNotification()│
                                                  │                     │
                                                  ▼                     │
                                         ┌──────────────────┐           │
                                         │ Database         │           │
                                         │ (Prisma)         │           │
                                         └──────────────────┘           │
                                                                        │
                                                                        │
                                                                        ▼
                                                                 ┌────────────┐
                                                                 │ Recipient  │
                                                                 │ Client     │
                                                                 └────────────┘
```

### Étapes détaillées

1. **Création d'une notification**
   - Une action déclenche la création d'une notification (invitation, message, etc.)
   - Le service concerné appelle `NotificationService.createNotification()`
   - La notification est enregistrée dans la base de données
   - Si le destinataire est connecté, la notification est envoyée en temps réel via Socket.IO

2. **Réception d'une notification**
   - Le client reçoit la notification via l'événement `notification:received`
   - Le client affiche la notification à l'utilisateur

3. **Marquage comme lue**
   - L'utilisateur consulte la notification
   - Le client envoie un événement `notification:mark-read`
   - Le serveur met à jour l'état de la notification dans la base de données

4. **Récupération des notifications**
   - Le client peut récupérer toutes les notifications via une requête HTTP GET `/notifications`
   - Le serveur renvoie les notifications filtrées selon les paramètres (lues/non lues, limite, etc.)
