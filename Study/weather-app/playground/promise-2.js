const accessKey = 'AIzaSyAfrd_U6WRKPaZFDYDl7bKMKa_Zju8tKvU';
const request = require('request');

var geocodeAddress = (address) => {
    return new Promise( (resolve,reject) => {

    var addressURI = encodeURIComponent( address);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURI}&key=${accessKey}`;
 
    request({
        url: url, 
        json: true
        }, (error, response, body)=>{  
            if (error) {
                reject('Unable to connect to Google server');
            }
            else if ( body.status === 'ZERO_RESULTS') { 
                reject('Unable to find that address');
            } else if ( body.status === 'OK' ) 
            {
                resolve( {
                    address: body.results[0].formatted_address, 
                    latitude:  body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng                    
                });
            }
        });
    });
};

geocodeAddress('19146').then( (location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});