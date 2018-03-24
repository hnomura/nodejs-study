// MongoClient
const MongoClient = require('mongodb').MongoClient;

//MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if ( err ) { 
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db = client.db('TodoApp');

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
    db.collection('Users').insertOne({
        name: 'Hiroshi Nomura', 
        age: 53, 
        location: 'Hashimoto'
    }, (err,result) => { 
        if (err) { 
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify( result.ops, undefined, 2));
    });

//    db.close();
    client.close();
});

