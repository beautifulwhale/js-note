exports.done = false;
var d = require('./d.cjs');
console.log('在 c.js 之中，d.done = %j', d.done); // 3. 在 c.js 之中，d.done = true
exports.done = true;
console.log('c.js 执行完毕'); // 4. c.js 执行完毕 