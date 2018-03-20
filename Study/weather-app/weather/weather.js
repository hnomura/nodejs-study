var request = require('request');

const accessKey = '2aa322512243450ae48c2933160c763c';
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// var url='https://api.darksky.net/forecast/2aa322512243450ae48c2933160c763c/38.6130113,-81.4440213';

var getWeather = (latitude, longitude, callback) => { 
    var url=`https://api.darksky.net/forecast/${accessKey}/${latitude},${longitude}`;

    request({
        url: url, 
        json: true
    }, (error, response, body)=>{
        // console.log(JSON.stringify(body, undefined, 2));
        if ( !error && response.statusCode === 200 )  {
            // console.log(`Temperature = ${body.currently.temperature}`);
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else { 
            callback('Unable to get weather');
            // console.log('Unable to get weather');        
        }
    });    
};

module.exports = { 
    getWeather,
};