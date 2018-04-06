const path = require('path');
const http = require('http'); // a part of express
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // socket.io

app.use(express.static( publicPath ));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Welcome message to newly connected socket
    socket.emit('newMessage', {
        from: 'Admin', 
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    // Notification to everyone except for the newly connected socket 
    socket.broadcast.emit('newMessage', {
        from: 'Admin', 
        text: 'New user joined',
        createdAt: new Date().getTime()
    });
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        // To everyone including the socket sending this message
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // // everybody but this socket 
        // socket.broadcast.emit('newMessage', {
        // from: message.from, 
        // text: message.text, 
        // createdAt: new Date().getTime()
        // });
      
    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});