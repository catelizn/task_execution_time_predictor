import { signToken, verifyToken } from './jwt'

describe('JWT', () => {
  const payload = { id: '1', email: 'test@test.com' }

  it('signs and verifies token', () => {
    const token = signToken(payload)
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')

    const decoded = verifyToken(token)
    expect(decoded).toBeDefined()
    expect(decoded).toMatchObject(payload)
  })

  it('returns null for invalid token', () => {
    const result = verifyToken('invalid-token')
    expect(result).toBeNull()
  })
})
