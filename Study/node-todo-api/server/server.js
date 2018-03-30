require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} =  require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express(); 
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator: req.user._id}).then((todos) => {
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

app.post('/users', (req,res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    // Model method
    //   User.findByToken()
    // Instance method 
    //   user.generateAuthToken()
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


// authenticate middleware is called before (req,res) handler 
app.get('/users/me',authenticate, (req,res) => {
    // get modified req by authenticate() 
    res.send(req.user);
});

// POST /users/login 
app.post('/users/login', (req,res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        // generate new token, append to user.tokens[] array, save it.
        // if password mismatch, then Promise.reject() is called, hence 
        // this async jumps to catch block. So is with invalid email, too.
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);            
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

// DELETE /users/me/token
app.delete('/users/me/token', authenticate, (req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    }) ;
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = { app };


