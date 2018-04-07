// [{
//     id: 'socket-id',
//     name: 'user name',
//     room: 'room name'
// }]

// id=socket ID
// addUser(id, name, room)
// removeUser(id)
// getUser(id) =>  return obj
// getUserList(room) => 

// Intentionaly, use ES6 class 
class Users { 
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser (id) { 
        // return user removed 
        var user = this.getUser(id);
        if (user) { 
            this.users = this.users.filter( (user) => user.id !== id );
        }
        return user;
    }

    getUser (id) { 
        // return user found 
        return this.users.filter( (user) => user.id === id )[0];
    }

    getUserList (room) { 
        // return array of user names
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map( (user) => user.name );
        return namesArray;
    }
}

module.exports = {Users};
