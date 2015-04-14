scrypt-async
============

[![Build Status](https://travis-ci.org/dchest/scrypt-async-js.svg?branch=master)
](https://travis-ci.org/dchest/scrypt-async-js)

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


Limitation
----------

Doesn't support parallelization parameter greater than 1.


Usage
-----

### scrypt(password, salt, logN, r, dkLen, interruptStep, callback, encoding)
	
Derives a key from password and salt and calls callback with derived
key as the only argument.
	
* *password* - password (string or array of bytes)
* *salt* - salt (string or array of bytes)
* *logN* - CPU/memory cost parameter (1 to 31)
* *r* - block size parameter
* *dkLen* - length of derived key
* *interruptStep* - steps to split calculation with timeouts (default 1000)
* *callback* - callback function (`function (string)`)
* *encoding* - (optional) result encoding (`"base64"`, `"hex"`, or `null`).


License
-------

BSD-like, see LICENSE file.
