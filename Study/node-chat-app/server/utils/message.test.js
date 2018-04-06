var expect = require('expect');
var {generateMessage} = require('./message');

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