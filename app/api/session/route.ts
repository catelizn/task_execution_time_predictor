import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    return NextResponse.json({ user: null })
  }
  const payload = verifyToken(token)
  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ user: null })
  }
  return NextResponse.json({ user: payload })
}
