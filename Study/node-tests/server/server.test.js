const request = require('supertest');
const server = require('./server');
const expect = require('expect');

const app = server.app;

it('should return Hello World', (done) => {
    request(app)
        .get('/')
        .expect(404)
        .expect( (res) => {
            expect(res.body).toInclude({
                error: 'Page not found.'
            });
        })
        .end(done);
});

it('should contain my user object', (done) => {
    request(app)
        .get('/users')
        .expect(200)
        .expect( (res) => {
            expect(res.body).toInclude({
                name: 'Hiroshi',
                age: 53
            });
        })
        .end(done);
});