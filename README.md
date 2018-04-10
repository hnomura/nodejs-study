# nodejs-study

## Introduction
Personal node.js study repository (for me as beginner).  
Hands-on practices with Udemmy's ***The Complete Node.js Developer Course*** *(2nd edition)*. 


## hello-world 
As usual, simplest project to be familiar with node.js environment. 

## notes_node
Learn how to use packages such as `os`, `fs`, `lodash`. 
Lean how to export function from a module.  

## notes_node2
Continuation from `notes_node`, by usng `fs` to store JSON objects (as if it is database).  Also illustrates the use of `yargs` package to handle command line parameter/options.  

## node-web-server
Hosting web server by `express`, and `handlebar` as view engine with its *template* capability. Using middlewares to `express` to add custom route.  

## wether-app
Simple web server with REST APIs. Uses `request` package to use 3rd parties' REST API (google geolocation, DarkSky weather). Examining `promise` is part of this tutorial. 

## note-tests 
Unit testing server application by using `supertest`, `expect`, and `Mocha`.  Customizing `package.json` to run unit test cases (`test-watch` script) with `npm run test-watch` command.  

## node-todo-api
Realistic RESTful server with CRUD methods in place.  Using `mongodb` as backend database. Using `mongodb native` is examined in playground. Final code uses `mongoose` for easy interaction with `mongodb`.  Leverage the unit testing to each of CRUD method use-cases.  
Including the usage of utilities such as: 
- Postman (testng CRUD APIs)
- Robo 3T (interactive access to mongoDB)  

Expect is [Jest Expect](https://facebook.github.io/jest/docs/en/expect.html), **not** the old [mjackson expect](https://github.com/mjackson/expect)

## async-wait
### app-promises.js
ES7 async/await usage illustration. 
async function always returns promise implicitly.  
await can be called only inside of async function. 
await is against promise.  

```
const chilldFunc = (a) => {
    return new Promise((resolve,reject) => {
        x = 2*a;
        resolve(x);
    });
};
const parentFunc = async () => {
    const a = 100;
    const x = await childFunc(a);
    return x;
};  
parentFunc().then( (x) => {
    console.log(x);
});
```
### currency-convert.js
One public API is http://api.fixer.io/latest?base=USD, here USD can be the other currency code. This is to get exchange rate.  
Another public API is https://restcountries.eu/rest/v2/currency/cad, here cad can be the other country code.  This is to get a list of countries that use the given currency. 

By using these two APIs, code convert currency from one to another and list the countries in which the exchanged currency can be used. 
To make `get` request to these APIs, `axios` is used because it supports promise, i.e., await can be used.  
If `request` is used, usual callback will be the only way (not verified, though)






