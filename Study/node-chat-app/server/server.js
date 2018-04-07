const path = require('path');
const http = require('http'); // a part of express
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // socket.io

app.use(express.static( publicPath ));

io.on('connection', (socket) => {
    console.log('New user connected');

    // listener to 'join'
    socket.on('join', (params, callback) => {
        console.log('join', params);

        if (!isRealString(params.name) || !isRealString(params.room)) { 
            callback('Name and room name are required');
        }

        socket.join(params.room);
        // socket.leave(...); to leave from room 

        // io.emit => everyone connected 
        //   io.to(room).emit ==> eveyone connected and in the room 
        // socket.broadcast.emit ==> everyone connected except this socket 
        //   socket.broadcast.to(room).emit ==> everyone connected except this socke in the room
        // socket.emit => specific user 
        //   

        // Welcome message to newly connected socket
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app') );
    
        // Notification to everyone except for the newly connected socket (only those in the same room)
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        

        callback();
    });

    // liisner to 'createMessage'
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        // To everyone including the socket sending this message
        io.emit('newMessage', generateMessage( message.from, message.text ));
        callback(); // acknowledgement       
    });

    // listner to 'createLocationMessage'
    socket.on('createLocationMessage', (coords) => {
        console.log('newMessage with Coordinate')
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});