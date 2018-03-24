const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({query-pattern})
// Todo.remove({}) // remove everything 
// No back of removed objectts
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findOneAndRemove({_id:'5ab66a90c198b9679f490f68'}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove()
Todo.findByIdAndRemove('5ab66a90c198b9679f490f68').then((todo) => {
    console.log(todo);
});