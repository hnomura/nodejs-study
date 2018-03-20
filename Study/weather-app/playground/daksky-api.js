var request = require('request');

// 2aa322512243450ae48c2933160c763c
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]

var url='https://api.darksky.net/forecast/2aa322512243450ae48c2933160c763c/38.6130113,-81.4440213';

request({
    url: url, 
    json: true
}, (error, response, body)=>{
    // console.log(JSON.stringify(body, undefined, 2));
    if ( !error && response.statusCode === 200 )  {
        console.log(`Temperature = ${body.currently.temperature}`);
    } else { 
        console.log('Unable to get weather');        
    }
});
