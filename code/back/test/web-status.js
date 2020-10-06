var expect  = require('chai').expect;
var request = require('request');

it('Main page status OK', function(done) {
    request('http://2.153.90.86/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});