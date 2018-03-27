const {SHA256} = require('crypto-js');

/// // == SHA256 cryptoing 
// var message = 'I am user number 3';
// var hash = SHA256(message).toString(); 
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// // ==== Basic of JWT (Jason Web Token)
// var data = { 
//     id: 4
// };

// // 'somesecret' : salt -- only server knows 
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // fake huck 
// // token.data.id = 5; 

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if ( resultHash === token.hash) { 
//     console.log('Data was not changed');
// } else { 
//     console.log('Data was changed. Do not trust!');
// }

const jwt = require('jsonwebtoken');
// jwt.sign (takes object, and signs it)
// jwt.verify 

var data = { 
    id: 10
};

var token = jwt.sign(data, 'secret123');
console.log(token); 

var decoded = jwt.verify(token, 'secret123');
console.log('decoded', decoded);



