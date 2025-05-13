// test-websocket.js
const io = require('socket.io-client');
const readline = require('readline');

// Configuration
const API_URL = 'http://localhost:3000';
let socket;
let token;
let userId;
let currentDocumentId;

// Créer une interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour poser une question
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Fonction principale
async function main() {
  console.log('=== Test WebSocket pour l\'édition collaborative ===');
  
  // Demander le token JWT
  token = await question('Entrez votre token JWT (ou appuyez sur Entrée pour se connecter): ');
  
  if (!token) {
    // Se connecter
    const email = await question('Email: ');
    const password = await question('Mot de passe: ');
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur de connexion: ${response.status}`);
      }
      
      const data = await response.json();
      token = data.data.token;
      userId = data.data.user.id;
      
      console.log(`Connecté en tant qu'utilisateur ${userId}`);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      process.exit(1);
    }
  }
  
  // Connecter le socket
  connectSocket();
  
  // Menu principal
  await showMenu();
}

// Fonction pour connecter le socket
function connectSocket() {
  socket = io(API_URL, {
    auth: { token }
  });
  
  // Événements de connexion
  socket.on('connect', () => {
    console.log('Socket connecté');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Erreur de connexion socket:', error);
    process.exit(1);
  });
  
  // Événements de document
  socket.on('document:user-joined', (data) => {
    console.log(`Utilisateur ${data.userId} a rejoint le document`);
    console.log('Utilisateurs actifs:', data.activeUsers);
  });
  
  socket.on('document:user-left', (data) => {
    console.log(`Utilisateur ${data.userId} a quitté le document`);
    console.log('Utilisateurs actifs:', data.activeUsers);
  });
  
  socket.on('document:content-changed', (data) => {
    console.log(`Contenu modifié par l'utilisateur ${data.userId}`);
    console.log('Nouveau contenu:', data.content);
  });
  
  socket.on('document:saved', (data) => {
    console.log(`Document sauvegardé par l'utilisateur ${data.savedBy}`);
    console.log('Version:', data.versionNumber);
  });
  
  socket.on('document:invitation', (data) => {
    console.log(`Vous avez été invité au document ${data.documentId} par l'utilisateur ${data.invitedBy}`);
    console.log('Permission:', data.permissionLevel);
  });
  
  // Événements d'appel
  socket.on('call:started', (data) => {
    console.log(`Appel démarré pour le document ${data.documentId} par l'utilisateur ${data.initiatedBy}`);
    console.log('ID de l\'appel:', data.callId);
  });
  
  socket.on('call:user-joined', (data) => {
    console.log(`Utilisateur ${data.userId} a rejoint l'appel ${data.callId}`);
  });
  
  socket.on('call:user-left', (data) => {
    console.log(`Utilisateur ${data.userId} a quitté l'appel ${data.callId}`);
  });
  
  socket.on('call:ended', (data) => {
    console.log(`Appel ${data.callId} terminé`);
  });
  
  socket.on('call:signal', (data) => {
    console.log(`Signal reçu de l'utilisateur ${data.userId} pour l'appel ${data.callId}`);
  });
}

// Fonction pour afficher le menu principal
async function showMenu() {
  while (true) {
    console.log('\n=== Menu ===');
    console.log('1. Rejoindre un document');
    console.log('2. Quitter');
    
    const choice = await question('Choix: ');
    
    switch (choice) {
      case '1':
        await joinDocument();
        break;
      case '2':
        console.log('Au revoir!');
        rl.close();
        process.exit(0);
        break;
      default:
        console.log('Choix invalide');
    }
  }
}

// Fonction pour rejoindre un document
async function joinDocument() {
  const documentId = await question('ID du document: ');
  currentDocumentId = parseInt(documentId);
  
  socket.emit('document:join', { documentId: currentDocumentId }, (response) => {
    if (response.success) {
      console.log('Document rejoint avec succès');
      console.log('Titre:', response.data.document.title);
      console.log('Contenu actuel:', response.data.currentContent);
      console.log('Utilisateurs actifs:', response.data.activeUsers);
      
      // Afficher le menu du document
      documentMenu();
    } else {
      console.error('Erreur lors du chargement du document:', response.error);
    }
  });
}

// Fonction pour afficher le menu du document
async function documentMenu() {
  while (true) {
    console.log('\n=== Menu du document ===');
    console.log('1. Mettre à jour le contenu');
    console.log('2. Sauvegarder');
    console.log('3. Inviter un utilisateur');
    console.log('4. Démarrer un appel');
    console.log('5. Quitter le document');
    
    const choice = await question('Choix: ');
    
    switch (choice) {
      case '1':
        await updateDocument();
        break;
      case '2':
        await saveDocument();
        break;
      case '3':
        await inviteUser();
        break;
      case '4':
        await startCall();
        break;
      case '5':
        socket.emit('document:leave', { documentId: currentDocumentId });
        console.log('Document quitté');
        return;
      default:
        console.log('Choix invalide');
    }
  }
}

// Fonction pour mettre à jour le contenu du document
async function updateDocument() {
  const content = await question('Nouveau contenu: ');
  
  socket.emit('document:update', { documentId: currentDocumentId, content }, (response) => {
    if (response.success) {
      console.log('Contenu mis à jour avec succès');
    } else {
      console.error('Erreur lors de la mise à jour du contenu:', response.error);
    }
  });
}

// Fonction pour sauvegarder le document
async function saveDocument() {
  socket.emit('document:save', { documentId: currentDocumentId }, (response) => {
    if (response.success) {
      console.log('Document sauvegardé avec succès');
      console.log('Version:', response.data.versionNumber);
    } else {
      console.error('Erreur lors de la sauvegarde du document:', response.error);
    }
  });
}

// Fonction pour inviter un utilisateur
async function inviteUser() {
  const invitedUserId = await question('ID de l\'utilisateur à inviter: ');
  const permissionLevel = await question('Niveau de permission (read, write, admin): ');
  
  socket.emit('document:invite', {
    documentId: currentDocumentId,
    invitedUserId: parseInt(invitedUserId),
    permissionLevel
  }, (response) => {
    if (response.success) {
      console.log('Invitation envoyée avec succès');
    } else {
      console.error('Erreur lors de l\'invitation:', response.error);
    }
  });
}

// Fonction pour démarrer un appel
async function startCall() {
  socket.emit('call:start', { documentId: currentDocumentId }, (response) => {
    if (response.success) {
      const callId = response.data.callId;
      console.log('Appel démarré avec succès');
      console.log('ID de l\'appel:', callId);
      
      // Afficher le menu de l'appel
      callMenu(callId);
    } else {
      console.error('Erreur lors du démarrage de l\'appel:', response.error);
    }
  });
}

// Fonction pour afficher le menu de l'appel
async function callMenu(callId) {
  while (true) {
    console.log('\n=== Menu de l\'appel ===');
    console.log('1. Quitter l\'appel');
    
    const choice = await question('Choix: ');
    
    switch (choice) {
      case '1':
        socket.emit('call:leave', { callId }, (response) => {
          if (response.success) {
            console.log('Appel quitté avec succès');
            return;
          } else {
            console.error('Erreur lors de la sortie de l\'appel:', response.error);
          }
        });
        return;
      default:
        console.log('Choix invalide');
    }
  }
}

// Démarrer le programme
main().catch(error => {
  console.error('Erreur:', error);
  process.exit(1);
});
