const accessKey = 'AIzaSyAfrd_U6WRKPaZFDYDl7bKMKa_Zju8tKvU';

const request = require('request');

var geocodeAddress = (address, callback) => { 
    var addressURI = encodeURIComponent( address);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURI}&key=${accessKey}`;
    
    // console.log(addressURI);
    // console.log(url);
            
    request({
        url: url, 
        json: true
    }, (error, response, body)=>{
        if (error) { 
            // local error
            // console.log('Unable to connect to Google server');
            callback('Unable to connect to Google servers'); 
        }
        else if ( body.status === 'ZERO_RESULTS' ) { 
            // zero result 
            // console.log('Unable to find that address');
            callback('Unable to find that address');
        }
        else if ( body.status === 'OK' ) { 
            // JSON text with 2 space indentation
            // console.log(JSON.stringify(body, undefined, 2));
            // console.log(`Address: ${body.results[0].formatted_address}`);
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
            callback(undefined, {
               address: body.results[0].formatted_address, 
               latitude:  body.results[0].geometry.location.lat,
               longitude: body.results[0].geometry.location.lng
            });
        }
        else { 
            // console.log(`Error status ${body.status}`);
            callback(`Error status ${body.status}`);
        }
    });    
}

module.exports = { 
    geocodeAddress,
};
