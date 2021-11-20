const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.use(express.json())

const cors = require('cors')
app.use(cors())

const { Server } = require('socket.io')
const io = new Server(server)

app.set('view engine', 'ejs')

const  { connectRedis } = require('./redis')
connectRedis()

app.use('/', require('./routes/route'))

var socketIDs = {}

io.on('connection', (socket) => {
    
    socket.on('user-joined', (id, data) => {
        socket.to(id).emit('user-joined')
        socket.join(id)
        socketIDs[socket.id] = id
        // socket.to(id).emit('message', data)
    })

    socket.on('message', (data) => {
        // socket.broadcast.emit('message', data)
        socket.to(data.id).emit('message', data.text)
        // window.localStorage.setItem('server', data)
    })
    socket.on('disconnect', () => {
        socket.to(socketIDs[socket.id]).emit('left')
    })
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => console.log(`Server is Running at PORT: ${PORT}`))