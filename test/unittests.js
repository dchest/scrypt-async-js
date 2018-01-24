var scrypt = require('../scrypt-async.js');
var assert = require("assert");

var inputs = [
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
    password: '☺☻☹ abc 𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
    salt: [1, 2, 3],
    logN: 10,
    r: 8,
    dkLen: 10,
    encoding: 'hex',
    result: 'd64f593e6c4e7a39913d'
  },
  {
    password: [104, 101, 108, 108, 111], // "hello"
    salt: [208, 188, 208, 184, 209, 128], // "мир"
    logN: 4,
    r: 4,
    dkLen: 8193,
    encoding: 'base64',
    result: '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'+
            '+gfFJNIU2FvDzm2cSSoAxiw1v2fZ7uYdifePvrIW1YeRzcArOiRigavSi7MLNjO1Hhf4F6v7ixjn9DB6'+
            'Z/yk5P+SEUQPk9QfqdvnVOghxwvzNvHGibVYYFKJMBr4SUf3+dXYrpJ175dGTcbZ0HOSl7J/6U4k/gdD'+
            'LuDZwHPXoSrkVdwG2xdSKKVzBCQqdEjn9cWskt2Ft3cSpiYurpM3II/luklLHVr1XHtcMqJQZijJQQ4f'+
            'DyJ97SaFd2uTYvU5Ltr12uaV9DoJK2CupY+Z5k+V9uO87FzyfdgijHpOZHkJl0j1VrwNXMCU9T7KChIN'+
            'OhW8rx9L9XSPXTrMAm+Yk1+Vhe0RSlOWg/ZP6RDCV2UAa8uxlpJdgtnas9ndc9f6cSXRhrLiaqI/tHd2'+
            'KokyJqiJbRow0/Kd14J9CnjDJB3PrGKtDjcwwyhNNmu1cH8jgK12JKIjbIXXSylH0WgIMfr1xz9Otvku'+
            '67WElrWTYkas4lOMKyJtLfJOOG7Tzqqbhw7GLQ4OgSGhu'
  },
  {
    password: 'this is a very long string, which should be pre-hashed by PBKDF2 as it exceeds block size',
    salt: 'some salt',
    logN: 4,
    r: 4,
    dkLen: 16,
    encoding: 'hex',
    result: '518a355ac6468a4d98708adf03577df6'
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
    password: 'this is a long \x00 password',
    salt: 'and this is a long \x00 salt',
    logN: 14,
    r: 8,
    dkLen: 256,
    encoding: 'hex',
    result: 'c3f182ee2dec846e70a6942fb529985a3a09765ef04c612923b17f18555a37076deb2b9830d69de5492651e4506ae5776d96d40f67aaee37e1777b8ad5c3111432bb3b6f7e1264401879e641aea2bd0a21a124fd5c1ece0891338d2c44ba312e497bd93660fc053a5df35ade0ca48fd0f3c6c0f6143bb3548420a7cbf6ce7c82bc6b56c8e33adbf6fbac9e0ffc4aa9fb9fcd97fd393700b7d8eac55d45d4651bdb1a270c35c8d40a22e1b2429d6521c4c673e4ba7e7f4a9638ec3b1adbc6dcab64e211b5a26df8f274511be41228cd9a4fae3ada5236ebf39dfc6cd1864652a16516fb622502205d9fdbf09dc6fa964b57cc468ee8d98e4a00bf064222dafec8'
  }
];

var shortInput = {
  password: 'password',
  salt: 'salt',
  logN: 1,
  r: 1,
  dkLen: 16,
  hexResult: '6d1bb878eee9ce4a7b77d7a44103574d',
  result: [109, 27, 184, 120, 238, 233, 206, 74, 123, 119, 215, 164, 65, 3, 87, 77]
};

var inputsWithP = [
  {
    password: 'password',
    salt: 'salt',
    N: 2,
    r: 10,
    p: 10,
    result: [0x48, 0x2c, 0x85, 0x8e, 0x22, 0x90, 0x55, 0xe6, 0x2f,
        0x41, 0xe0, 0xec, 0x81, 0x9a, 0x5e, 0xe1, 0x8b, 0xdb,
        0x87, 0x25, 0x1a, 0x53, 0x4f, 0x75, 0xac, 0xd9, 0x5a,
        0xc5, 0xe5, 0xa, 0xa1, 0x5f]
  },
  {
    password:	"password",
    salt: "salt",
		N: 16,
    r: 100,
    p: 100,
		result: [
			0x88, 0xbd, 0x5e, 0xdb, 0x52, 0xd1, 0xdd, 0x0, 0x18,
			0x87, 0x72, 0xad, 0x36, 0x17, 0x12, 0x90, 0x22, 0x4e,
			0x74, 0x82, 0x95, 0x25, 0xb1, 0x8d, 0x73, 0x23, 0xa5,
			0x7f, 0x91, 0x96, 0x3c, 0x37,
    ]
  }
];

describe('limits test', function() {
  var v = shortInput;

  it('should throw with too small logN', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, 0, v.r, v.dkLen);
    }, Error);
  });

  it('should throw with too big logN', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, 32, v.r, v.dkLen);
    }, Error);
  });

  it('should throw with too big N', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, { N: ((-1)>>>0) + 1, r: v.r, dkLen: v.dkLen });
    }, Error);
  });

  it('should throw with too small N', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, { N: 1, r: v.r, dkLen: v.dkLen });
    }, Error);
  });

  it('should throw when N is not power of two', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, { N: 123, r: v.r, dkLen: v.dkLen });
    }, Error);
  });

  it('should throw with too large parameters', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, v.logN, 1<<31, v.dkLen);
    }, Error);
  });

  it('should throw when r = 0', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, v.logN, 0, v.dkLen);
    }, Error);
  });

  it('should throw when p = 0', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, { logN: v.logN, r: v.r, p: 0, dkLen: v.dkLen});
    }, Error);
  });

});

describe('argument order test', function() {
  this.timeout(100000);

  var v = shortInput;

  it('all arguments', function(done) {
    scrypt(v.password, v.salt, v.logN, v.r, v.dkLen, 1000, function(out) {
      assert.equal(v.hexResult, out);
      done();
    }, "hex");
  });

  it('all arguments, zero interruptStep', function(done) {
    scrypt(v.password, v.salt, v.logN, v.r, v.dkLen, 0, function(out) {
      assert.equal(v.hexResult, out);
      done();
    }, "hex");
  });

  it('drop encoding', function(done) {
    scrypt(v.password, v.salt, v.logN, v.r, v.dkLen, 1000, function(out) {
      assert.deepEqual(v.result, out);
      done();
    });
  });

  it('drop interruptStep, keep encoding', function(done) {
    scrypt(v.password, v.salt, v.logN, v.r, v.dkLen, function(out) {
      assert.equal(v.hexResult, out);
      done();
    }, 'hex');
  });

});

describe('options test', function() {
  var v = shortInput;

  it('should throw when given too many arguments', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, { logN: v.logN, r: 1, dkLen: v.dkLen }, 666, function(){});
    }, Error);
  });

  it('should throw when there is no N or logN', function() {
    assert.throws(function() {
      scrypt(v.password, v.salt, { r: 1, dkLen: v.dkLen });
    }, Error);
  });



});

describe('encoding test', function() {
  this.timeout(100000);

  var v = shortInput;

  it('should return string for "hex"', function(done) {
    scrypt(v.password, v.salt, { logN: v.logN, r: v.r, dkLen: v.dkLen, encoding: 'hex' }, function(out) {
      assert.ok(typeof out === 'string');
      done();
    });
  });

  it('should return string for "base64"', function(done) {
    scrypt(v.password, v.salt, { logN: v.logN, r: v.r, dkLen: v.dkLen, encoding: 'hex' }, function(out) {
      assert.ok(typeof out === 'string');
      done();
    });
  });

  if (typeof Uint8Array !== 'undefined') {
    it('should return Uint8Array for "binary"', function(done) {
      scrypt(v.password, v.salt, { logN: v.logN, r: v.r, dkLen: v.dkLen, encoding: 'binary' }, function(out) {
        assert.ok(out instanceof Uint8Array);
        done();
      });
    });
  }

  it('should return Array for undefined', function(done) {
    scrypt(v.password, v.salt, { logN: v.logN, r: v.r, dkLen: v.dkLen }, function(out) {
      assert.equal(Object.prototype.toString.call(out), "[object Array]");
      done();
    });
  });
});

function async_test(i, interruptStep, done) {
  var v = inputs[i];
  scrypt(v.password, v.salt, v.logN, v.r, v.dkLen, interruptStep, function(out) {
    assert.deepEqual(v.result, out);
    done();
  }, v.encoding);
}

describe('async input/output test', function() {
  this.timeout(100000);

  var step = 1000;

  it('input 0', function(done) {
    async_test(0, step, done);
  });
  it('input 1', function(done) {
    async_test(1, step, done);
  });
  it('input 2', function(done) {
    async_test(2, step, done);
  });
  it('input 3', function(done) {
    async_test(3, step, done);
  });
  it('input 4', function(done) {
    async_test(4, step, done);
  });
  it('input 5', function(done) {
    async_test(5, step, done);
  });
  it('input 6', function(done) {
    async_test(6, step, done);
  });
  it('input 7', function(done) {
    async_test(7, step, done);
  });
  it('input 8', function(done) {
    async_test(8, step, done);
  });
  it('input 9', function(done) {
    async_test(9, step, done);
  });
  it('input 10', function(done) {
    async_test(10, step, done);
  });

});

describe('async input/output test with zero interruptStep', function() {
  this.timeout(100000);

  // Only shorter tests:
  var step = 0;

  it('input 0', function(done) {
    async_test(0, step, done);
  });
  it('input 1', function(done) {
    async_test(1, step, done);
  });
  it('input 2', function(done) {
    async_test(2, step, done);
  });
  it('input 3', function(done) {
    async_test(3, step, done);
  });

});

function async_test_opts(i, interruptStep, done) {
  var v = inputsWithP[i];
  scrypt(v.password, v.salt, {
      N: v.N,
      r: v.r,
      p: v.p,
      dkLen: v.result.length,
      interruptStep: interruptStep,
      encoding: v.encoding
  }, function(out) {
    assert.deepEqual(v.result, out);
    done();
  });
}


describe('async input/output test with options and p with zero interruptStep', function() {
  this.timeout(100000);

  var step = 0;

  it('input 0', function(done) {
    async_test_opts(0, step, done);
  });
  //// Takes too long
  // it('input 1', function(done) {
  //   async_test_opts(1, step, done);
  // });

});

describe('async input/output test with options and p', function() {
  this.timeout(100000);

  var step = 1000;

  it('input 0', function(done) {
    async_test_opts(0, step, done);
  });
  //// Takes too long
  // it('input 1', function(done) {
  //   async_test_opts(1, step, done);
  // });

});
