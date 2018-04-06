var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});

socket.emit('createMessage', {
    from: 'Auto Generator', 
    text: 'Client Connected'
}, function (data) {
    // acknowledgement
    console.log('Got it', data);
});