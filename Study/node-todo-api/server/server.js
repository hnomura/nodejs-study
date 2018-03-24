const mongoose = require('mongoose');

// use built-in default promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// model 
var Todo = mongoose.model('Todo', {
    text: { 
        type: String, 
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }, 
    completedAt: {
        type: Number,
        default: null
    }
});

// // new instance 
// var newTodo = new Todo({
//     text: 'Eat Lunch'
// });

// // save 
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save tood');
// });

// // new instance 
// var otherToDo = new Todo({
//     text: 'Take a rest', 
//     completed: true, 
//     completedAt: new Date().getDate()
// });

// // save 
// otherToDo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save tood', e);
// });

// User model 
// email = required, with trim - strin gtype - set min length = 1
var User = mongoose.model('User', {
    email: {
        type:   String, 
        required: true, 
        minLength: 1, 
        trim: true
    }
});

var newUser = new User({
    email: 'hnomura.babou@gmail.com'
});

// save 
newUser.save().then((doc) => {
    console.log('Saved user', doc);
}, (e) => {
    console.log('Unable to save user', e);
});

