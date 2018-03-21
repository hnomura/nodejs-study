const expect = require('expect');
const rewire =require('rewire');

// instead of 'require', use 'rewire' for mock
const app = rewire('./app');

describe('App', () => {

    // mock (rewire) definition
    // in 'app.js' module, db.setUser() is mocked by spy object. 
    var db = { 
        saveUser: expect.createSpy()        
    };
    app.__set__('db',db);

    it('should call spy correctly', () => {
        var spy = expect.createSpy();
        // spy();
        // expect(spy).toHaveBeenCalled();
        spy('Hiroshi', 53);
        expect(spy).toHaveBeenCalledWith('Hiroshi', 53);
    });

    it('should call saveUser with user object', () => {
        var email = 'hnomura@slb.com';
        var password = '12345';

        // app.handleSignup() -> db.saveUser()
        // db.saveUser() is mocked by spy object
        app.handleSignup(email,password);

        // NOTE: toHaveBennCalledWith must be ({arg1,arg2,...}).
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });        
});

