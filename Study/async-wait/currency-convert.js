// USD 23 to CAD 
// 23 USD is worh 28 CAD. You can spend these in the following countries: 
//
// [fixer.io]
// new (free subscription cannot use base currency)
// http://data.fixer.io/api/latest?access_key=3cca7dd2ccf882c8ff756055f7c4ffc7&format=1
//
// old (still works)
// http://api.fixer.io/latest?base=USD
//
// 
// [restcountries.eu]
// https://restcountries.eu/rest/v2/currency/cad


const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get(`http://api.fixer.io/latest?base=${from}`).then((resp) => {
//         return resp.data.rates[to];
//     });
// };
const getExchangeRate = async (from, to) => {
    try {
        const resp = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate = resp.data.rates[to];
        if (rate) { 
            return rate;
        }
        throw new Error();    
    } catch (e) {
        throw new Error(`Unable to get exchange rate for  ${from} and ${to}`)
    }
};

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((resp) => {
//         return resp.data.map((country) => country.name );
//     });
// }
const getCountries = async (currencyCode) => {
    try { 
        const resp = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return resp.data.map((country) => country.name );    
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`)
    }
}

// getExchangeRate('USD', 'CAD').then((rate)=>{
//     console.log(rate);
// });

// getCountries('USD').then((countries) => {
//     console.log(countries);
// })

// promise-chain version 
const convertCurrency = (from, to, amount) => {
    let rate; 
    return getExchangeRate(from,to).then((tempRate) => {
        rate = tempRate; 
        return getCountries(to);
    }).then( (countries) => {
        const exchangedAmount = amount * rate; 
        return `${amount} ${from} is worth ${exchangedAmount} ${to}.\n` +
        `${to} can be used in the following countries:\n${countries.join(', ')}`;        
    })
};

// async/awayt version 
const convertCurrencyAlt = async (from, to, amount) => {
    const rate = await getExchangeRate(from,to);
    const countries = await getCountries(to);
    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}.\n` +
    `${to} can be used in the following countries:\n${countries.join(', ')}`;        
};

// convertCurrency('CAD', 'USD', 100).then((status) => {
//     console.log('=== promise chain ===')
//     console.log(status);
// })

convertCurrencyAlt('CAD', 'USD', 100).then((status) => {
    console.log('=== async/wait ===')
    console.log(status);
}).catch((e) => {
    console.log(e.message);
})

