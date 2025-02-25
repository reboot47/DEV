const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteAllUsers() {
  try {
    await prisma.user.deleteMany();
    await prisma.verificationCode.deleteMany();
    console.log('全てのユーザーと認証コードを削除しました');
  } catch (error) {
    console.error('エラー:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllUsers();
