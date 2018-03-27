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






