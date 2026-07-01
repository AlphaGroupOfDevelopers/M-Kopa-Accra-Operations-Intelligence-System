import { prisma } from '../lib/prisma'

async function main() {
  try {
    const user = await prisma.user.findFirst()
    if (user) {
      console.log('✅ Connected.')
    } else {
      console.log('✅ Connected. No users found.')
    }
  } catch (error) {
    console.error('❌ Connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
