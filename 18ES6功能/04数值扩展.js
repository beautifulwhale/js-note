/**
 * ES6 数值扩展
 *
 * ES6 对数值类型进行了多方面的扩展，使得数值操作更加方便和强大。以下是一些主要的扩展内容：
 *
 * 1. 数值分隔符
 * 2. Number.isNaN()
 * 3. Number.isFinite()
 * 4. Number.isInteger()
 * 5. Number.parseInt() 和 Number.parseFloat()
 * 6. Math 对象的扩展
 * 7. 二进制和八进制表示法
 * 8. Number.EPSILON的引入
 * 9. BigInt 的引入
 */

// 1. 数值分隔符
// 数值分隔符（Numeric Separator）是ES2021引入的一项新特性，用于提高数值的可读性。可以使用下划线（_）作为分隔符，将长数字分隔成更易读的部分。
const largeNumber = 1_000_000; // 1000000
const binaryNumber = 0b1010_0001_1000_0101; // 0b1010000110000101
const hexNumber = 0xa_b_c_d_e_f; // 0xABCDEF
console.log(largeNumber); // 输出 1000000
console.log(binaryNumber); // 输出 41349
console.log(hexNumber); // 输出 11259375

// 2. Number.isNaN()
// 用于判断一个值是否为NaN（Not-a-Number），只有在值为NaN时返回true。
console.log(Number.isNaN(NaN)); // 输出 true
console.log(Number.isNaN(123)); // 输出 false
console.log(Number.isNaN("NaN")); // 输出 false

// 3. Number.isFinite()
// 用于判断一个值是否为有限数值，只有在值为有限数值时返回true。
console.log(Number.isFinite(123)); // 输出 true
console.log(Number.isFinite(Infinity)); // 输出 false
console.log(Number.isFinite("123")); // 输出 false

// Number.isFinite() 与全局的 isFinite() 函数的区别在于：
// 1. 全局的 isFinite() 函数会先将传入的参数转换为一个数值，然后再判断该数值是否为有限数值。
// 2. Number.isFinite() 方法不会进行类型转换，如果传入的参数不是数值类型，则直接返回 false。

console.log(isFinite(123)); // 输出 true
console.log(isFinite("123")); // 输出 true，因为 "123" 会被转换为数值 123
console.log(isFinite("abc")); // 输出 false，因为 "abc" 无法转换为数值

console.log(Number.isFinite(123)); // 输出 true
console.log(Number.isFinite("123")); // 输出 false，因为 "123" 是字符串，不会进行类型转换
console.log(Number.isFinite("abc")); // 输出 false，因为 "abc" 是字符串，不会进行类型转换

// 4. Number.isInteger()
// 用于判断一个值是否为整数，只有在值为整数时返回true。
console.log(Number.isInteger(123)); // 输出 true
console.log(Number.isInteger(123.45)); // 输出 false
console.log(Number.isInteger("123")); // 输出 false

// 5. Number.parseInt() 和 Number.parseFloat()
// Number.parseInt() 用于将字符串解析成整数，Number.parseFloat() 用于将字符串解析成浮点数。
console.log(Number.parseInt("123")); // 输出 123
console.log(Number.parseInt("123.45")); // 输出 123
console.log(Number.parseFloat("123.45")); // 输出 123.45

// 6. Math 对象的扩展
// ES6 为 Math 对象新增了许多方法，用于更方便地进行数学计算。
console.log(Math.trunc(4.9)); // 输出 4，去除小数部分
console.log(Math.sign(-5)); // 输出 -1，判断数字的符号
console.log(Math.cbrt(27)); // 输出 3，计算立方根
console.log(Math.hypot(3, 4)); // 输出 5，计算平方和的平方根

// 7. 二进制和八进制表示法
// ES6 新增了二进制和八进制表示法，用于更方便地表示二进制和八进制数值。
const binaryNumber_new = 0b1010_0001_1000_0101; // 0b1010000110000101
const octalNumber_new = 0o777; // 输出 511
console.log(binaryNumber_new); // 输出 41349
console.log(octalNumber_new); // 输出 511

// 8. Number.EPSILON的引入
// Number.EPSILON 是ES6引入的一个常量，用于表示一个极小的数值，用于处理浮点数精度问题。
console.log(Number.EPSILON); // 输出 2.220446049250313e-16
// Number.EPSILON的使用场景
// Number.EPSILON 是一个极小的数值，用于解决浮点数计算中的精度问题。在进行浮点数比较时，直接比较两个浮点数是否相等可能会导致误差，因此可以使用 Number.EPSILON 来判断两个浮点数是否足够接近。

// 示例：判断两个浮点数是否相等
function isEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // 输出 true
console.log(isEqual(0.1 + 0.2, 0.30000000000000004)); // 输出 true

// 示例：处理浮点数精度问题
const result1 = 0.1 + 0.2;
const result2 = 0.3;
console.log(result1 === result2); // 输出 false，直接比较会有误差
console.log(Math.abs(result1 - result2) < Number.EPSILON); // 输出 true，使用 Number.EPSILON 进行比较

// 结论：
// Number.EPSILON 提供了一种解决浮点数精度问题的方法，通过判断两个浮点数之间的差值是否小于 Number.EPSILON，可以有效避免浮点数比较中的误差。
console.log(Number.EPSILON); // 输出 2.220446049250313e-16

// 9. BigInt 的引入
// BigInt 是ES6引入的一种新的数值类型，用于表示任意大的整数。
const bigInt = 1234567890123456789012345678901234567890n;
console.log(bigInt); // 输出 1234567890123456789012345678901234567890n
// BigInt 的使用场景
// BigInt 主要用于处理超出 Number 类型安全整数范围的数值（即大于 2^53 - 1 或小于 -(2^53 - 1) 的数值）。
// 以下是一些 BigInt 的常见使用场景：

// 1. 处理大整数计算
const largeNumber1 = 1234567890123456789012345678901234567890n;
const largeNumber2 = 9876543210987654321098765432109876543210n;
const sum = largeNumber1 + largeNumber2;
console.log(sum); // 输出 11111111101111111110111111111011111111100n

// 2. 精确表示和计算大整数
const preciseNumber = 9007199254740991n; // 2^53 - 1
const incrementedNumber = preciseNumber + 1n;
console.log(incrementedNumber); // 输出 9007199254740992n

// 3. 处理大整数的比较
const bigInt1 = 1234567890123456789012345678901234567890n;
const bigInt2 = 1234567890123456789012345678901234567891n;
console.log(bigInt1 < bigInt2); // 输出 true

// 4. 与 Number 类型的互操作
const number = 10;
const bigIntNumber = 10n;
console.log(BigInt(number) + bigIntNumber); // 输出 20n

// 注意：BigInt 和 Number 类型不能直接进行算术运算，需要进行类型转换
// console.log(bigIntNumber + number); // 会抛出 TypeError

/**
 * 结论：
 * ES6 新增的数值扩展极大地方便了数值的操作，常用的方法包括数值分隔符、Number.isNaN()、Number.isFinite()、Number.isInteger()、Number.parseInt()、Number.parseFloat() 以及 Math 对象的扩展方法。通过这些扩展，数值的处理变得更加简洁和高效。
 */
