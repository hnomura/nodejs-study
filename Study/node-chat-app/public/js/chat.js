var socket = io();

function scrollToBottom() {
    // Selectors 
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    // Heights 
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight ) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
    
    // when connected to server, emit 'join' with location.search parameter
    // server checks the valid name/room parameter
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from, 
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault(); // prevent page refresh defaul tbehavior
    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User', 
        text: messageTextbox.val()
    }, function () {
        // acknowledgement callback
        messageTextbox.val(''); 
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    console.log('Calling geolocation.getCurrentPosition()');
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        // success
        console.log(position);
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        });
    }, function () {
        // failure
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});