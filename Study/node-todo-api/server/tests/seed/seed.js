const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID(); 
const users = [{
    _id: userOneId, 
    email: 'hnomura@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token:jwt.sign({_id: userOneId, access:'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'mantaro@slb.com', 
    password: 'userTwoPass'

}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test today',
    completed: true, 
    completedAt: 333,
    _creator: userTwoId
}];


const populateTodos = (done) => { 
    Todo.remove({}).then( () => {
        return Todo.insertMany(todos);
    }).then( () => done() );
};

const populateUsers = (done) => {
    User.remove({}).then( () => {
        // create user object from model to each (for pre-save middleware)
        // save() returns promise. 
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        
        // sync to both of promises
        // return promise for chaining
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

//module.exports = { todos };
module.exports = { todos, populateTodos, users, populateUsers };
