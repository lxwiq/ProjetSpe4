/**
 * Script pour créer des utilisateurs (admin et non-admin)
 *
 * Utilisation:
 * node scripts/create-users.js
 */

require('dotenv').config();
const bcrypt = require('bcrypt');

// Utiliser le même client Prisma que l'application
const prisma = require('../src/lib/prisma');

async function createUsers() {
  try {
    console.log('Création des utilisateurs...');

    // Configuration
    const users = [
      {
        username: 'admin',
        email: 'admin@admin.fr',
        password: 'test',
        full_name: 'Administrateur',
        is_admin: true
      },
      {
        username: 'user',
        email: 'user@user.fr',
        password: 'test',
        full_name: 'Utilisateur Standard',
        is_admin: false
      }
    ];

    // Créer les utilisateurs
    for (const userData of users) {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { username: userData.username }
          ]
        }
      });

      if (existingUser) {
        console.log(`L'utilisateur ${userData.username} existe déjà.`);
        continue;
      }

      // Hacher le mot de passe
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(userData.password, saltRounds);

      // Créer l'utilisateur
      const newUser = await prisma.users.create({
        data: {
          username: userData.username,
          email: userData.email,
          password_hash,
          full_name: userData.full_name,
          is_admin: userData.is_admin,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      });

      console.log(`Utilisateur ${userData.username} créé avec succès.`);
      console.log(`Email: ${userData.email}`);
      console.log(`Mot de passe: ${userData.password}`);
      console.log(`Admin: ${userData.is_admin ? 'Oui' : 'Non'}`);
      console.log('---');
    }

    console.log('Création des utilisateurs terminée.');
  } catch (error) {
    console.error('Erreur lors de la création des utilisateurs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();
