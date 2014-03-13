#!/bin/sh

node test.js && uglifyjs scrypt-async.js --comments '/^!/' -c -m -o scrypt-async.min.js

#TODO automatically run browser tests.
#TODO use some test framework.
