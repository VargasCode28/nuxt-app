import jwt from 'jsonwebtoken'

export interface JwtPayload {
  id: string
  email: string
  role: 'ADMIN' | 'CLIENTE'
}

export const signToken = (payload: JwtPayload) => {
  const config = useRuntimeConfig()
  const secret = config.jwtSecret
  if (typeof secret !== 'string' || secret.length < 32) {
    throw new Error('JWT_SECRET debe tener al menos 32 caracteres')
  }
  return jwt.sign(payload, secret, { expiresIn: '1d' })
}

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const config = useRuntimeConfig()
    const secret = config.jwtSecret
    if (typeof secret !== 'string' || secret.length < 32) return null
    return jwt.verify(token, secret) as JwtPayload
  } catch {
    return null
  }
}

