var scrypt = require('../scrypt-async.js');
var assert = require("assert");

var inputs = [
  {
    password: 'this is a long \x00 password',
    salt: 'and this is a long \x00 salt',
    logN: 14,
    r: 8,
    result: 'c3f182ee2dec846e70a6942fb529985a3a09765ef04c612923b17f18555a37076deb2b9830d69de5492651e4506ae5776d96d40f67aaee37e1777b8ad5c3111432bb3b6f7e1264401879e641ae'
  },
  {
    password: 'p',
    salt: 's',
    logN: 1,
    r: 1,
    result: '48b0d2a8a3272611984c50ebd630af52'
  },
  {
    password: '',
    salt: '',
    logN: 4,
    r: 1,
    result: '77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442fcd0069ded0948f8326a753a0fc81f17e8d3e0fb2e0d3628cf35e20c38d18906'
  },
  {
    password: 'pleaseletmein',
    salt: 'SodiumChloride',
    logN: 14,
    r: 8,
    result: '7023bdcb3afd7348461c06cd81fd38ebfda8fbba904f8e3ea9b543f6545da1f2d5432955613f0fcf62d49705242a9af9e61e85dc0d651e40dfcf017b45575887'
  }
]

var input_output_test = function(i, done) {
  var v = inputs[i];
  scrypt(v.password, v.salt, v.logN, v.r, v.result.length/2, 1000, function(out) {
    if (v.result != out) {
      should.fail("fail on input " + i + 1);
    } else {
      done();
    }
  }, 'hex');
}

describe('input/output test', function(){
  this.timeout(50000);

  it('input 0', function(done) {
    input_output_test(0, done);
  });
  it('input 1', function(done) {
    input_output_test(1, done);
  });
  it('input 2', function(done) {
    input_output_test(2, done);
  });
  it('input 3', function(done) {
    input_output_test(3, done);
  });

});
