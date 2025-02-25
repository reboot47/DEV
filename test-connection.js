const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    // 簡単なクエリを実行してみる
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Connection successful:', result)
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
