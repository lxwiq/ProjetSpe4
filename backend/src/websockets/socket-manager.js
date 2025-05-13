// src/websockets/socket-manager.js
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const realtimeDocumentService = require('../services/realtime-document-service');
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
        
        // Informer les autres utilisateurs qu'un nouvel utilisateur a rejoint
        socket.to(`document:${documentId}`).emit('document:user-joined', {
          userId: socket.userId,
          activeUsers: documentData.activeUsers
        });
        
        // Répondre avec les données du document
        if (callback) callback({ success: true, data: documentData });
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
      
      // Informer les autres utilisateurs que l'utilisateur a quitté
      socket.to(`document:${documentId}`).emit('document:user-left', {
        userId: socket.userId,
        activeUsers: realtimeDocumentService.getActiveUsers(documentId)
      });
    });
    
    // Mettre à jour le contenu d'un document
    socket.on('document:update', async (data, callback) => {
      try {
        const { documentId, content } = data;
        
        // Mettre à jour le contenu du document
        const updateData = await realtimeDocumentService.updateDocumentContent(documentId, socket.userId, content);
        
        // Diffuser la mise à jour aux autres utilisateurs
        socket.to(`document:${documentId}`).emit('document:content-changed', {
          content,
          userId: socket.userId,
          timestamp: updateData.lastModified
        });
        
        // Répondre avec les données de mise à jour
        if (callback) callback({ success: true, data: updateData });
      } catch (error) {
        console.error('Error updating document:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });
    
    // Sauvegarder un document
    socket.on('document:save', async (data, callback) => {
      try {
        const { documentId } = data;
        
        // Sauvegarder le document
        const saveData = await realtimeDocumentService.saveDocument(documentId, socket.userId);
        
        // Informer tous les utilisateurs que le document a été sauvegardé
        this.io.to(`document:${documentId}`).emit('document:saved', {
          documentId,
          savedAt: saveData.savedAt,
          savedBy: socket.userId,
          versionNumber: saveData.versionNumber
        });
        
        // Répondre avec les données de sauvegarde
        if (callback) callback({ success: true, data: saveData });
      } catch (error) {
        console.error('Error saving document:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });
    
    // Inviter un utilisateur à éditer un document
    socket.on('document:invite', async (data, callback) => {
      try {
        const { documentId, invitedUserId, permissionLevel } = data;
        
        // Créer l'invitation
        const invitation = await realtimeDocumentService.inviteUserToDocument(
          documentId,
          invitedUserId,
          socket.userId,
          permissionLevel
        );
        
        // Si l'utilisateur invité est connecté, lui envoyer une notification
        if (this.userSockets.has(invitedUserId)) {
          const invitedUserSocketId = this.userSockets.get(invitedUserId);
          this.io.to(invitedUserSocketId).emit('document:invitation', {
            documentId,
            invitedBy: socket.userId,
            permissionLevel,
            invitation
          });
        }
        
        // Répondre avec les données d'invitation
        if (callback) callback({ success: true, data: invitation });
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
        
        // Vérifier si l'utilisateur a accès au document
        const hasAccess = await realtimeDocumentService.checkUserDocumentAccess(documentId, socket.userId);
        if (!hasAccess) {
          throw new Error('Accès refusé au document');
        }
        
        // Créer un nouvel appel dans la base de données
        const newCall = await prisma.calls.create({
          data: {
            document_id: parseInt(documentId),
            initiated_by: socket.userId,
            call_type: 'audio',
            status: 'active'
          }
        });
        
        // Ajouter l'initiateur comme participant
        await prisma.call_participants.create({
          data: {
            call_id: newCall.id,
            user_id: socket.userId
          }
        });
        
        // Ajouter l'appel à la liste des appels actifs
        this.activeCalls.set(newCall.id, {
          participants: [{ userId: socket.userId, socketId: socket.id }],
          document_id: parseInt(documentId)
        });
        
        // Rejoindre la salle de l'appel
        socket.join(`call:${newCall.id}`);
        
        // Informer les utilisateurs actifs sur le document qu'un appel a démarré
        const activeUsers = realtimeDocumentService.getActiveUsers(documentId);
        activeUsers.forEach(userId => {
          if (userId !== socket.userId && this.userSockets.has(userId)) {
            const userSocketId = this.userSockets.get(userId);
            this.io.to(userSocketId).emit('call:started', {
              callId: newCall.id,
              documentId,
              initiatedBy: socket.userId
            });
          }
        });
        
        // Répondre avec les données de l'appel
        if (callback) callback({ success: true, data: { callId: newCall.id } });
      } catch (error) {
        console.error('Error starting call:', error);
        if (callback) callback({ success: false, error: error.message });
      }
    });
    
    // Rejoindre un appel
    socket.on('call:join', async (data, callback) => {
      try {
        const { callId } = data;
        
        // Vérifier si l'appel existe
        const call = await prisma.calls.findUnique({
          where: { id: parseInt(callId) },
          include: {
            documents: true
          }
        });
        
        if (!call) {
          throw new Error('Appel non trouvé');
        }
        
        // Vérifier si l'utilisateur a accès au document
        const hasAccess = await realtimeDocumentService.checkUserDocumentAccess(call.document_id, socket.userId);
        if (!hasAccess) {
          throw new Error('Accès refusé au document');
        }
        
        // Ajouter l'utilisateur comme participant
        await prisma.call_participants.create({
          data: {
            call_id: parseInt(callId),
            user_id: socket.userId
          }
        });
        
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
            await this.endCall(parseInt(callId));
          } else {
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
        
        // Informer les autres utilisateurs que l'utilisateur a quitté
        this.io.to(`document:${documentId}`).emit('document:user-left', {
          userId,
          activeUsers: realtimeDocumentService.getActiveUsers(documentId)
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
  }

  /**
   * Termine un appel
   * @param {number} callId - ID de l'appel
   */
  async endCall(callId) {
    // Mettre à jour l'appel dans la base de données
    await prisma.calls.update({
      where: { id: callId },
      data: {
        ended_at: new Date(),
        status: 'ended'
      }
    });
    
    // Supprimer l'appel de la liste des appels actifs
    this.activeCalls.delete(callId);
    
    // Informer tous les utilisateurs dans la salle que l'appel est terminé
    this.io.to(`call:${callId}`).emit('call:ended', { callId });
  }
}

module.exports = SocketManager;
