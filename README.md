scrypt-async
============

[![Build Status](https://travis-ci.org/dchest/scrypt-async-js.svg?branch=master)](https://travis-ci.org/dchest/scrypt-async-js)
[![Coverage Status](https://coveralls.io/repos/dchest/scrypt-async-js/badge.svg)](https://coveralls.io/r/dchest/scrypt-async-js)

[![Saucelabs Test Status](https://saucelabs.com/browser-matrix/dchest.svg?auth=caae471e816fc76f8d9a2c292c5f577e)](https://saucelabs.com/u/dchest)

Fast "async" scrypt implementation in JavaScript.

Works in browsers without throwing out "kill slow script" warnings due to
configurable interruptStep, which yields from calculation.

Should be compatible even with IE. Also works with Node/io.js (but you should really use the C implementation for that).


Installation
------------

You can install it via a package manager:

[Bower](http://bower.io):

    $ bower install scrypt-async

[NPM](https://www.npmjs.org/):

    $ npm install scrypt-async

or [download source code](https://github.com/dchest/scrypt-async-js/releases).


To improve performance with small interruptStep values, use `setImmediate` shim,
such as <https://github.com/YuzuJS/setImmediate>.


Usage
-----

### scrypt(password, salt, logN, r, dkLen, [interruptStep], callback, [encoding])

Derives a key from password and salt and calls callback
with derived key as the only argument.

Calculations are interrupted with setImmediate (or zero setTimeout) at the
given interruptSteps to avoid freezing the browser. If interruptStep is not
given, it defaults to 1000. If it's zero, the callback is called immediately
after the calculation, avoiding setImmediate.

#### Arguments:
	
* *password* - password (string or array of bytes)
* *salt* - salt (string or array of bytes)
* *logN* - CPU/memory cost parameter (1 to 31)
* *r* - block size parameter
* *dkLen* - length of derived key
* *interruptStep* - (optional) steps to split calculation with timeouts (defaults to 1000)
* *callback* - callback function (`function (array|string)`)
* *encoding* - (optional) result encoding (`"base64"`, `"hex"`, or `null`/`undefined`).

When encoding is not set, the result is an `Array` of bytes.


Limitation
----------

Doesn't support parallelization parameter greater than 1.


License
-------

BSD-like, see LICENSE file.
