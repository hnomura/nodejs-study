var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct messsage object', () => {
        var from = 'My Name';
        var text = 'My Text';
        var msg = generateMessage(from, text);
        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
        expect(typeof msg.createdAt).toBe('number');

        expect(msg).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'My Name';
        var latitude = 1;
        var longitude = 2;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var msg = generateLocationMessage(from, latitude, longitude);
        expect(typeof msg.createdAt).toBe('number');
        expect(msg).toMatchObject({from, url});
    });
});