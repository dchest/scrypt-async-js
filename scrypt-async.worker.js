/*!
 * Fast "async" scrypt implementation in JavaScript.
 * Copyright (c) 2013-2014 Dmitry Chestnykh | BSD License
 * Author: <giovanni.pellerano@evilaliv3.org>
 * https://github.com/dchest/scrypt-async-js
 */

importScripts("scrypt-async.min.js");

onmessage = function(e) {
  options = e.data;

  return new Promise(function(resolve, reject) {
    var callback = function(result) {
      postMessage(result);
    }

    scrypt(options.password,
           options.salt,
           options.logN,
           options.r,
           options.dkLen,
           options.interruptStep,
           callback,
           options.encoding);
  });

}
