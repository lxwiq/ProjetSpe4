// src/websockets/socket-manager.js
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const realtimeDocumentService = require('../services/realtime-document-service');
const messagingService = require('../services/messaging-service');
const notificationService = require('../services/notification-service');
const prisma = require('../lib/prisma');

class SocketManager {
  constructor(server) {
    this.io = socketIo(server, {
      cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Map pour stocker les connexions socket des utilisateurs
    // clé: userId, valeur: socketId
    this.userSockets = new Map();

    // Map pour stocker les appels actifs
    // clé: callId, valeur: { participants: [{ userId, socketId }], document_id }
    this.activeCalls = new Map();

    this.setupSocketEvents();
  }

  /**
   * Configure les événements de socket
   */
  setupSocketEvents() {
    this.io.use((socket, next) => {
      // Middleware d'authentification
      const token = socket.handshake.auth.token || socket.handshake.query.token;

      if (!token) {
        return next(new Error('Authentication error: Token missing'));
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        socket.userId = decoded.userId;
        socket.isAdmin = decoded.isAdmin || false;
        next();
      } catch (error) {
        return next(new Error('Authentication error: Invalid token'));
      }
    });

    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.userId}, Socket ID: ${socket.id}`);

      // Stocker la connexion socket de l'utilisateur
      this.userSockets.set(socket.userId, socket.id);

      // Événements pour l'édition de documents
      this.setupDocumentEvents(socket);

      // Événements pour les appels audio
      this.setupCallEvents(socket);

      // Événements pour la messagerie
      this.setupMessagingEvents(socket);

      // Événements pour les notifications
      this.setupNotificationEvents(socket);

      // Envoyer les notifications en attente à l'utilisateur qui vient de se connecter
      this.sendPendingNotifications(socket.userId);

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);
        this.userSockets.delete(socket.userId);

        // Gérer la déconnexion pour les documents actifs
        this.handleUserDisconnect(socket.userId);
      });
    });
  }

  /**
   * Configure les événements liés aux documents
   * @param {Socket} socket - Socket de l'utilisateur
   */
  setupDocumentEvents(socket) {
    // Rejoindre un document
    socket.on('document:join', async (data, callback) => {
      try {
        const { documentId } = data;

        // Ajouter l'utilisateur à la salle du document
        socket.join(`document:${documentId}`);

        // Ajouter l'utilisateur au document actif
        const documentData = await realtimeDocumentService.joinDocument(documentId, socket.userId);

        console.log(`User ${socket.userId} added to active document ${documentId}`);
        console.log(`Active users in document ${documentId}:`, documentData.activeUsers);

        // Récupérer les informations de l'utilisateur
        const userInfo = await realtimeDocumentService.getUserInfo(socket.userId);

        // Informer les autres utilisateurs qu'un nouvel utilisateur a rejoint
        const joinData = {
          userId: socket.userId,
          username: userInfo.username,
          color: userInfo.color,
          activeUsers: documentData.activeUsers
        };

        console.log(`Emitting user-joined event to room document:${documentId}:`, joinData);

        this.io.to(`document:${documentId}`).emit('document:user-joined', joinData);

        // Convertir les BigInt en nombre avant de les renvoyer
        const safeDocumentData = JSON.parse(JSON.stringify(documentData, (key, value) =>
          typeof value === 'bigint' ? Number(value) : value
        ));

        // Répondre avec les données du document
        if (callback) callback({ success: true, data: safeDocumentData });
      } catch (error) {
        console.error('Error joining document:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Quitter un document
    socket.on('document:leave', (data) => {
      const { documentId } = data;

      // Retirer l'utilisateur de la salle du document
      socket.leave(`document:${documentId}`);

      // Retirer l'utilisateur du document actif
      realtimeDocumentService.leaveDocument(documentId, socket.userId);

      // Récupérer les utilisateurs actifs
      realtimeDocumentService.getActiveUsers(documentId, true).then(activeUsers => {
        // Informer tous les utilisateurs dans la salle que l'utilisateur a quitté
        this.io.to(`document:${documentId}`).emit('document:user-left', {
          userId: socket.userId,
          activeUsers
        });
      }).catch(error => {
        console.error('Error getting active users:', error);
        // Fallback en cas d'erreur
        this.io.to(`document:${documentId}`).emit('document:user-left', {
          userId: socket.userId
        });
      });
    });

    // Mettre à jour le contenu d'un document
    socket.on('document:update', async (data, callback) => {
      try {
        const { documentId, content, delta } = data;

        // Réduire la verbosité des logs pour améliorer les performances
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Document update received from user ${socket.userId} for document ${documentId}`);
        }

        // Vérifier si l'utilisateur est dans la salle du document
        const rooms = Array.from(socket.rooms);
        const isInDocumentRoom = rooms.includes(`document:${documentId}`);

        if (!isInDocumentRoom) {
          socket.join(`document:${documentId}`);
        }

        if (delta) {
          // Vérifier que le delta a une structure valide
          if (!delta.ops || !Array.isArray(delta.ops)) {
            if (callback) callback({
              success: false,
              error: 'Invalid delta structure'
            });
            return;
          }

          // Diffuser le delta à tous les AUTRES utilisateurs dans la salle
          // Fix: Ne pas renvoyer la mise à jour au même utilisateur pour éviter les problèmes de synchronisation
          socket.to(`document:${documentId}`).emit('document:content-changed', {
            ops: delta.ops,
            userId: socket.userId,
            timestamp: new Date()
          });

          // Si un callback est fourni, répondre avec succès
          if (callback) callback({ success: true });

          // Mettre à jour le contenu en mémoire sans écrire sur le disque à chaque modification
          // pour améliorer les performances
          if (content) {
            try {
              // Mettre à jour uniquement le contenu en mémoire
              realtimeDocumentService.updateDocumentContentInMemory(documentId, socket.userId, content);

              // Planifier une écriture sur disque périodique (toutes les 30 secondes)
              // Cette fonction sera implémentée dans le service realtimeDocumentService
              realtimeDocumentService.scheduleDocumentPersistence(documentId);
            } catch (backgroundError) {
              console.error('Error in memory content update:', backgroundError);
            }
          }
        } else if (content) {
          // Mettre à jour le contenu du document en mémoire
          const updateData = await realtimeDocumentService.updateDocumentContentInMemory(documentId, socket.userId, content);

          // Diffuser la mise à jour à tous les AUTRES utilisateurs dans la salle
          socket.to(`document:${documentId}`).emit('document:content-changed', {
            content,
            userId: socket.userId,
            timestamp: updateData.lastModified
          });

          // Planifier une écriture sur disque périodique
          realtimeDocumentService.scheduleDocumentPersistence(documentId);

          // Convertir les BigInt en nombre avant de les renvoyer
          const safeUpdateData = JSON.parse(JSON.stringify(updateData, (key, value) =>
            typeof value === 'bigint' ? Number(value) : value
          ));

          // Répondre avec les données de mise à jour
          if (callback) callback({ success: true, data: safeUpdateData });
        } else {
          throw new Error('Ni delta ni contenu fourni pour la mise à jour');
        }
      } catch (error) {
        console.error('Error updating document:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Mettre à jour la position du curseur
    socket.on('document:cursor-update', (data) => {
      const { documentId, position } = data;

      // Récupérer les informations de l'utilisateur
      realtimeDocumentService.getUserInfo(socket.userId).then(userInfo => {
        // Générer une couleur unique pour l'utilisateur basée sur son ID
        const colors = [
          '#FF5733', '#33A8FF', '#33FF57', '#FF33A8', '#A833FF',
          '#FF9F33', '#33FFF9', '#9FFF33', '#FF33F5', '#33FFB8'
        ];
        const userColor = userInfo.color || colors[socket.userId % colors.length];

        const cursorData = {
          userId: socket.userId,
          username: userInfo.username || `Utilisateur ${socket.userId}`,
          position: {
            index: position.index,
            length: position.length || 0
          },
          color: userColor,
          profilePicture: userInfo.profile_picture || null,
          timestamp: new Date().toISOString()
        };

        // Diffuser la mise à jour du curseur à tous les AUTRES utilisateurs dans la salle
        // Fix: Ne pas renvoyer la mise à jour au même utilisateur pour éviter les curseurs dupliqués
        socket.to(`document:${documentId}`).emit('document:cursor-moved', cursorData);
      }).catch(error => {
        console.error('Error getting user info for cursor update:', error);
      });
    });

    // Mettre à jour la sélection
    socket.on('document:selection-update', (data) => {
      const { documentId, range } = data;

      console.log(`Selection update received from user ${socket.userId} for document ${documentId}:`, range);

      const selectionData = {
        userId: socket.userId,
        range
      };

      console.log(`Emitting selection update to room document:${documentId}:`, selectionData);

      // Diffuser la mise à jour de la sélection à tous les utilisateurs dans la salle
      this.io.to(`document:${documentId}`).emit('document:selection-update', selectionData);
    });

    // Indiquer que l'utilisateur est en train de taper
    socket.on('document:typing', (data) => {
      const { documentId, isTyping } = data;

      const typingData = {
        userId: socket.userId,
        isTyping
      };

      // Diffuser le statut de frappe à tous les utilisateurs dans la salle
      this.io.to(`document:${documentId}`).emit('document:typing', typingData);
    });

    // Sauvegarder un document
    socket.on('document:save', async (data, callback) => {
      try {
        const { documentId, content } = data;

        // Vérifier si le document est en édition active
        const activeUsers = await realtimeDocumentService.getActiveUsers(documentId);

        // Si le contenu est fourni, mettre d'abord à jour le contenu du document actif
        if (content !== undefined) {
          await realtimeDocumentService.updateDocumentContent(documentId, socket.userId, content);
        }

        // Sauvegarder le document
        const saveData = await realtimeDocumentService.saveDocument(documentId, socket.userId);

        // Informer tous les utilisateurs que le document a été sauvegardé
        this.io.to(`document:${documentId}`).emit('document:saved', {
          documentId,
          savedAt: saveData.savedAt,
          savedBy: socket.userId,
          versionNumber: saveData.versionNumber
        });

        // Convertir les BigInt en nombre avant de les renvoyer
        const safeSaveData = JSON.parse(JSON.stringify(saveData, (key, value) =>
          typeof value === 'bigint' ? Number(value) : value
        ));

        // Répondre avec les données de sauvegarde
        if (callback) callback({ success: true, data: safeSaveData });
      } catch (error) {
        console.error('Error saving document:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Inviter un utilisateur à éditer un document
    socket.on('document:invite', async (data, callback) => {
      try {
        const { documentId, invitedUserId, permissionLevel } = data;

        // Récupérer les informations du document
        const document = await prisma.documents.findUnique({
          where: { id: parseInt(documentId) },
          select: { title: true }
        });

        if (!document) {
          throw new Error('Document non trouvé');
        }

        // Créer une notification pour l'invitation au document
        const notification = await notificationService.createDocumentInviteNotification(
          invitedUserId,
          parseInt(documentId),
          socket.userId,
          document.title,
          permissionLevel
        );

        // Si l'utilisateur invité est connecté, lui envoyer une notification en temps réel
        if (this.userSockets.has(invitedUserId)) {
          const invitedUserSocketId = this.userSockets.get(invitedUserId);
          this.io.to(invitedUserSocketId).emit('document:invitation', {
            documentId,
            invitedBy: socket.userId,
            permissionLevel
          });

          // Envoyer également la notification
          this.sendNotification(invitedUserId, notification);
        }

        // Répondre avec succès
        if (callback) callback({
          success: true,
          data: {
            documentId: parseInt(documentId),
            invitedUserId: parseInt(invitedUserId)
          }
        });
      } catch (error) {
        console.error('Error inviting user to document:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });
  }

  /**
   * Configure les événements liés aux appels audio
   * @param {Socket} socket - Socket de l'utilisateur
   */
  setupCallEvents(socket) {
    // Démarrer un appel
    socket.on('call:start', async (data, callback) => {
      try {
        const { documentId } = data;

        console.log(`[APPEL VOCAL] Utilisateur ${socket.userId} démarre un appel pour le document ${documentId}`);

        // Vérifier si l'utilisateur a accès au document
        const hasAccess = await realtimeDocumentService.checkUserDocumentAccess(documentId, socket.userId);
        if (!hasAccess) {
          console.error(`[APPEL VOCAL] Utilisateur ${socket.userId} n'a pas accès au document ${documentId}`);
          throw new Error('Accès refusé au document');
        }

        // Vérifier s'il existe déjà un appel actif pour ce document
        const existingCall = await prisma.calls.findFirst({
          where: {
            document_id: parseInt(documentId),
            status: 'active',
            ended_at: null
          }
        });

        let callId;

        if (existingCall) {
          console.log(`[APPEL VOCAL] Appel actif existant ${existingCall.id} trouvé pour le document ${documentId}`);
          callId = existingCall.id;

          // Utiliser upsert pour créer ou mettre à jour le participant en une seule opération atomique
          try {
            // Utiliser l'opération upsert de Prisma pour créer ou mettre à jour le participant
            await prisma.call_participants.upsert({
              where: {
                call_id_user_id: {
                  call_id: callId,
                  user_id: socket.userId
                }
              },
              update: {
                is_active: true,
                joined_at: new Date(),
                left_at: null
              },
              create: {
                call_id: callId,
                user_id: socket.userId,
                is_active: true,
                joined_at: new Date()
              }
            });
            console.log(`[APPEL VOCAL] Participant ajouté ou mis à jour pour l'utilisateur ${socket.userId} dans l'appel ${callId}`);
          } catch (err) {
            console.error(`[APPEL VOCAL] Erreur lors de l'ajout ou de la mise à jour du participant: ${err.message}`);
            // Ne pas lancer d'erreur pour permettre à l'appel de continuer même en cas d'erreur
          }

          // Ajouter l'utilisateur à la liste des participants de l'appel
          if (this.activeCalls.has(callId)) {
            const activeCall = this.activeCalls.get(callId);
            activeCall.participants.push({ userId: socket.userId, socketId: socket.id });
            this.activeCalls.set(callId, activeCall);
          } else {
            // Si l'appel n'est pas dans la liste des appels actifs, l'ajouter
            this.activeCalls.set(callId, {
              participants: [{ userId: socket.userId, socketId: socket.id }],
              document_id: parseInt(documentId)
            });
          }
        } else {
          // Créer un nouvel appel dans la base de données
          console.log(`[APPEL VOCAL] Création d'un nouvel appel pour le document ${documentId} par l'utilisateur ${socket.userId}`);
          const newCall = await prisma.calls.create({
            data: {
              document_id: parseInt(documentId),
              initiated_by: socket.userId,
              call_type: 'audio',
              status: 'active'
            }
          });

          callId = newCall.id;
          console.log(`[APPEL VOCAL] Nouvel appel créé avec l'ID ${callId}`);

          // Ajouter l'initiateur comme participant avec upsert
          try {
            // Utiliser l'opération upsert de Prisma pour créer ou mettre à jour le participant
            await prisma.call_participants.upsert({
              where: {
                call_id_user_id: {
                  call_id: callId,
                  user_id: socket.userId
                }
              },
              update: {
                is_active: true,
                joined_at: new Date(),
                left_at: null
              },
              create: {
                call_id: callId,
                user_id: socket.userId,
                is_active: true,
                joined_at: new Date()
              }
            });
            console.log(`[APPEL VOCAL] Initiateur ${socket.userId} ajouté comme participant à l'appel ${callId}`);
          } catch (err) {
            console.error(`[APPEL VOCAL] Erreur lors de l'ajout de l'initiateur comme participant: ${err.message}`);
            // Ne pas lancer d'erreur pour permettre à l'appel de continuer même en cas d'erreur
          }

          // Ajouter l'appel à la liste des appels actifs
          this.activeCalls.set(callId, {
            participants: [{ userId: socket.userId, socketId: socket.id }],
            document_id: parseInt(documentId)
          });
        }

        // Rejoindre la salle de l'appel
        socket.join(`call:${callId}`);

        // Récupérer les informations du document
        const document = await prisma.documents.findUnique({
          where: { id: parseInt(documentId) },
          select: { title: true }
        });

        // Vérifier si le document existe
        if (!document) {
          throw new Error('Document non trouvé');
        }

        // Récupérer les utilisateurs actifs sur le document
        let activeUsers = [];
        try {
          activeUsers = await realtimeDocumentService.getActiveUsers(documentId) || [];
          console.log(`Active users for document ${documentId}:`, activeUsers);
        } catch (error) {
          console.error(`Error getting active users for document ${documentId}:`, error);
          activeUsers = [];
        }

        // S'assurer que activeUsers est un tableau
        if (!Array.isArray(activeUsers)) {
          console.error(`Active users is not an array for document ${documentId}:`, activeUsers);
          activeUsers = [];
        }

        // Informer les utilisateurs actifs sur le document qu'un appel a démarré
        for (const userId of activeUsers) {
          if (userId !== socket.userId) {
            try {
              // Créer une notification pour l'appel
              const notification = await notificationService.createCallNotification(
                userId,
                callId,
                socket.userId,
                parseInt(documentId),
                document.title
              );

              // Si l'utilisateur est connecté, lui envoyer une notification en temps réel
              if (this.userSockets.has(userId)) {
                const userSocketId = this.userSockets.get(userId);
                this.io.to(userSocketId).emit('call:started', {
                  callId: callId,
                  documentId,
                  initiatedBy: socket.userId
                });

                // Envoyer également la notification
                this.sendNotification(userId, notification);
              }
            } catch (error) {
              console.error(`Error notifying user ${userId} about call ${callId}:`, error);
            }
          }
        }

        // Récupérer les participants actuels de l'appel
        const currentParticipants = await prisma.call_participants.findMany({
          where: {
            call_id: callId,
            is_active: true
          },
          select: {
            user_id: true
          }
        });

        const participantIds = currentParticipants.map(p => p.user_id);

        // Répondre avec les données de l'appel
        console.log(`Call ${callId} created successfully for document ${documentId} by user ${socket.userId}`);
        console.log(`Sending response to user ${socket.userId}:`, {
          success: true,
          data: {
            callId: callId,
            documentId: parseInt(documentId),
            participants: participantIds
          }
        });

        if (callback) callback({
          success: true,
          data: {
            callId: callId,
            documentId: parseInt(documentId),
            participants: participantIds
          }
        });
      } catch (error) {
        console.error('Error starting call:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Rejoindre un appel
    socket.on('call:join', async (data, callback) => {
      try {
        const { callId } = data;

        console.log(`[APPEL VOCAL] Utilisateur ${socket.userId} tente de rejoindre l'appel ${callId}`);

        // Vérifier si l'appel existe
        const call = await prisma.calls.findUnique({
          where: { id: parseInt(callId) },
          include: {
            documents: true
          }
        });

        if (!call) {
          console.error(`[APPEL VOCAL] Appel ${callId} non trouvé`);
          throw new Error('Appel non trouvé');
        }

        console.log(`[APPEL VOCAL] Appel ${callId} trouvé pour le document ${call.document_id}`);

        // Vérifier si l'utilisateur a accès au document
        const hasAccess = await realtimeDocumentService.checkUserDocumentAccess(call.document_id, socket.userId);
        if (!hasAccess) {
          console.error(`[APPEL VOCAL] Utilisateur ${socket.userId} n'a pas accès au document ${call.document_id}`);
          throw new Error('Accès refusé au document');
        }

        console.log(`[APPEL VOCAL] Utilisateur ${socket.userId} a accès au document ${call.document_id}`);

        // Utiliser upsert pour créer ou mettre à jour le participant en une seule opération atomique
        try {
          // Utiliser l'opération upsert de Prisma pour créer ou mettre à jour le participant
          await prisma.call_participants.upsert({
            where: {
              call_id_user_id: {
                call_id: parseInt(callId),
                user_id: socket.userId
              }
            },
            update: {
              is_active: true,
              joined_at: new Date(),
              left_at: null
            },
            create: {
              call_id: parseInt(callId),
              user_id: socket.userId,
              is_active: true,
              joined_at: new Date()
            }
          });
          console.log(`[APPEL VOCAL] Participant ajouté ou mis à jour pour l'utilisateur ${socket.userId} dans l'appel ${callId}`);
        } catch (err) {
          console.error(`[APPEL VOCAL] Erreur lors de l'ajout ou de la mise à jour du participant: ${err.message}`);
          // Ne pas lancer d'erreur pour permettre à l'appel de continuer même en cas d'erreur
        }

        // Ajouter l'utilisateur à la liste des participants de l'appel
        if (this.activeCalls.has(parseInt(callId))) {
          const activeCall = this.activeCalls.get(parseInt(callId));
          activeCall.participants.push({ userId: socket.userId, socketId: socket.id });
          this.activeCalls.set(parseInt(callId), activeCall);
        } else {
          // Si l'appel n'est pas dans la liste des appels actifs, l'ajouter
          this.activeCalls.set(parseInt(callId), {
            participants: [{ userId: socket.userId, socketId: socket.id }],
            document_id: call.document_id
          });
        }

        // Rejoindre la salle de l'appel
        socket.join(`call:${callId}`);

        // Informer les autres participants qu'un nouvel utilisateur a rejoint
        socket.to(`call:${callId}`).emit('call:user-joined', {
          callId,
          userId: socket.userId
        });

        // Répondre avec les données de l'appel
        if (callback) callback({
          success: true,
          data: {
            callId,
            participants: this.activeCalls.get(parseInt(callId)).participants.map(p => p.userId)
          }
        });
      } catch (error) {
        console.error('Error joining call:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Quitter un appel
    socket.on('call:leave', async (data, callback) => {
      try {
        const { callId } = data;

        console.log(`[APPEL VOCAL] Utilisateur ${socket.userId} quitte l'appel ${callId}`);

        // Mettre à jour le participant dans la base de données
        await prisma.call_participants.updateMany({
          where: {
            call_id: parseInt(callId),
            user_id: socket.userId,
            left_at: null
          },
          data: {
            left_at: new Date(),
            is_active: false
          }
        });

        // Retirer l'utilisateur de la liste des participants de l'appel
        if (this.activeCalls.has(parseInt(callId))) {
          const activeCall = this.activeCalls.get(parseInt(callId));
          activeCall.participants = activeCall.participants.filter(p => p.userId !== socket.userId);

          // Si plus aucun participant, terminer l'appel
          if (activeCall.participants.length === 0) {
            console.log(`[APPEL VOCAL] Plus aucun participant dans l'appel ${callId}, terminaison de l'appel`);
            await this.endCall(parseInt(callId));
          } else {
            console.log(`[APPEL VOCAL] ${activeCall.participants.length} participant(s) restant(s) dans l'appel ${callId}`);
            this.activeCalls.set(parseInt(callId), activeCall);

            // Informer les autres participants que l'utilisateur a quitté
            socket.to(`call:${callId}`).emit('call:user-left', {
              callId,
              userId: socket.userId
            });
          }
        }

        // Quitter la salle de l'appel
        socket.leave(`call:${callId}`);

        // Répondre avec succès
        if (callback) callback({ success: true });
      } catch (error) {
        console.error('Error leaving call:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Signalisation WebRTC
    socket.on('call:signal', (data) => {
      const { callId, userId, signal } = data;

      // Transmettre le signal à l'utilisateur cible
      if (this.userSockets.has(userId)) {
        const targetSocketId = this.userSockets.get(userId);
        this.io.to(targetSocketId).emit('call:signal', {
          callId,
          userId: socket.userId,
          signal
        });
      }
    });

    // Activité vocale
    socket.on('call:voice-activity', async (data) => {
      try {
        const { callId, isSpeaking } = data;

        // Nous ne loggons pas chaque activité vocale pour éviter de surcharger les logs
        // Mais nous vérifions quand même si l'appel existe
        const call = await prisma.calls.findUnique({
          where: { id: parseInt(callId) }
        });

        if (!call) {
          console.error(`[APPEL VOCAL] Appel ${callId} non trouvé pour l'activité vocale`);
          return;
        }

        // Vérifier si l'utilisateur est un participant à l'appel
        const isParticipant = await prisma.call_participants.findFirst({
          where: {
            call_id: parseInt(callId),
            user_id: socket.userId,
            is_active: true
          }
        });

        if (!isParticipant) {
          console.error(`[APPEL VOCAL] Utilisateur ${socket.userId} n'est pas un participant actif dans l'appel ${callId}`);
          return;
        }

        // Diffuser l'activité vocale à tous les participants de l'appel
        socket.to(`call:${callId}`).emit('call:voice-activity', {
          callId,
          userId: socket.userId,
          isSpeaking
        });
      } catch (error) {
        console.error('Error handling voice activity:', error);
      }
    });
  }

  /**
   * Gère la déconnexion d'un utilisateur
   * @param {number} userId - ID de l'utilisateur déconnecté
   */
  async handleUserDisconnect(userId) {
    // Retirer l'utilisateur de tous les documents actifs
    for (const [documentId, documentData] of realtimeDocumentService.activeDocuments.entries()) {
      if (documentData.users.includes(userId)) {
        realtimeDocumentService.leaveDocument(documentId, userId);

        // Récupérer les utilisateurs actifs
        realtimeDocumentService.getActiveUsers(documentId, true).then(activeUsers => {
          // Informer les autres utilisateurs que l'utilisateur a quitté
          this.io.to(`document:${documentId}`).emit('document:user-left', {
            userId,
            activeUsers
          });
        }).catch(error => {
          console.error('Error getting active users:', error);
          // Fallback en cas d'erreur
          this.io.to(`document:${documentId}`).emit('document:user-left', {
            userId
          });
        });
      }
    }

    // Retirer l'utilisateur de tous les appels actifs
    for (const [callId, callData] of this.activeCalls.entries()) {
      const participant = callData.participants.find(p => p.userId === userId);
      if (participant) {
        // Mettre à jour le participant dans la base de données
        await prisma.call_participants.updateMany({
          where: {
            call_id: callId,
            user_id: userId,
            left_at: null
          },
          data: {
            left_at: new Date(),
            is_active: false
          }
        });

        // Retirer l'utilisateur de la liste des participants
        callData.participants = callData.participants.filter(p => p.userId !== userId);

        // Si plus aucun participant, terminer l'appel
        if (callData.participants.length === 0) {
          await this.endCall(callId);
        } else {
          this.activeCalls.set(callId, callData);

          // Informer les autres participants que l'utilisateur a quitté
          this.io.to(`call:${callId}`).emit('call:user-left', {
            callId,
            userId
          });
        }
      }
    }

    // Retirer l'utilisateur de toutes les conversations actives
    for (const [conversationId, users] of messagingService.activeConversations.entries()) {
      if (users.includes(userId)) {
        messagingService.removeUserFromActiveConversation(conversationId, userId);

        // Informer les autres utilisateurs que l'utilisateur a quitté
        this.io.to(`conversation:${conversationId}`).emit('conversation:user-left', {
          conversationId,
          userId,
          activeUsers: messagingService.getActiveConversationUsers(conversationId)
        });
      }
    }
  }

  /**
   * Termine un appel
   * @param {number} callId - ID de l'appel
   */
  async endCall(callId) {
    console.log(`[APPEL VOCAL] Terminaison de l'appel ${callId}`);

    // Mettre à jour l'appel dans la base de données
    await prisma.calls.update({
      where: { id: callId },
      data: {
        ended_at: new Date(),
        status: 'ended'
      }
    });

    // Mettre à jour tous les participants pour les marquer comme inactifs
    await prisma.call_participants.updateMany({
      where: {
        call_id: callId,
        is_active: true
      },
      data: {
        is_active: false,
        left_at: new Date()
      }
    });

    console.log(`[APPEL VOCAL] Appel ${callId} marqué comme terminé dans la base de données`);

    // Supprimer l'appel de la liste des appels actifs
    this.activeCalls.delete(callId);

    // Informer tous les utilisateurs dans la salle que l'appel est terminé
    this.io.to(`call:${callId}`).emit('call:ended', { callId });
    console.log(`[APPEL VOCAL] Notification de fin d'appel envoyée pour l'appel ${callId}`);
  }

  /**
   * Envoie une notification à un utilisateur
   * @param {number} userId - ID de l'utilisateur destinataire
   * @param {Object} notification - Notification à envoyer
   */
  sendNotification(userId, notification) {
    if (this.userSockets.has(userId)) {
      // Si l'utilisateur est connecté, lui envoyer la notification en temps réel
      const socketId = this.userSockets.get(userId);
      this.io.to(socketId).emit('notification:received', { notification });
    }
  }

  /**
   * Envoie les notifications en attente à un utilisateur
   * @param {number} userId - ID de l'utilisateur
   */
  sendPendingNotifications(userId) {
    if (this.userSockets.has(userId)) {
      const pendingNotifications = notificationService.getPendingNotifications(userId);

      if (pendingNotifications.length > 0) {
        const socketId = this.userSockets.get(userId);

        // Envoyer toutes les notifications en attente
        this.io.to(socketId).emit('notification:pending', { notifications: pendingNotifications });

        // Effacer les notifications en attente
        notificationService.clearPendingNotifications(userId);
      }
    }
  }

  /**
   * Configure les événements liés aux notifications
   * @param {Socket} socket - Socket de l'utilisateur
   */
  setupNotificationEvents(socket) {
    // Marquer une notification comme lue
    socket.on('notification:mark-read', async (data, callback) => {
      try {
        const { notificationId } = data;

        // Marquer la notification comme lue (en convertissant l'ID en entier)
        await notificationService.markAsRead(parseInt(notificationId), socket.userId);

        // Répondre avec succès
        if (callback) callback({ success: true });
      } catch (error) {
        console.error('Error marking notification as read:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Marquer toutes les notifications comme lues
    socket.on('notification:mark-all-read', async (data, callback) => {
      try {
        // Marquer toutes les notifications comme lues
        await notificationService.markAllAsRead(socket.userId);

        // Répondre avec succès
        if (callback) callback({ success: true });
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Supprimer une notification
    socket.on('notification:delete', async (data, callback) => {
      try {
        const { notificationId } = data;

        // Supprimer la notification (en convertissant l'ID en entier)
        await notificationService.deleteNotification(parseInt(notificationId), socket.userId);

        // Répondre avec succès
        if (callback) callback({ success: true });
      } catch (error) {
        console.error('Error deleting notification:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });
  }

  /**
   * Configure les événements liés à la messagerie
   * @param {Socket} socket - Socket de l'utilisateur
   */
  setupMessagingEvents(socket) {
    // Créer une nouvelle conversation
    socket.on('conversation:create', async (data, callback) => {
      try {
        const { participantIds, name, isGroup } = data;

        // S'assurer que l'utilisateur est inclus dans les participants
        const allParticipants = [...new Set([socket.userId, ...participantIds])];

        // Créer la conversation
        const conversation = await messagingService.createConversation(
          socket.userId,
          allParticipants,
          name,
          isGroup
        );

        // Rejoindre la salle de la conversation
        socket.join(`conversation:${conversation.id}`);

        // Ajouter l'utilisateur à la liste des utilisateurs actifs dans la conversation
        messagingService.addUserToActiveConversation(conversation.id, socket.userId);

        // Informer les autres participants qu'une nouvelle conversation a été créée
        allParticipants.forEach(userId => {
          if (userId !== socket.userId && this.userSockets.has(userId)) {
            const userSocketId = this.userSockets.get(userId);
            this.io.to(userSocketId).emit('conversation:created', {
              conversation
            });
          }
        });

        // Répondre avec les données de la conversation
        if (callback) callback({ success: true, data: conversation });
      } catch (error) {
        console.error('Error creating conversation:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Rejoindre une conversation
    socket.on('conversation:join', async (data, callback) => {
      try {
        const { conversationId } = data;

        // Vérifier si l'utilisateur est un participant de la conversation
        const conversation = await messagingService.getConversationById(conversationId);
        const isParticipant = conversation.conversation_participants.some(
          p => p.user_id === socket.userId && p.is_active
        );

        if (!isParticipant) {
          throw new Error('Vous n\'\u00eates pas un participant de cette conversation');
        }

        // Rejoindre la salle de la conversation
        socket.join(`conversation:${conversationId}`);

        // Ajouter l'utilisateur à la liste des utilisateurs actifs dans la conversation
        messagingService.addUserToActiveConversation(conversationId, socket.userId);

        // Informer les autres participants que l'utilisateur a rejoint
        socket.to(`conversation:${conversationId}`).emit('conversation:user-joined', {
          conversationId,
          userId: socket.userId,
          activeUsers: messagingService.getActiveConversationUsers(conversationId)
        });

        // Répondre avec les données de la conversation
        if (callback) callback({
          success: true,
          data: {
            conversation,
            activeUsers: messagingService.getActiveConversationUsers(conversationId)
          }
        });
      } catch (error) {
        console.error('Error joining conversation:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Quitter une conversation
    socket.on('conversation:leave', async (data) => {
      const { conversationId } = data;

      // Quitter la salle de la conversation
      socket.leave(`conversation:${conversationId}`);

      // Retirer l'utilisateur de la liste des utilisateurs actifs dans la conversation
      messagingService.removeUserFromActiveConversation(conversationId, socket.userId);

      // Informer les autres participants que l'utilisateur a quitté
      socket.to(`conversation:${conversationId}`).emit('conversation:user-left', {
        conversationId,
        userId: socket.userId,
        activeUsers: messagingService.getActiveConversationUsers(conversationId)
      });
    });

    // Envoyer un message
    socket.on('message:send', async (data, callback) => {
      try {
        const { conversationId, content } = data;

        // Envoyer le message
        const message = await messagingService.sendMessage(conversationId, socket.userId, content);

        // Récupérer la conversation pour les notifications
        const conversation = await prisma.conversations.findUnique({
          where: { id: conversationId },
          include: {
            conversation_participants: {
              where: { is_active: true },
              select: { user_id: true }
            }
          }
        });

        // Créer des notifications pour tous les participants (sauf l'expéditeur)
        for (const participant of conversation.conversation_participants) {
          if (participant.user_id !== socket.userId) {
            // Créer une notification pour le nouveau message
            const notification = await notificationService.createMessageNotification(
              participant.user_id,
              message,
              conversation
            );

            // Si le participant est connecté, lui envoyer le message en temps réel
            if (this.userSockets.has(participant.user_id)) {
              const participantSocketId = this.userSockets.get(participant.user_id);
              this.io.to(participantSocketId).emit('message:received', {
                message
              });

              // Envoyer également la notification
              this.sendNotification(participant.user_id, notification);
            }
          }
        }

        // Répondre avec les données du message
        if (callback) callback({ success: true, data: message });
      } catch (error) {
        console.error('Error sending message:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Marquer les messages comme lus
    socket.on('message:mark-read', async (data, callback) => {
      try {
        const { conversationId } = data;

        // Marquer les messages comme lus
        await prisma.messages.updateMany({
          where: {
            conversation_id: conversationId,
            sender_id: { not: socket.userId },
            read_at: null
          },
          data: {
            read_at: new Date()
          }
        });

        // Informer les autres utilisateurs que les messages ont été lus
        socket.to(`conversation:${conversationId}`).emit('message:read', {
          conversationId,
          userId: socket.userId
        });

        // Répondre avec succès
        if (callback) callback({ success: true });
      } catch (error) {
        console.error('Error marking messages as read:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });

    // Ajouter un participant à une conversation de groupe
    socket.on('conversation:add-participant', async (data, callback) => {
      try {
        const { conversationId, userId } = data;

        // Ajouter le participant
        const participant = await messagingService.addParticipant(conversationId, userId, socket.userId);

        // Informer tous les utilisateurs dans la conversation qu'un nouveau participant a été ajouté
        this.io.to(`conversation:${conversationId}`).emit('conversation:participant-added', {
          conversationId,
          participant,
          addedBy: socket.userId
        });

        // Récupérer les informations de la conversation
        const conversation = await prisma.conversations.findUnique({
          where: { id: conversationId },
          select: {
            name: true,
            is_group: true
          }
        });

        // Créer une notification pour l'invitation à la conversation
        const notification = await notificationService.createConversationInviteNotification(
          userId,
          conversationId,
          socket.userId,
          conversation.name || 'Nouvelle conversation'
        );

        // Si l'utilisateur ajouté est connecté, l'informer qu'il a été ajouté à une conversation
        if (this.userSockets.has(userId)) {
          const userSocketId = this.userSockets.get(userId);
          this.io.to(userSocketId).emit('conversation:added-to', {
            conversationId,
            addedBy: socket.userId
          });

          // Envoyer également la notification
          this.sendNotification(userId, notification);
        }

        // Répondre avec les données du participant
        if (callback) callback({ success: true, data: participant });
      } catch (error) {
        console.error('Error adding participant to conversation:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });
  }
}

module.exports = SocketManager;
