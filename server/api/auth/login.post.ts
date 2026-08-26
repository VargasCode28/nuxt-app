import bcrypt from 'bcrypt'
import { signToken } from '~~/server/utils/jwt'
import { prisma } from '~~/server/utils/prisma'



export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Credenciales inválidas' })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Credenciales inválidas' })
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role as any })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/'
  })

  return { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
})


