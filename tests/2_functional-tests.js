const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  test('Test GET with 10L input', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '10L'})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.returnNum, 2.64172);
        done();
      });
  });
  test('Test with invalid unit', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '32g'})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });
  test('Test with invalid number', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kg'})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });
  test('Test with invalid number AND invalid unit', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kilomegagram'})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });
  test('Test with invalid number AND invalid unit', function (done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({input: 'kg'})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.returnNum, 2.20462);
        done();
      });
  });
});

