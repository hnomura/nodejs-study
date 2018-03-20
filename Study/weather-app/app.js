// GoogleAPI 
const yargs = require('yargs');

// Local modules
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// console.log(argv);
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if ( errorMessage ) { 
//         console.log(errorMessage);
//     } else { 
//         // console.log(JSON.stringify(results, undefined, 2));
//         console.log(`Address: ${results.address}`)
//         weather.getWeather( results.latitude, results.longitude, (errorMessage, weatherResult) => {
//             if ( errorMessage )  { 
//                 console.log( errorMessage );
//             } else { 
//                 // console.log(JSON.stringify(weatherResult, undefined, 2));
//                 console.log(`Current Temperature  : ${weatherResult.temperature}`);
//                 console.log(`Apparent Temperature : ${weatherResult.apparentTemperature}`);
//             }
//         } );
//     }
// });

geocode.geocodeAddress( argv.address )
.then( (locationResult) => {
    console.log(`Address: ${locationResult.address}`);
    
    weather.getWeather( locationResult.latitude, locationResult.longitude )
    .then( (weatherResult) => {
        console.log(`Current Temperature  : ${weatherResult.temperature}`);
        console.log(`Apparent Temperature : ${weatherResult.apparentTemperature}`);
    })
})
.catch( (errorMessage) => {
    console.log( errorMessage );
});

