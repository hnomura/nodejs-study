const fs = require('fs');
const express = require('express');

// Express.js view engine for handlebar.js
const hbs = require('hbs');

var app = express();

// HBS partials hbs files in '/views/partials' folder
hbs.registerPartials(__dirname + '/views/partials');

// HBS helper with no input parameter
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
// HBS helper with one input parameter 
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

// other middleware - plugin to request processing
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) { 
            console.log('Unable to append to server.log');
        }
    });
    next(); // go to next step
});

// == When used, always show maintenance.hbs, beause next() is not called
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

// Static files (after maintenance)
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
        welcomeMessage: 'Welcome to my home'
    });
});

app.get('/about', (req,res) => { 
    res.render('about.hbs', {
        pageTitle: 'About This Page'
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

