// MongoClient
// const MongoClient = require('mongodb').MongoClient; // Legacy 
const {MongoClient, ObjectID} = require('mongodb'); // ES6 only 

// var obj = new ObjectID();
// console.log(obj);

// ES6 specific
// var user = {name: 'hiroshi', age: 53};
// var {name} = user; // extract user attribute as new variable 

//MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // v2 only 
//MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
MongoClient.connect('mongodb://localhost:27017', (err, client) => { // v3 only 
    if ( err ) { 
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db = client.db('TodoApp'); // v3 only 

    // findOneAndUpdate
    // arg1: query pattern 
    // arg2: mongoDB update operators
    // arg3: options
    // db.collection('Todos').findOneAndUpdate( {
    //     text: 'Eat Lunch'
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then( (result) => {
    //     console.log(result);
    // });

    // Change location to 'Higashi Hashimoto', and 
    // Increment age +1 
    db.collection('Users').findOneAndUpdate( {
        name: 'Hiroshi Nomura'
    },{
        $set: { location: 'Higashi Hashimoto' },
        $inc: { age: 1}
    }, {
        returnOriginal: false
    }).then( (result) => {
        console.log(result);
    });

    
//    client.close();
});

