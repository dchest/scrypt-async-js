var scrypt = require('../scrypt-async.js');
var assert = require("assert");

var inputs = [
  {
    password: 'this is a long \x00 password',
    salt: 'and this is a long \x00 salt',
    logN: 14,
    r: 8,
    dkLen: 256,
    encoding: 'hex',
    result: 'c3f182ee2dec846e70a6942fb529985a3a09765ef04c612923b17f18555a37076deb2b9830d69de5492651e4506ae5776d96d40f67aaee37e1777b8ad5c3111432bb3b6f7e1264401879e641aea2bd0a21a124fd5c1ece0891338d2c44ba312e497bd93660fc053a5df35ade0ca48fd0f3c6c0f6143bb3548420a7cbf6ce7c82bc6b56c8e33adbf6fbac9e0ffc4aa9fb9fcd97fd393700b7d8eac55d45d4651bdb1a270c35c8d40a22e1b2429d6521c4c673e4ba7e7f4a9638ec3b1adbc6dcab64e211b5a26df8f274511be41228cd9a4fae3ada5236ebf39dfc6cd1864652a16516fb622502205d9fdbf09dc6fa964b57cc468ee8d98e4a00bf064222dafec8'
  },
  {
    password: 'p',
    salt: 's',
    logN: 1,
    r: 1,
    dkLen: 256,
    encoding: 'hex',
    result: '48b0d2a8a3272611984c50ebd630af52e187db3433930c3b74d0889935944cf3c0c3e055b9388c227467e5d8ad4d4512f3231387514af27bc7d06efda2fcd14154fdde66bef90471324762405572831660175a0fcc3e2d7922caafc962dede1cb3eafbf7043aa3cc0442ff331cd462bca60a2ac5b2952b835d4ee430d1eb796afa5a0bc5a71061fe11210568a39deacb6d831a3a508b323534535dda0ba62f47adfd4b7dca6b13016f85568bc0d99dbec585fa357ff0d1a7764e45d9f128779049cc6212b9c03409ccdc6b6bb501b9000860bbe91acef050cef3d44dd11d9bb0f379e64c3e51e3e30c3a4f2dac935fcbffde07a87669ca90c345aac2812e1979'
  },
  {
    password: 'p',
    salt: 's',
    logN: 1,
    r: 1,
    dkLen: 256,
    encoding: 'base64',
    result: 'SLDSqKMnJhGYTFDr1jCvUuGH2zQzkww7dNCImTWUTPPAw+BVuTiMInRn5ditTUUS8yMTh1FK8nvH0G79ovzRQVT93ma++QRxMkdiQFVygxZgF1oPzD4teSLKr8li3t4cs+r79wQ6o8wEQv8zHNRivKYKKsWylSuDXU7kMNHreWr6WgvFpxBh/hEhBWijnerLbYMaOlCLMjU0U13aC6YvR639S33KaxMBb4VWi8DZnb7Fhfo1f/DRp3ZORdnxKHeQScxiErnANAnM3GtrtQG5AAhgu+kazvBQzvPUTdEdm7DzeeZMPlHj4ww6Ty2sk1/L/94HqHZpypDDRarCgS4ZeQ=='
  },
  {
    password: '',
    salt: '',
    logN: 4,
    r: 1,
    dkLen: 256,
    encoding: 'hex',
    result: '77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442fcd0069ded0948f8326a753a0fc81f17e8d3e0fb2e0d3628cf35e20c38d18906ce73206656cf8c1ead7f4f6630d0adae1fd8878b77c3b469db919f01597f613ac2f78aec5a5c67c255833119eb3e66b6977e6e7e32e0857b796dfbbc27e3e076e575c55f661563432d4452427d8a21a4bfc0f4f79532181d011ecbd9f210e301b925e82cadbaec015d2da4b1122f51eb2d79f22e28b7e1204a15e741febf9b94526d57e7277d7aa12e9ac8a58fd4c42f6922470156cbd279ec1619c574d45c4177286322803c6046d8b14c1f6c56b6e2e22d077e0a3174ba9d765a84f52b11cd'
  },
  {
    password: '',
    salt: '',
    logN: 4,
    r: 1,
    dkLen: 256,
    encoding: 'base64',
    result: 'd9ZXYjhleyA7GcpCwYoEl/FrSETjB0ro39/6P+3iFEL80Aad7QlI+DJqdToPyB8X6NPg+y4NNijPNeIMONGJBs5zIGZWz4werX9PZjDQra4f2IeLd8O0aduRnwFZf2E6wveK7FpcZ8JVgzEZ6z5mtpd+bn4y4IV7eW37vCfj4HbldcVfZhVjQy1EUkJ9iiGkv8D095UyGB0BHsvZ8hDjAbkl6CytuuwBXS2ksRIvUestefIuKLfhIEoV50H+v5uUUm1X5yd9eqEumsilj9TEL2kiRwFWy9J57BYZxXTUXEF3KGMigDxgRtixTB9sVrbi4i0HfgoxdLqddlqE9SsRzQ=='
  },
  {
    password: 'pleaseletmein',
    salt: 'SodiumChloride',
    logN: 14,
    r: 8,
    dkLen: 256,
    encoding: 'hex',
    result: '7023bdcb3afd7348461c06cd81fd38ebfda8fbba904f8e3ea9b543f6545da1f2d5432955613f0fcf62d49705242a9af9e61e85dc0d651e40dfcf017b45575887c3b5417f26036e90e9c1fe355d24ee3623c8b8bad9b9aa93286c6429dbc0bfa2e69326c0806f7dc5f825a6b9cc32d18483a117c1ea78e2f38675579c811c0b67c262dbab7fe2b6d989d07fac3443c859cf7b34fed8cc5b279f7bdbf6e0cd8d90a82fe56f3ac7a5b81f98275c9c5cb69f19c8bddc33db6bd7da847ec3197e13f33f70b00a46836b7c0a0379559160ef42c8332097f7ca265fe6ff972ce1ffb515ff7e4e715e4c92839113ea67f2515f311549fc7eee49804136fb0830abb943d3'
  },
  {
    password: 'пароль',
    salt: 'соль',
    logN: 4,
    r: 8,
    dkLen: 32,
    encoding: 'hex',
    result: '1385c1eecf16becb6114369c199298d10145df3082d6993966f2609901b509e4'
  },
  {
    password: '密码',
    salt: '盐',
    logN: 5,
    r: 8,
    dkLen: 16,
    encoding: 'base64',
    result: 'FYjFuH0fb+qfG0Q0n5WFVQ=='
  },
  {
    password: 'hello',
    salt: 'world',
    logN: 5,
    r: 8,
    dkLen: 48,
    encoding: null,
    result: [212, 108, 63, 108, 230, 193, 1, 5, 181, 168, 169, 234, 8, 53, 241,
      76, 44, 108, 85, 218, 223, 158, 113, 64, 94, 114, 7, 160, 1, 160, 174,
      43, 11, 22, 144, 102, 217, 198, 114, 226, 91, 245, 240, 80, 28, 210, 107,
      239]
  }
]

var input_output_test = function(i, done) {
  var v = inputs[i];
  scrypt(v.password, v.salt, v.logN, v.r, v.dkLen, 1000, function(out) {
    assert.deepEqual(v.result, out);
    done();
  }, v.encoding);
}

describe('input/output test', function(){
  this.timeout(60000);

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
  it('input 4', function(done) {
    input_output_test(4, done);
  });
  it('input 5', function(done) {
    input_output_test(5, done);
  });
  it('input 6', function(done) {
    input_output_test(6, done);
  });
  it('input 7', function(done) {
    input_output_test(7, done);
  });
  it('input 8', function(done) {
    input_output_test(8, done);
  });

});
