const { Server } = require('socket.io')
const http = require('http')

const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('task-created', (data) => {
    console.log('Task created:', data.title)
    socket.broadcast.emit('task-created', data)
  })

  socket.on('task-deleted', (data) => {
    console.log('Task deleted:', data.id)
    socket.broadcast.emit('task-deleted', data)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

const PORT = process.env.SOCKET_PORT || 3001
server.listen(PORT, '0.0.0.0', () => {
  console.log(`> Socket.IO server ready on http://localhost:${PORT}`)
})
