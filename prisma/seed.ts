import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'




const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string
})



const prisma = new PrismaClient({ adapter })

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@clary.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'CambiaEstoYa123'

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })

  if (existing) {
    console.log(`⚠️  Ya existe un usuario con el email ${adminEmail}, no se creó nada.`)
    return
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.create({
    data: {
      fullName: 'Administrador Clary',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('✅ Usuario ADMIN creado:')
  console.log(`   Email: ${admin.email}`)
  console.log(`   Password: ${adminPassword}`)
  console.log('   ⚠️  Cambia esta contraseña en cuanto inicies sesión.')
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })