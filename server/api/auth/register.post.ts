import bcrypt from 'bcrypt'
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { fullName, email, password } = body

  if (!fullName || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Faltan campos obligatorios' })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Ese email ya está registrado' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { fullName, email, password: hashedPassword }


  })

  return { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
})

