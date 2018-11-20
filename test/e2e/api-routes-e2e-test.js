const request = require('supertest');
const app = require('../server');
var assert = require('assert'); 

describe('GET /books-library/books', function () {
    it('respond with json containing a list of all books', function (done) {
        request(app)
            .get('/books-library/books')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert(res.body.length == 3);
                done();
            });
    });
});