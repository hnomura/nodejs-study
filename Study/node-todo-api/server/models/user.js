const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type:   String, 
        required: true, 
        minLength: 1, 
        trim: true,
        unique: true,
        validate: { 
            // validator: (value) => {
            //     return validator.isEmail(value);
            // },
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String, 
        required: true, 
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


// Define instance methods
// cannot be arrow function because we use 'this'

// Overwrite existing instance method 
UserSchema.methods.toJSON = function () {
    var user = this; 
    var userObject = user.toObject(); // mongoose document object to JSON object (attributes only)
    return _.pick(userObject, ['_id', 'email']); // extract only _id and email attributes 
};

// Add New instance method 
UserSchema.methods.generateAuthToken = function () {
    var user = this;

    // JWT of {_id:user_id, access:'auth'} with 'abc123' as secret 
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

//  user.tokens.push({access,token});
    user.tokens = user.tokens.concat( [{access,token}] );

    // NOTE: tricky part. Return promise, and pass token to the callback function to the returned promise..
    return user.save().then(() => {
        return token;
    });
};

// Model function (class method)
UserSchema.statics.findByToken = function (token) {
    var User = this;  // model object 
    var decoded;
    
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch(e) {
        // this allows caller's promise handling to reject case 
        // return new Promise((resolve,reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    // reutrn promise
    return User.findOne({
        '_id': decoded._id, 
        'tokens.token': token, 
        'tokens.access': 'auth'
    })
};


// Middleware
UserSchema.pre('save', function (next) {
    var user = this; 

    if ( user.isModified('password') ) {
        bcrypt.genSalt( 10, (err,salt) => {
            bcrypt.hash(user.password, salt, (err,hash) => {
                user.password = hash;
                next();
            })
        });
    } else { 
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User }; 
