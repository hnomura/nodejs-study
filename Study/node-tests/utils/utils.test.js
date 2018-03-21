// npm run test-watch : for nodemon 
const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {

    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33, 11);
            expect(res).toBe( 44 ).toBeA('number');
            // if ( res !== 44 ) { 
            //     throw new Error(`Expected 44, but got ${res}`);
            // }
        });
        
        // testing asynchronous code
        it('should async add two numbers', (done) => {
            utils.async_add( 4, 3, (sum)=>{
                expect(sum).toBe(7).toBeA('number');
                done();
            });
        });    
    });

    describe('#square', () => {
        it('should square a number', () => {
            var res = utils.square(9);
            expect(res).toBe( 81 ).toBeA('number');
            // if (res !== 81 ) {
            //     throw new Error(`Expected 81, but got ${res}`);
            // }
        });
        
        // testing asynchronous code
        it('should async square a number', (done) => {
            utils.async_square(9, (result) => {
                expect(result).toBe(81).toBeA('number');
                done();
            });
        });    
    });

    it('should expect some values', () => {
        // expect(12).toNotBe(12);
        expect({name: 'Hiroshi'}).toEqual({name: 'Hiroshi'});
        expect({name: 'Hiroshi'}).toNotEqual({name: 'hiroshi'});
        expect([2,3,4]).toInclude(2);
        expect([2,3,4]).toExclude(1);
    
        var me = { 
            name: 'Hiroshi',
            age: 53, 
            location: 'Hashimoto'
        };
    
        expect(me).toInclude({
            age: 53
        });
    
        expect(me).toExclude({
            age: 54
        });
    });

    describe('#user Object', () => {
        it('should verify first and last names are set', () => {
            var me = { 
                fullName: 'Hiroshi Nomura',
                age: 53
            };
        
            var res = utils.setName(me, me.fullName);
        
            // Javascript is call-by-reference
            expect(res).toEqual(me);
        
            // setName() validation
            expect(me).toInclude({ 
                firstName: 'Hiroshi',
                lastName: 'Nomura'
            });
        });    
    });    
});

