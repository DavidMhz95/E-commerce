let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://2.153.90.86:88';

describe('Insert a user: ',()=>{
 it('should get all users', (done) => {
 chai.request(url)
 .get('/users')
 .end( function(err,res){
 console.log(res.body)
 expect(res).to.have.status(200);
 done();
 });
 });
 
 it('should insert a user', (done) => {
 chai.request(url)
 .post('/user')
 .send({name: "Name unit testing", surname: "Surname unit testing", rol: 0, email: "emailtest@unittesting.com", hash_password: "passwordtesting", type: 0})
 .end( function(err,res){
 console.log(res.body)
 expect(res).to.have.status(400);
 done();
 });
 });
});