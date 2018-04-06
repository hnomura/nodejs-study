// Javascript timestamp : milliseconds 

var moment = require('moment');

var createdAt = new Date();
// console.log(date.getMonth());

var date = moment(createdAt);
// Apr 6th 2018 8:55:18 pm
console.log(date.format('MMM Do YYYY h:mm:ss a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
