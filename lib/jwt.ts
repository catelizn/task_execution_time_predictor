import jwt from 'jsonwebtoken'

// Временно хардкод для отладки
const JWT_SECRET = 'super-secret-key-2026'

export function signToken(payload: any) {
  console.log('Signing token with secret (hardcoded)')
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    console.log('Verifying token with hardcoded secret')
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('Decoded payload:', decoded)
    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}