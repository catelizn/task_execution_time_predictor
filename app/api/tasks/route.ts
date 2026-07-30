import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

async function getUserId() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null
  const payload = verifyToken(token)
  if (!payload || typeof payload !== 'object') return null
  return (payload as any).id
}

export async function GET() {
  const userId = await getUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const tasks = await prisma.task.findMany({
    where: { userId },
    include: { project: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const userId = await getUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  const { title, description, projectId, deadline, assignee } = body
  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      deadline: deadline ? new Date(deadline) : null,
      assignee,
      userId,
    },
    include: { project: true },
  })
  return NextResponse.json(task, { status: 201 })
}
