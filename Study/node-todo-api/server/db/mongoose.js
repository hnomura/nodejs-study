const mongoose = require('mongoose');

// use built-in default promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose};