// Javascript timestamp : milliseconds 

var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

var date = moment();
// Apr 6th 2018 8:55:18 pm
console.log(date.format('MMM Do YYYY h:mm:ss a'));