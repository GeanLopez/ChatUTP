const express = require('express')
const path = require('path')
const app = express()
const socketIO = require('socket.io')

app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), () => {
    
    console.log('Server on port', app.get('port'))

})

app.use(express.static(path.join(__dirname,'public')))

const io = socketIO(server)

io.on('connection',(socket)=>{

    console.log('Nueva Conexión: ', socket.id);
    io.sockets.emit('user:connect', socket.id)

    socket.on('disconnect',()=>{
        console.log('No hay conexion:',socket.id);
        socket.broadcast.emit('user:disconnect', socket.id)
    })
    socket.on('message:send',(message)=>{
        io.sockets.emit('message:send',{
            message,
            id:socket.id
        })
    })
    socket.on('Digitar',(usuario)=>{

        socket.broadcast.emit('digitar usuario',usuario)
        
    })
})
