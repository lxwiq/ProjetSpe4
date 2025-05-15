const { PrismaClient } = require('./src/generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database initialization...');

    // Hash the password 'test123'
    const passwordHash = await bcrypt.hash('test123', 10);

    // Create admin user
    const admin = await prisma.users.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@example.com',
        password_hash: passwordHash,
        full_name: 'Administrator',
        is_admin: true,
        is_active: true
      }
    });

    console.log('Admin user created:', admin.id);

    // Create regular user
    const user = await prisma.users.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        username: 'user',
        email: 'user@example.com',
        password_hash: passwordHash,
        full_name: 'Regular User',
        is_admin: false,
        is_active: true
      }
    });

    console.log('Regular user created:', user.id);

    // Create a root folder for each user
    const adminRootFolder = await prisma.documents.create({
      data: {
        title: 'Admin Root Folder',
        description: 'Root folder for admin user',
        owner_id: admin.id,
        is_folder: true
      }
    });

    console.log('Admin root folder created:', adminRootFolder.id);

    const userRootFolder = await prisma.documents.create({
      data: {
        title: 'User Root Folder',
        description: 'Root folder for regular user',
        owner_id: user.id,
        is_folder: true
      }
    });

    console.log('User root folder created:', userRootFolder.id);

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
