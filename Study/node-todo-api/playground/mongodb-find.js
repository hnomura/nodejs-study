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

    // fetch everything
//     db.collection('Todos').find({
// //        completed: false
//         _id: new ObjectID('5ab5972329ee4c29684b4faa')
//     }).toArray().then( (docs) => {
//         console.log('Todos');
//         console.log(JSON.stringify(docs, undefined, 2));
//     }, (err) => {
//         console.log('Unable to fetch todos');
//     });

    // find() returns 'cursor'
    // cursor has methods .toArray / .count(), etc. etc. 
    //  toArray() and count() both returns promise if callback is not specifeid as argument
    // db.collection('Todos').find().count().then( (count,err) => {
    //     console.log(`Todos : ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos');
    // });

    db.collection('Users').find({location:'Otsu'}).count().then( (count) => {
        console.log(`Todos : ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos');
    });

        
//    client.close();
});

