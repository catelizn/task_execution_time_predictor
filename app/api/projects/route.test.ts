import { GET, POST } from './route'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    project: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/jwt', () => ({
  verifyToken: jest.fn(),
}))

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: 'valid-token' })),
  })),
}))

describe('Projects API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(verifyToken as jest.Mock).mockReturnValue({ id: 'user1' })
  })

  it('GET returns projects', async () => {
    const mockProjects = [{ id: '1', name: 'Project 1', description: 'Desc', userId: 'user1' }]
    ;(prisma.project.findMany as jest.Mock).mockResolvedValue(mockProjects)

    const response = await GET()
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(json).toEqual(mockProjects)
  })

  it('POST creates a project', async () => {
    const mockProject = { id: '1', name: 'New Project', description: 'Test', userId: 'user1' }
    ;(prisma.project.create as jest.Mock).mockResolvedValue(mockProject)

    const request = new Request('http://localhost:3000/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name: 'New Project', description: 'Test' }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const json = await response.json()

    expect(response.status).toBe(201)
    expect(json).toEqual(mockProject)
  })
})
