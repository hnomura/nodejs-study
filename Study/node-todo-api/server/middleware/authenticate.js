var {User} = require('./../models/user');


// custom middleware to express
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) { 
            // jump to catch block 
            return Promise.reject();
        }

        // modify request
        req.user = user; 
        req.token = token; 
        
        next();
    }).catch((e) => {
        res.status(401).send();
    });
}

module.exports = {authenticate};


