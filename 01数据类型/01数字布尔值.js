// null 和 undefined 的区别示例

/**
 * 总结
 * 1. undefined 是未定义,变量声明但未赋值时的默认值
 * 2. null 是一个表示"空"的对象,需要主动设置
 * 3. 函数参数未传值时是 undefined
 * 4. 对象中不存在的属性返回 undefined
 * 5. null 是原型链的终点
 * 6. typeof 的区别
 * 7. 相等性判断
 */

// 1. undefined 是未定义,变量声明但未赋值时的默认值
let a;
console.log(a); // undefined

// 2. null 是一个表示"空"的对象,需要主动设置
let b = null;
console.log(b); // null

// 3. 函数参数未传值时是 undefined
function test(param) {
    console.log(param); // undefined
}
test();

// 4. 对象中不存在的属性返回 undefined
const obj = {};
console.log(obj.name); // undefined

// 5. null 是原型链的终点
console.log(Object.getPrototypeOf(Object.prototype)); // null

// 6. typeof 的区别
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"

// 7. 相等性判断
console.log(null == undefined); // true (宽松相等)
console.log(null === undefined); // false (严格相等)

/**
 * 布尔值规则:
 * 1. 布尔值只有两个值: true 和 false
 * 2. 布尔值可以由条件表达式返回,也可以通过显式转换得到
 * 3. 布尔值可以参与数值运算,0 和 NaN 除外
 * 4. 布尔值可以转换为数值,true 转换为 1,false 转换为 0
 */

// 8. 布尔值 只有0 NaN "" null undefined false 会转换为 false,其他都会转换为 true
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(false)); // false
console.log(Boolean({})); // true
console.log(Boolean([])); // true
console.log(Boolean(function () {})); // true

// 9. 数值

// 整数与浮点数运算示例
console.log(1 + 2); // 3
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// JavaScript 中的数值范围
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// 精度问题解决方案
// 1. 使用 toFixed() 进行四舍五入
console.log((0.1 + 0.2).toFixed(1)); // "0.3"

// 2. 将小数转为整数计算后再转回小数
function accurateAdd(num1, num2) {
    const base = Math.pow(
        10,
        Math.max(
            num1.toString().split(".")[1]?.length || 0,
            num2.toString().split(".")[1]?.length || 0
        )
    );
    return (num1 * base + num2 * base) / base;
}
console.log(accurateAdd(0.1, 0.2)); // 0.3

// 3. 处理大数运算，使用 BigInt
const bigNum1 = 9007199254740991n; // 使用n后缀声明 BigInt
const bigNum2 = BigInt(9007199254740991); // 或使用 BigInt() 构造函数
console.log(bigNum1 + bigNum2); // 18014398509481982n

// 4. 对于需要高精度计算的场景（如金融计算），建议使用专门的库
// 例如：decimal.js, big.js 等
// 示例代码（需要先安装相关库）：
// const Decimal = require('decimal.js');
// const result = new Decimal('0.1').plus('0.2');
// console.log(result.toString()); // "0.3"

// 10.特殊数值讨论

// 1. 正零和负零
console.log(+0 === -0); // true - JavaScript 认为它们相等
console.log(Object.is(+0, -0)); // false - Object.is 可以区分它们
console.log(1 / +0); // Infinity
console.log(1 / -0); // -Infinity

// 2. NaN (Not a Number)
console.log(NaN === NaN); // false - NaN 不等于任何值，包括它自己
console.log(Object.is(NaN, NaN)); // true
console.log(isNaN(NaN)); // true
console.log(Number.isNaN(NaN)); // true
console.log(0 / 0); // NaN
console.log("hello" * 5); // NaN
console.log(Math.sqrt(-1)); // NaN

// 3. Infinity 和 -Infinity
console.log(Infinity > Number.MAX_VALUE); // true
console.log(-Infinity < -Number.MAX_VALUE); // true
console.log(Infinity + Infinity); // Infinity
console.log(-Infinity + -Infinity); // -Infinity
console.log(Infinity - Infinity); // NaN
console.log(Infinity * Infinity); // Infinity
console.log(Infinity / Infinity); // NaN

// 4. 特殊值的运算规则
console.log(1 + NaN); // NaN - 任何数与 NaN 运算都得到 NaN
console.log("@", Infinity + -Infinity); // NaN
console.log(1 / Infinity); // 0
console.log(1 / -Infinity); // -0
console.log("&", 0 * Infinity); // NaN
console.log(Infinity / 0); // Infinity

// 5. 特殊值的判断
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(-Infinity)); // false
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite(0)); // true

// 6. 特殊值在实际应用中的例子
function divideNumbers(a, b) {
    if (b === 0) {
        return "除数不能为0";
    }
    const result = a / b;
    if (Number.isNaN(result)) {
        return "无效的运算";
    }
    if (!Number.isFinite(result)) {
        return "结果超出可表示范围";
    }
    return result;
}

console.log(divideNumbers(10, 2)); // 5
console.log(divideNumbers(10, 0)); // "除数不能为0"
console.log(divideNumbers(0, 0)); // "无效的运算"
console.log(divideNumbers(Number.MAX_VALUE, Number.MIN_VALUE)); // "结果超出可表示范围"

// 7. parseInt 和 parseFloat 函数详解

// parseInt 基本用法
console.log(parseInt("123")); // 123
console.log(parseInt("12.34")); // 12 - 只解析整数部分
console.log(parseInt("abc")); // NaN - 无法解析非数字字符串
console.log(parseInt("123abc")); // 123 - 解析到非数字字符停止

// parseInt 带基数参数
console.log(parseInt("1010", 2)); // 10 - 将二进制字符串转为十进制
console.log(parseInt("ff", 16)); // 255 - 将十六进制字符串转为十进制
console.log(parseInt("123", 8)); // 83 - 将八进制字符串转为十进制
console.log(parseInt("123", 37)); // NaN - 基数超出范围(2-36)

// parseFloat 基本用法
console.log(parseFloat("123.456")); // 123.456
console.log(parseFloat("12.34.56")); // 12.34 - 只解析第一个小数点
console.log(parseFloat("abc")); // NaN - 无法解析非数字字符串
console.log(parseFloat("123.456abc")); // 123.456 - 解析到非数字字符停止

// 特殊情况处理
console.log(parseInt("")); // NaN - 空字符串
console.log(parseFloat("")); // NaN - 空字符串
console.log(parseInt("0xf")); // 15 - 自动识别十六进制
console.log(parseFloat("1.2e-2")); // 0.012 - 支持科学计数法
console.log(parseInt("  123  ")); // 123 - 自动去除首尾空格
console.log(parseFloat("  123.45  ")); // 123.45 - 自动去除首尾空格

// 实际应用示例
function convertToNumber(value, requireInteger = false) {
    if (typeof value !== "string") {
        return "请输入字符串";
    }

    const num = requireInteger ? parseInt(value) : parseFloat(value);

    if (Number.isNaN(num)) {
        return "无法转换为数字";
    }

    return num;
}

console.log(convertToNumber("123.45")); // 123.45
console.log(convertToNumber("123.45", true)); // 123
console.log(convertToNumber("abc")); // "无法转换为数字"

