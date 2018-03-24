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

    // deleteMany 
    // db.collection('Todos').deleteMany({text: 'Something to do'}).then((result)=>{
    //     console.log(result);
    // });

    // deleteOne 
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result)=>{
    //     console.log(result);
    // });
    
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // deleteMany (with query condition)
    // db.collection('Users').deleteMany({location: 'Otsu'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne (by ObjectID)
    db.collection('Users').deleteOne({_id: new ObjectID('5ab598bf76ea7718ac1185e6')}).then((result)=>{
        console.log(result);
    });
    
        
//    client.close();
});

