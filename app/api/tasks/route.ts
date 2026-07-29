import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: { project: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title, description, projectId, deadline, assignee } = body

  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
      deadline: deadline ? new Date(deadline) : null,
      assignee,
    },
    include: { project: true },
  })

  return NextResponse.json(task, { status: 201 })
}
