'use client'

import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export function useSocket() {
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    const socketInstance = io('http://localhost:3001')
    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return socket
}
