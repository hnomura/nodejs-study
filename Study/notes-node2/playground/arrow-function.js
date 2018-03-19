// var square = (x) => {
//     var result = x * x;
//     return result;
// };
var square = (x) => x * x;
console.log(square(9));

var user = {
    name: 'Hiroshi',
    sayHi: () => {
        // This does not work as expected. 
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    },
    sayHiAlt () { 
        // This does work as expected
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);        
    }
};

console.log('--- Allow function ----')
user.sayHi(1,2,3);

console.log('--- Regular function ---')
user.sayHiAlt(1,2,3);


