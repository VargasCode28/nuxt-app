import bcrypt from 'bcrypt'
import { prisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const fullName = typeof body?.fullName === 'string' ? body.fullName.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!fullName || fullName.length > 120 || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Datos de registro inválidos' })
  }

  if (password.length < 8 || password.length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'La contraseña debe tener entre 8 y 200 caracteres' })
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

