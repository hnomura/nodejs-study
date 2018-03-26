require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} =  require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express(); 
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});

// GET /todos/123234
app.get('/todos/:id', (req,res) => {
    // Todo.findById()
    // 1) success 
    // 1.1) user found = send it back 
    // 1.2) user not found = send back 404 with empty body 
    // 2) error = no corresponding user : status=400 and empty body 

    // /todos/12345 ==> req.params.id=1234
    var id = req.params.id;

    // validate ID by using ObjectdID.isValid() 
    // if invalid, respond status 404 with empty body 
    if ( !ObjectID.isValid(id) ) { 
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) { 
            return res.status(404).send();
        }
        // success path
        res.send({todo});
    }).catch( (e) => {
        res.status(400).send();
    });

});

app.delete('/todos/:id', (req,res) => {
    var id = req.params.id;

    if ( !ObjectID.isValid(id) ) { 
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) { 
            return res.status(404).send();
        }
        // success path 
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
    
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    
    // pick text/completed attributes (if exist)
    var body = _.pick(req.body, ['text', 'completed']);

    if ( !ObjectID.isValid(id) ) { 
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed ) {
        body.completedAt = new Date().getTime(); // epoc time in [ms]
    } else {
        body.completed = false; 
        body.completedAt = null;
    }

    // update and get updated one 
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) { 
            return res.status(404).send(); 
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = { app };


