import { NextResponse } from 'next/server'

const API_KEY = process.env.POLZA_API_KEY || process.env.OPENAI_API_KEY
const BASE_URL = process.env.POLZA_BASE_URL || 'https://api.polza.ai/v1'

export async function POST(request: Request) {
  const { description } = await request.json()

  if (!description) {
    return NextResponse.json({ error: 'Description required' }, { status: 400 })
  }

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert project manager. Estimate task completion time in hours. Return only a number.',
          },
          {
            role: 'user',
            content: `Estimate time for this task: "${description}"`,
          },
        ],
        temperature: 0.3,
        max_tokens: 10,
      }),
    })

    const data = await response.json()
    const time = data.choices?.[0]?.message?.content?.trim() || '1'
    return NextResponse.json({ time: parseInt(time) || 1 })
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json({ error: 'Prediction failed' }, { status: 500 })
  }
}
