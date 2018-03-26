const mongoose = require('mongoose');

// use built-in default promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose};
