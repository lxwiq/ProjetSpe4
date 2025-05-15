// src/services/realtime-document-service.js
const prisma = require('../lib/prisma');

class RealtimeDocumentService {
  constructor() {
    // Map pour stocker les documents actuellement en édition
    // clé: document_id, valeur: { content, users: [user_ids], lastSaved: timestamp }
    this.activeDocuments = new Map();

    // Map pour stocker les timers de persistance des documents
    // clé: document_id, valeur: timer
    this.persistenceTimers = new Map();

    // Intervalle de persistance en millisecondes (30 secondes)
    this.persistenceInterval = 30000;
  }

  /**
   * Ajoute un utilisateur à un document actif ou crée une nouvelle session
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Informations sur le document
   */
  async joinDocument(documentId, userId) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await this.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      throw new Error('Accès refusé au document');
    }

    // Récupérer le document depuis la base de données
    const document = await prisma.documents.findUnique({
      where: { id: documentId },
      include: {
        users_documents_owner_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true
          }
        }
      }
    });

    if (!document) {
      throw new Error('Document non trouvé');
    }

    // Si le document n'est pas déjà en édition active, l'ajouter
    if (!this.activeDocuments.has(documentId)) {
      // Lire le contenu du fichier si le document a un chemin de fichier
      let content = '';
      if (document.file_path) {
        try {
          const fs = require('fs');
          const path = require('path');

          // Convertir le chemin relatif en chemin absolu
          const relativePath = document.file_path.replace(/^\/uploads\//, '');
          const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
          const fullPath = path.join(uploadsDir, relativePath);

          // Vérifier si le fichier existe
          if (fs.existsSync(fullPath)) {
            // Lire le contenu du fichier
            content = fs.readFileSync(fullPath, 'utf8');
          }
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier:', error);
        }
      }

      this.activeDocuments.set(documentId, {
        content: content,
        users: [userId],
        lastSaved: new Date(),
        title: document.title
      });
    } else {
      // Ajouter l'utilisateur à la liste des utilisateurs actifs s'il n'y est pas déjà
      const activeDoc = this.activeDocuments.get(documentId);
      if (!activeDoc.users.includes(userId)) {
        activeDoc.users.push(userId);
        this.activeDocuments.set(documentId, activeDoc);
      }
    }

    // Préparer les informations sur les utilisateurs actifs
    const activeUserIds = this.activeDocuments.get(documentId).users;

    // Récupérer les informations détaillées des utilisateurs actifs
    const activeUsers = await Promise.all(
      activeUserIds.map(async (userId) => {
        try {
          return await this.getUserInfo(userId);
        } catch (error) {
          console.error(`Error getting user info for user ${userId}:`, error);
          return { id: userId, username: `User ${userId}` };
        }
      })
    );

    // Retourner les informations sur le document et les utilisateurs actifs
    return {
      document,
      activeUsers,
      currentContent: this.activeDocuments.get(documentId).content
    };
  }

  /**
   * Retire un utilisateur d'un document actif
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   */
  leaveDocument(documentId, userId) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    if (this.activeDocuments.has(documentId)) {
      const activeDoc = this.activeDocuments.get(documentId);
      activeDoc.users = activeDoc.users.filter(id => id !== userId);

      // Si plus personne n'édite le document, le supprimer de la liste des documents actifs
      if (activeDoc.users.length === 0) {
        this.activeDocuments.delete(documentId);
      } else {
        this.activeDocuments.set(documentId, activeDoc);
      }
    }
  }

  /**
   * Met à jour le contenu d'un document
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @param {string} content - Nouveau contenu
   * @returns {Promise<Object>} - Informations sur la mise à jour
   */
  async updateDocumentContent(documentId, userId, content) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    console.log(`RealtimeDocumentService: Mise à jour du contenu du document ${documentId} par l'utilisateur ${userId}`);
    console.log(`RealtimeDocumentService: Taille du contenu reçu: ${content ? content.length : 0} caractères`);

    // Vérifier si le contenu est vide ou null
    if (!content && content !== '') {
      console.warn(`RealtimeDocumentService: Contenu vide ou null reçu pour le document ${documentId}`);
      content = ''; // Assurer que le contenu est au moins une chaîne vide
    }

    // Si le contenu est vide, utiliser un contenu par défaut
    if (content === '') {
      console.warn(`RealtimeDocumentService: Contenu vide reçu pour le document ${documentId}, utilisation d'un contenu par défaut`);
      content = '<p>Document vide</p>';
    }

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await this.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      console.error(`RealtimeDocumentService: Accès refusé au document ${documentId} pour l'utilisateur ${userId}`);
      throw new Error('Accès refusé au document');
    }

    // Vérifier si le document est en édition active
    if (!this.activeDocuments.has(documentId)) {
      console.error(`RealtimeDocumentService: Document ${documentId} non actif`);
      throw new Error('Document non actif');
    }

    // Mettre à jour le contenu
    const activeDoc = this.activeDocuments.get(documentId);
    activeDoc.content = content;
    activeDoc.lastModifiedBy = userId;
    activeDoc.lastModified = new Date();
    this.activeDocuments.set(documentId, activeDoc);

    // Contenu du document mis à jour avec succès

    // Récupérer les informations du document depuis la base de données
    const existingDocument = await prisma.documents.findUnique({
      where: { id: documentId }
    });

    if (!existingDocument) {
      console.error(`RealtimeDocumentService: Document ${documentId} non trouvé dans la base de données lors de la mise à jour`);
      throw new Error('Document non trouvé dans la base de données');
    }

    // Vérifier si le document a un chemin de fichier, sinon en créer un
    let filePath = existingDocument.file_path;
    if (!filePath) {
      // Créer un nouveau fichier pour ce document
      const fs = require('fs');
      const path = require('path');

      // Générer un nom de fichier unique
      const timestamp = Date.now();
      const fileName = `${timestamp}.txt`;

      // Chemin complet du fichier
      const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads', 'documents');
      const fullPath = path.join(uploadsDir, fileName);

      // S'assurer que le répertoire existe
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Chemin relatif pour la base de données
      filePath = `/uploads/documents/${fileName}`;

      // Mettre à jour le document dans la base de données avec le nouveau chemin de fichier
      await prisma.documents.update({
        where: { id: documentId },
        data: {
          file_path: filePath,
          file_type: 'text/plain'
        }
      });

      console.log(`RealtimeDocumentService: Nouveau chemin de fichier créé pour le document ${documentId}: ${filePath}`);
    }

    // Écrire le contenu dans le fichier à chaque mise à jour
    try {
      const fs = require('fs');
      const path = require('path');

      // Construire le chemin complet du fichier
      const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
      const relativePath = filePath.replace(/^\/uploads\//, '');
      const fullPath = path.join(uploadsDir, relativePath);

      // Créer le répertoire parent si nécessaire
      const dirPath = path.dirname(fullPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Écrire le contenu dans le fichier
      fs.writeFileSync(fullPath, content);

      // Mettre à jour la taille du fichier dans la base de données
      const stats = fs.statSync(fullPath);
      await prisma.documents.update({
        where: { id: documentId },
        data: {
          file_size: stats.size,
          last_modified_by: userId,
          updated_at: new Date()
        }
      });
    } catch (error) {
      console.error(`Erreur lors de l'écriture du fichier:`, error);
      // Ne pas échouer complètement si l'écriture échoue
    }

    return {
      documentId,
      content,
      lastModifiedBy: userId,
      lastModified: activeDoc.lastModified
    };
  }

  /**
   * Sauvegarde le contenu d'un document dans la base de données
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Informations sur la sauvegarde
   */
  async saveDocument(documentId, userId) {
    try {
      console.log(`RealtimeDocumentService: Tentative de sauvegarde du document ${documentId} par l'utilisateur ${userId}`);

      documentId = parseInt(documentId);
      userId = parseInt(userId);

      // Vérifier si l'utilisateur a accès au document
      const hasAccess = await this.checkUserDocumentAccess(documentId, userId);
      if (!hasAccess) {
        console.error(`RealtimeDocumentService: Accès refusé au document ${documentId} pour l'utilisateur ${userId}`);
        throw new Error('Accès refusé au document');
      }

      // Vérifier si le document est en édition active
      if (!this.activeDocuments.has(documentId)) {
        console.error(`RealtimeDocumentService: Document ${documentId} non actif`);

        // Tenter de récupérer le document depuis la base de données
        console.log(`RealtimeDocumentService: Tentative de récupération du document ${documentId} depuis la base de données`);
        const document = await prisma.documents.findUnique({
          where: { id: documentId }
        });

        if (!document) {
          console.error(`RealtimeDocumentService: Document ${documentId} non trouvé dans la base de données`);
          throw new Error('Document non trouvé');
        }

        // Lire le contenu du fichier si le document a un chemin de fichier
        let content = '';
        if (document.file_path) {
          try {
            const fs = require('fs');
            const path = require('path');

            // Convertir le chemin relatif en chemin absolu
            const relativePath = document.file_path.replace(/^\/uploads\//, '');
            const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
            const fullPath = path.join(uploadsDir, relativePath);



            // Vérifier si le fichier existe
            if (fs.existsSync(fullPath)) {
              // Lire le contenu du fichier
              content = fs.readFileSync(fullPath, 'utf8');
            }
          } catch (error) {
            console.error('Erreur lors de la lecture du fichier:', error);
          }
        }

        // Ajouter le document à la liste des documents actifs
        this.activeDocuments.set(documentId, {
          content: content,
          users: [userId],
          lastSaved: new Date(),
          title: document.title
        });
      }

      const activeDoc = this.activeDocuments.get(documentId);
      console.log(`RealtimeDocumentService: Document ${documentId} récupéré, contenu de ${activeDoc.content ? activeDoc.content.length : 0} caractères`);

      // Vérifier si le document a un contenu
      if (!activeDoc.content && activeDoc.content !== '') {
        console.warn(`RealtimeDocumentService: Document ${documentId} sans contenu, utilisation d'une chaîne vide`);
        activeDoc.content = '';
      }

      // Vérifier si le contenu est vide et utiliser un contenu par défaut si nécessaire
      if (activeDoc.content === '' || activeDoc.content === null || activeDoc.content === undefined) {
        console.warn(`RealtimeDocumentService: Contenu vide détecté pour le document ${documentId}, utilisation d'un contenu par défaut`);
        activeDoc.content = '<p>Document vide</p>';
        // Mettre à jour le document actif avec le contenu par défaut
        this.activeDocuments.set(documentId, activeDoc);
      }

      // Vérifier si le document existe dans la base de données
      const existingDocument = await prisma.documents.findUnique({
        where: { id: documentId }
      });

      if (!existingDocument) {
        console.error(`RealtimeDocumentService: Document ${documentId} non trouvé dans la base de données lors de la sauvegarde`);
        throw new Error('Document non trouvé dans la base de données');
      }

      // Vérifier si le document a un chemin de fichier, sinon en créer un
      let filePath = existingDocument.file_path;
      if (!filePath) {
        // Créer un nouveau fichier pour ce document
        const fs = require('fs');
        const path = require('path');

        // Générer un nom de fichier unique
        const timestamp = Date.now();
        const fileName = `${timestamp}.txt`;

        // Chemin complet du fichier
        const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads', 'documents');
        const fullPath = path.join(uploadsDir, fileName);

        // S'assurer que le répertoire existe
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Chemin relatif pour la base de données
        filePath = `/uploads/documents/${fileName}`;

        // Mettre à jour le document dans la base de données avec le nouveau chemin de fichier
        await prisma.documents.update({
          where: { id: documentId },
          data: {
            file_path: filePath,
            file_type: 'text/plain'
          }
        });

        console.log(`RealtimeDocumentService: Nouveau chemin de fichier créé pour le document ${documentId}: ${filePath}`);
      }

      // Sauvegarder le contenu dans le fichier
      try {
        const fs = require('fs');
        const path = require('path');

        // Construire le chemin complet du fichier
        const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
        const relativePath = filePath.replace(/^\/uploads\//, '');
        const fullPath = path.join(uploadsDir, relativePath);

        console.log(`RealtimeDocumentService: Chemin du fichier: ${fullPath}`);
        console.log(`RealtimeDocumentService: Sauvegarde du contenu dans le fichier ${fullPath}`);

        // Créer le répertoire parent si nécessaire
        const dirPath = path.dirname(fullPath);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        // Écrire le contenu dans le fichier
        try {
          // Vérifier que le contenu est bien défini
          const contentToWrite = activeDoc.content || '';
          console.log(`RealtimeDocumentService: Tentative d'écriture de ${contentToWrite.length} caractères dans le fichier ${fullPath}`);
          console.log(`RealtimeDocumentService: Aperçu du contenu: ${contentToWrite.substring(0, 100)}...`);

          // Écrire le contenu dans le fichier
          fs.writeFileSync(fullPath, contentToWrite);

          // Vérifier que le fichier a bien été écrit
          if (fs.existsSync(fullPath)) {
            const writtenContent = fs.readFileSync(fullPath, 'utf8');
            console.log(`RealtimeDocumentService: Vérification du fichier: ${writtenContent.length} caractères écrits`);

            if (writtenContent.length === 0 && contentToWrite.length > 0) {
              console.error(`RealtimeDocumentService: ERREUR - Le fichier a été créé mais le contenu n'a pas été écrit correctement`);
              // Nouvelle tentative avec une méthode alternative
              fs.writeFileSync(fullPath, contentToWrite, { encoding: 'utf8', flag: 'w' });

              // Vérifier à nouveau
              const retryContent = fs.readFileSync(fullPath, 'utf8');
              console.log(`RealtimeDocumentService: Après nouvelle tentative: ${retryContent.length} caractères écrits`);
            }
          } else {
            console.error(`RealtimeDocumentService: ERREUR - Le fichier n'a pas été créé`);
          }
        } catch (writeError) {
          console.error(`RealtimeDocumentService: Erreur lors de l'écriture dans le fichier:`, writeError);

          // Tentative alternative d'écriture
          try {
            const contentToWrite = activeDoc.content || '';
            console.log(`RealtimeDocumentService: Tentative alternative d'écriture dans ${fullPath}`);

            // Utiliser une méthode alternative d'écriture
            const fd = fs.openSync(fullPath, 'w');
            fs.writeSync(fd, contentToWrite);
            fs.closeSync(fd);

            console.log(`RealtimeDocumentService: Écriture alternative réussie`);
          } catch (alternativeError) {
            console.error(`RealtimeDocumentService: Échec de la tentative alternative:`, alternativeError);
            throw writeError; // Relancer l'erreur originale
          }
        }

        // Mettre à jour la taille du fichier dans la base de données
        const stats = fs.statSync(fullPath);
        console.log(`RealtimeDocumentService: Taille du fichier après sauvegarde: ${stats.size} octets`);

        console.log(`RealtimeDocumentService: Contenu sauvegardé dans le fichier ${fullPath}`);
      } catch (fileError) {
        console.error(`RealtimeDocumentService: Erreur lors de la sauvegarde du fichier:`, fileError);
        // Ne pas échouer complètement si la sauvegarde du fichier échoue
      }

      // Mettre à jour le document dans la base de données
      console.log(`RealtimeDocumentService: Mise à jour du document ${documentId} dans la base de données`);
      const updatedDocument = await prisma.documents.update({
        where: { id: documentId },
        data: {
          content: null, // Ne pas stocker le contenu dans la base de données
          last_modified_by: userId,
          updated_at: new Date()
        }
      });

      // Créer une nouvelle version du document
      console.log(`RealtimeDocumentService: Création d'une nouvelle version pour le document ${documentId}`);
      const latestVersion = await prisma.document_versions.findFirst({
        where: { document_id: documentId },
        orderBy: { version_number: 'desc' },
        select: { version_number: true }
      });

      const newVersionNumber = latestVersion ? latestVersion.version_number + 1 : 1;

      await prisma.document_versions.create({
        data: {
          document_id: documentId,
          version_number: newVersionNumber,
          content: activeDoc.content,
          modified_by: userId,
          change_summary: `Modification automatique par ${userId}`
        }
      });

      // Mettre à jour la date de dernière sauvegarde
      activeDoc.lastSaved = new Date();
      this.activeDocuments.set(documentId, activeDoc);


      return {
        documentId,
        savedAt: activeDoc.lastSaved,
        versionNumber: newVersionNumber
      };
    } catch (error) {
      console.error(`RealtimeDocumentService: Erreur lors de la sauvegarde du document ${documentId}:`, error);

      // La fonctionnalité de sauvegarde a été supprimée

      // Relancer l'erreur originale
      throw error;
    }
  }

  /**
   * Vérifie si un utilisateur a accès à un document
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<boolean>} - true si l'utilisateur a accès, false sinon
   */
  async checkUserDocumentAccess(documentId, userId) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    // Vérifier si le document existe (tous les utilisateurs ont accès)
    const document = await prisma.documents.findFirst({
      where: {
        id: documentId,
        is_deleted: false
      }
    });

    return !!document;
  }

  // Document sharing methods have been removed as part of the permissions system removal

  /**
   * Récupère les utilisateurs actifs sur un document
   * @param {number} documentId - ID du document
   * @param {boolean} detailed - Si true, retourne les informations détaillées des utilisateurs
   * @returns {Promise<Array>} - Liste des utilisateurs actifs
   */
  async getActiveUsers(documentId, detailed = false) {
    documentId = parseInt(documentId);

    if (!this.activeDocuments.has(documentId)) {
      return [];
    }

    const userIds = this.activeDocuments.get(documentId).users;

    // S'assurer que userIds est un tableau
    if (!Array.isArray(userIds)) {
      console.error(`getActiveUsers: userIds is not an array for document ${documentId}:`, userIds);
      return [];
    }

    if (!detailed) {
      return userIds;
    }

    // Récupérer les informations détaillées des utilisateurs
    const activeUsers = await Promise.all(
      userIds.map(async (userId) => {
        try {
          return await this.getUserInfo(userId);
        } catch (error) {
          console.error(`Error getting user info for user ${userId}:`, error);
          return { id: userId, username: `User ${userId}` };
        }
      })
    );

    return activeUsers;
  }

  /**
   * Met à jour le contenu d'un document en mémoire uniquement (sans écriture sur disque)
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @param {string} content - Nouveau contenu
   * @returns {Promise<Object>} - Informations sur la mise à jour
   */
  async updateDocumentContentInMemory(documentId, userId, content) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    // Vérifier si le contenu est vide ou null
    if (!content && content !== '') {
      content = ''; // Assurer que le contenu est au moins une chaîne vide
    }

    // Si le contenu est vide, utiliser un contenu par défaut
    if (content === '') {
      content = '<p>Document vide</p>';
    }

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await this.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      throw new Error('Accès refusé au document');
    }

    // Vérifier si le document est en édition active
    if (!this.activeDocuments.has(documentId)) {
      throw new Error('Document non actif');
    }

    // Mettre à jour le contenu en mémoire uniquement
    const activeDoc = this.activeDocuments.get(documentId);
    activeDoc.content = content;
    activeDoc.lastModifiedBy = userId;
    activeDoc.lastModified = new Date();
    this.activeDocuments.set(documentId, activeDoc);

    return {
      documentId,
      content,
      lastModifiedBy: userId,
      lastModified: activeDoc.lastModified
    };
  }

  /**
   * Planifie la persistance d'un document sur le disque
   * @param {number} documentId - ID du document
   */
  scheduleDocumentPersistence(documentId) {
    documentId = parseInt(documentId);

    // Annuler le timer existant s'il y en a un
    if (this.persistenceTimers.has(documentId)) {
      clearTimeout(this.persistenceTimers.get(documentId));
    }

    // Créer un nouveau timer pour la persistance
    const timer = setTimeout(async () => {
      try {
        // Vérifier si le document est toujours actif
        if (!this.activeDocuments.has(documentId)) {
          return;
        }

        const activeDoc = this.activeDocuments.get(documentId);
        const content = activeDoc.content;
        const userId = activeDoc.lastModifiedBy || activeDoc.users[0];

        // Récupérer les informations du document depuis la base de données
        const document = await prisma.documents.findUnique({
          where: { id: documentId }
        });

        if (!document) {
          return;
        }

        // Vérifier si le document a un chemin de fichier
        if (document.file_path) {
          const fs = require('fs');
          const path = require('path');

          // Construire le chemin complet du fichier
          const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
          const relativePath = document.file_path.replace(/^\/uploads\//, '');
          const fullPath = path.join(uploadsDir, relativePath);

          // Créer le répertoire parent si nécessaire
          const dirPath = path.dirname(fullPath);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          // Écrire le contenu dans le fichier
          fs.writeFileSync(fullPath, content);

          // Mettre à jour la taille du fichier dans la base de données
          const stats = fs.statSync(fullPath);
          await prisma.documents.update({
            where: { id: documentId },
            data: {
              file_size: stats.size,
              last_modified_by: userId,
              updated_at: new Date()
            }
          });
        }
      } catch (error) {
        console.error(`Erreur lors de la persistance du document ${documentId}:`, error);
      } finally {
        // Supprimer le timer de la map
        this.persistenceTimers.delete(documentId);
      }
    }, this.persistenceInterval);

    // Stocker le timer dans la map
    this.persistenceTimers.set(documentId, timer);
  }

  /**
   * Récupère les informations d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Informations sur l'utilisateur
   */
  async getUserInfo(userId) {
    userId = parseInt(userId);

    // Récupérer les informations de l'utilisateur depuis la base de données
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        full_name: true,
        profile_picture: true
      }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Générer une couleur unique pour l'utilisateur basée sur son ID
    const colors = [
      '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
      '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'
    ];
    const color = colors[userId % colors.length];

    return {
      ...user,
      color
    };
  }
}

module.exports = new RealtimeDocumentService();
