const express = require('express');

// Express.js view engine for handlebar.js
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get( '/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Hiroshi',
    //     likes: [ 
    //         'Drinking',
    //         'Reading',
    //         'Study'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page', 
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my home'
    });
});

app.get('/about', (req,res) => { 
    res.render('about.hbs', {
        pageTitle: 'About This Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});
app.listen(3000 ,()=> {
    console.log('Server is up on port 3000');
});

