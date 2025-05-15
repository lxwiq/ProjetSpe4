const { PrismaClient } = require('../generated/prisma');

// Create a singleton instance of the Prisma client
const prisma = new PrismaClient();

module.exports = prisma;
