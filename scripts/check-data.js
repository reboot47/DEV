const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  try {
    const users = await prisma.user.findMany();
    const codes = await prisma.verificationCode.findMany();
    console.log('Users:', users);
    console.log('Verification Codes:', codes);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
