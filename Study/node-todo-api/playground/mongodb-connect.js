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

    // db.collection('Todos').insertOne({
    //     text: 'Something to do', 
    //     completed: false
    // }, (err,result) => {
    //     if (err) { 
    //         return console.log('Unable to insert todo',err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // TODO: 
    // Inseert new User doc into Users collection 
    // User doc with (name, age, location) 
    // db.collection('Users').insertOne({
    //     name: 'Hiroshi Nomura', 
    //     age: 53, 
    //     location: 'Hashimoto'
    // }, (err,result) => { 
    //     if (err) { 
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log(JSON.stringify( result.ops, undefined, 2));

    //     console.log(result.ops[0]._id.getTimestamp());
    // });

//    db.close(); // v2 only 
    client.close();
});

