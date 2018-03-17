console.log('Starting app.js.');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');

const notes = require('./notes.js');

var user = os.userInfo();

var res = notes.addNotes();

console.log(res);
console.log(`Notes add(1,2) = ${notes.add(1,2)}`);

//console.log(user);

// Remark back-quotatioon for ${} enclosing !
// `something` is called template string (ES6 feature)
fs.appendFileSync('greetings.txt',`Hello ${user.username}\n`);

fs.appendFile('greetings.txt', `Hello ${user.username} !!! \n`, function(err) {
    if (err) { console.log('Unable to write to file');}
});


// lodash exercise
console.log(_.isString(true));
console.log(_.isString('Hiroshi Nomura'));

var filteredArray = _.uniq(['Nomura', 2, 'Nomura', 1, 2, 3, 4]);
console.log(filteredArray);
