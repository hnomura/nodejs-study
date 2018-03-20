// GoogleAPI 
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a: {
            demand: true, 
            alias: 'address', 
            describe: 'Address to fetch whether for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    const geocodeKey = 'AIzaSyAfrd_U6WRKPaZFDYDl7bKMKa_Zju8tKvU';
    const weatherKey = '2aa322512243450ae48c2933160c763c';


    var geocodeEncodedURI = encodeURIComponent( argv.address );
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${geocodeEncodedURI}&key=${geocodeKey}`;

    axios.get( geocodeUrl ).then( (response) => {
        // resolve geoCodeUrl promise
        if ( response.data.status === 'ZERO_RESULTS' ) {
            // zero result = address not understood, jump to .catch() part. 
            throw new Error('Unable to find that address.');
        }
        console.log(response.data.results[0].formatted_address);

        var lat = response.data.results[0].geometry.location.lat; 
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl=`https://api.darksky.net/forecast/${weatherKey}/${lat},${lng}`;
        return axios.get( weatherUrl );
    }).then( (response) => {
        // resolve weatherUrl promise 
        var temperature = response.data.currently.temperature; 
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`Current Temperature : ${temperature}`); 
        console.log(`Apprent Temperature : ${apparentTemperature}`); 
    }).catch( (e)=>{
        if ( e.code === 'ENOTFOUND') { 
            console.log('Unable to connect to API server');
        } else { 
            console.log(e.message);
        }
    });
