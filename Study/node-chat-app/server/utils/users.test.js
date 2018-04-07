const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach( () => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Hiroshi', 
            room: 'My Room'
        }, {
            id: '2', 
            name: 'Bo',
            room: 'My Room'
        }, {
            id: '3',
            name: 'Babou',
            room: 'Heaven'
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Hiroshi',
            room: 'My Room'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        expect(users.users).toContainEqual(user);

    });

    it('should remove a user', () => {
        var user = users.removeUser('2');
        expect(user.id).toBe('2');
        expect(users.users.length).toBe(2); 
    });

    it('should not remove a user of invalid id', () => {
        var user = users.removeUser('100');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3); 
    });

    it('should find user of given id', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user).toBeTruthy(); 
        expect(user.id).toBe(userId);
    });

    it('should not find user of invalid id', () => {
        var userId = '100';
        var user = users.getUser(userId);
        expect(user).toBeFalsy(); 
    });

    it('should return names for My Room', () => {
        var userList = users.getUserList('My Room');
        expect(userList).toEqual(['Hiroshi', 'Bo']);
    });

    it('should return names for Heaven', () => {
        var userList = users.getUserList('Heaven');
        expect(userList).toEqual(['Babou']);
    });
    
});