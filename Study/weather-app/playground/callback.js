var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Hiroshi'
    };
    setTimeout( () => {
        callback(user);
    }, 3000);
};

getUser(31, (userObj) => {
    console.log(userObj);
});

// https://maps.googleapis.com/maps/api/geocode/json
// https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia

