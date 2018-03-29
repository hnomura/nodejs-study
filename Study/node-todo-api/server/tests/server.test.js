const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach( populateUsers );
beforeEach( populateTodos );

// POST /todos test
describe('POST /todos', () => {
    it('should create new tood', (done) => {
        const text = 'Test todo text';

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

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => { 
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        const hexId = new ObjectID().toHexString();
        request(app)
            .get(`todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object id', (done) => {
        const hexId = '123';
        request(app)
            .get(`todos/${hexId}`)
            .expect(404)
            .end(done);        
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) { 
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeNull();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`todos/${hexId}`)
            .expect(404)
            .end(done);        
    });

    it('should return 404 for non-object id', (done) => {
        var hexId = '123';
        request(app)
            .delete(`todos/${hexId}`)
            .expect(404)
            .end(done);        

    });
});

describe('PATCH /todos/:id', ()=> {
    it('should update the todo', (done) => {
        const hexId = todos[0]._id.toHexString();
        const text = 'This should be the new text'
        // updata text, set completed true
        // expect 200
        // expect text changed, completed is true, completedAt is a number
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when to do is not completed', (done) => {
        const hexId = todos[1]._id.toHexString(); 
        const text = 'This should be the 2nd new text';
        // update text, set completed to false 
        // expect 200 
        // text is changed, completed false, completedAt is null 
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false, 
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done);

    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                // toEqual is deep comparison of objects
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123abcd';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                // expect(res.headers['x-auth']).toExist();
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) { 
                    return done(err);
                }
                // query to database to make sure user is saved 
                User.findOne({email}).then((user) => {
                    // user to exist
                    expect(user).toBeTruthy();
                    // password to be hashed 
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should create validation error if request invalid', (done) => {
        var email = 'xyzxyz@slb.com'; 
        var password = 'abs'; // less than min 6 chars

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);
    });

    it('should not create user if email in use', (done) => {
        var email = users[0].email; // duplicated email 
        var password = 'password123';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login with auth returned', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err, res) => {
                if (err) { 
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[0]).toMatchObject({
                        access: 'auth', 
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should reject login', (done) => {
        // users[1] does not have tokens[] created in seed.js. 
        // Hence, upon rejecting login, tokens[] must be still empty. 
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password+1
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end((err, res) => {
                if (err) { 
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});