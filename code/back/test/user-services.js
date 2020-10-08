let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://2.153.90.86:88';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

describe('User tests - Add: ', () => {
    // Insert user
    it('should insert a user', function (done) {
        chai.request(url)
            .post('/user')
            .send({ name: "Name unit testing", surname: "Surname unit testing", rol: 0, email: "emailtest@unittesting.com", hash_password: "passwordtesting", type: 0 })
            .end(function (err, res) {
                //console.log(res.body)
                expect(res).to.have.status(201);
                done();
            });
    });

    // Get user by email
    it('should get an user by email', function (done) {
        sleep(200)
        chai.request(url)
            .get('/user/emailtest@unittesting.com')
            .send({ name: "Name unit testing", surname: "Surname unit testing", rol: 0, email: "emailtest@unittesting.com", hash_password: "passwordtesting", type: 0 })
            .end(function (err, res) {
                //console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });

    // User already exists
    it('should get error already exists user', function (done) {
        sleep(400)
        chai.request(url)
            .post('/user')
            .send({ name: "Name 2 unit testing", surname: "Surname 2 unit testing", rol: 0, email: "emailtest@unittesting.com", hash_password: "passwordtesting2", type: 0 })
            .end(function (err, res) {
                //console.log(res.body)
                expect(res).to.have.status(400);
                done();
            });
    });

    // Remove user
    it('should remove a user', function (done) {
        sleep(600)
        chai.request(url)
            .delete('/user/emailtest@unittesting.com')
            .end(function (err, res) {
                //console.log(res)
                expect(res).to.have.status(200);
                done();
            });
    });

    //Remove user
    it('should get an error removing a user', function (done) {
        sleep(800)
        chai.request(url)
            .delete('/user/emailtest@unittesting.com')
            .end(function (err, res) {
                //console.log(res)
                expect(res).to.have.status(204);
                done();
            });
    });

    // Get user by email error
    it('should get error trying get an user by email', function (done) {
        sleep(1000)
        chai.request(url)
            .get('/user/emailtest@unittesting.com')
            .send({ name: "Name unit testing", surname: "Surname unit testing", rol: 0, email: "emailtest@unittesting.com", hash_password: "passwordtesting", type: 0 })
            .end(function (err, res) {
                //console.log(res.body)
                expect(res).to.have.status(400);
                done();
            });
    });
});
