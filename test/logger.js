'use strict';

const logger = require('../lib');

const logStr = 'Node.js is awesome!';
const logDump = {
  foo: 'bar',
  fooObj: {
    name: "john"
  },
  fooArr: [
    "apple", "orange"
  ]
};

console.log('Testing logger module...');
console.log();

console.log('Type: Info');
logger.log({ type: 'I', msg: logStr });
console.log('Type: Info, shorthand method');
logger.i(logStr);
console.log('');

console.log('Type: Error');
logger.log({ type: 'E', msg: logStr });
console.log('Type: Error, shorthand method');
logger.e(logStr);
console.log('');

console.log('Type: Verbose, with data dump');
logger.log({ type: 'V', msg: logStr, dump: logDump });
console.log('Type: Verbose, with data dump, shorthand method');
logger.v(logStr, logDump)
console.log('');
