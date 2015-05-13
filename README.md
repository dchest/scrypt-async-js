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


Usage
-----

There are three general ways to call scrypt:

### scrypt(password, salt, logN, r, dkLen, interruptStep, callback, [encoding])

Derives a key from password and salt and calls callback with derived key as the
only argument. The calculations are interrupted with zero setTimeout at the
given interruptSteps to avoid freezing the browser. Encoding is optional.

### scrypt(password, salt, logN, r, dkLen, callback, [encoding])

Same as first, but uses default interruptStep (1000). Encoding is optional.

### scrypt(password, salt, logN, r, dkLen, [encoding]) -> returns result

Synchronous: doesn't interrupt calculations and returns the result instead of
passing it to callback. Encoding is optional. Perfect for use in web workers.


#### Arguments:
	
* *password* - password (string or array of bytes)
* *salt* - salt (string or array of bytes)
* *logN* - CPU/memory cost parameter (1 to 31)
* *r* - block size parameter
* *dkLen* - length of derived key
* *interruptStep* - steps to split calculation with timeouts (default 1000)
* *callback* - callback function (`function (array|string)`)
* *encoding* - result encoding (`"base64"`, `"hex"`, or `null`).

When encoding is not set, the result is an `Array` of bytes.


Limitation
----------

Doesn't support parallelization parameter greater than 1.


License
-------

BSD-like, see LICENSE file.
