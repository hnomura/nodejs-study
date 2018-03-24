const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// ObjectID : 5ab6458edee92c2818d53cef
//var id = '5ab6458edee92c2818d53cef'; // valid
//var id = '6ab6458edee92c2818d53cef';   // not exist
// var id = '6ab6458edee92c2818d53cef1';   // invalid

// if ( !ObjectID.isVlid(id) ) { 
//     console.log('ID not valid');
// }

// Mongoose converts string ID to ObjectID automatically 
// Todo.find({
//     _id: id
// }).then( (todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then( (todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then( (todo) => {
//     if (!todo) { 
//         return console.log('ID not found');
//     }
//     console.log('Todo by id', todo);
// }).catch( (e) => console.log(e) );



// User.findById() : 5ab5dd5334a3fc30b838c3dd
// case-1: user not found (valid ID) 
// case-2: user found (existind ID) 
// case-3: user not found (invalid ID) 
var user_id = '5ab5dd5334a3fc30b838c3dd';
User.findById(user_id).then( (user)  => {
    if (!user) { 
        return console.log('User not found');
    }
    console.log('User Found'); 
    console.log( JSON.stringify(user, undefined, 2));

}).catch( (e) => console.log('Invalid user id') );
