const path = require('path');
const http = require('http'); // a part of express
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  // socket.io
var users = new Users();    // users collection 

app.use(express.static( publicPath ));

io.on('connection', (socket) => {
    console.log('New user connected');

    // listener to 'join'
    socket.on('join', (params, callback) => {
        console.log('join', params);

        if (!isRealString(params.name) || !isRealString(params.room)) { 
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        // socket.leave(...); to leave from room 

        // add to users collection
        users.removeUser(socket.id); // remove if any
        users.addUser(socket.id, params.name, params.room);

        // io.emit => everyone connected 
        //   io.to(room).emit ==> eveyone connected and in the room 
        // socket.broadcast.emit ==> everyone connected except this socket 
        //   socket.broadcast.to(room).emit ==> everyone connected except this socke in the room
        // socket.emit => specific user 

        // updateUserList 
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

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

        var user = users.removeUser(socket.id);
        if (user) { 
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));            
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});