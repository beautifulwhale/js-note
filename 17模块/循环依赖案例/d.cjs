exports.done = false;
var c = require('./c.cjs');
console.log('在 d.js 之中，c.done = %j', c.done);  // 1. 在 d.js 之中，c.done = false
exports.done = true;
console.log('d.js 执行完毕'); // 2. d.js 执行完毕