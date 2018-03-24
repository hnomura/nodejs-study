const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test today'
}];


// before every test case
// Remove everything in Todos collection 
// NOTE: Mocha timeout has been increased to 5000msec in package.json
beforeEach( (done) => { 
    Todo.remove({}).then( () => {
        return Todo.insertMany(todos);
    }).then( () => done() );
});

// POST /todos test
describe('POST /todos', () => {
    it('should create new tood', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text:text})
            .expect(200)
            .expect((res)=> {
                expect(res.body.text).toBe(text);         
            })
            .end((err,res) => {
                if (err) { 
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done(); 
                }).catch((e)=> done(e));
            });
    });

    // post empty object 
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if (err) { 
                    return done(err);
                }

                Todo.find().then((todos) => { 
                    expect(todos.length).toBe(todos.length);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect( (res) => {
                expect(res.body.todos.length).toBe(todos.length);
            })
            .end(done);
    });
});