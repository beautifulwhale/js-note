/**
 * JavaScript 算术运算符详解
 */

// 1. 基本算术运算符
// 1.1 加法运算符 (+)
console.log(5 + 3); // 8
console.log(0.1 + 0.2); // 0.30000000000000004 (浮点数精度问题)
// 字符串拼接
console.log("Hello " + "World"); // "Hello World"
// 对象相加会先调用valueOf或toString
const obj1 = {
    valueOf() {
        return 1;
    },
};
const obj2 = {
    toString() {
        return "2";
    },
};
console.log(obj1 + obj2); // 3 (先调用valueOf,如果不是原始值则调用toString)

// 1.2 减法运算符 (-)
console.log(5 - 3); // 2
// 非数值会被转换为数值
console.log("5" - 3); // 2
console.log('test', [5] - 3); // 2 (数组会先转换为原始值)

// 1.3 乘法运算符 (*)
console.log(5 * 3); // 15
console.log("5" * 3); // 15 (字符串会转换为数值)
console.log(Infinity * 0); // NaN

// 1.4 除法运算符 (/)
console.log(6 / 2); // 3
console.log(5 / 2); // 2.5
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity

// 1.5 取余运算符 (%)
console.log(5 % 2); // 1
console.log(-5 % 2); // -1
console.log(5 % -2); // 1
console.log(Infinity % 2); // NaN

// 1.6 指数运算符 (**)
console.log(2 ** 3); // 8
console.log(2 ** -1); // 0.5
console.log((-2) ** 2); // 4
// console.log(-2 ** 2); // 语法错误,需要加括号

// 2. 一元运算符
// 2.1 一元加法 (+)
console.log(+"3"); // 3 (字符串转数值)
console.log(+true); // 1
console.log(+[]); // 0
console.log(+{}); // NaN

// 2.2 一元减法 (-)
console.log(-"3"); // -3
console.log(-true); // -1
console.log(-[]); // -0

// 3. 自增和自减运算符
let num = 5;
// 3.1 前置递增 (++)
console.log(++num); // 6 (先加后用)
// 3.2 后置递增 (++)
console.log(num++); // 6 (先用后加)
console.log(num); // 7

// 3.3 前置递减 (--)
console.log(--num); // 6 (先减后用)
// 3.4 后置递减 (--)
console.log(num--); // 6 (先用后减)
console.log(num); // 5

// 4. 特殊情况
// 4.1 数组的运算
console.log([1, 2] + [3, 4]); // "1,23,4" (转换为字符串后拼接)
console.log([1] - [2]); // -1 (转换为数值后相减)

// 4.2 对象的运算
const obj3 = {
    valueOf() {
        return 100;
    },
    toString() {
        return "200";
    },
};
const obj4 = {
    toString() {
        return "300";
    },
};
console.log(obj3 + obj4); // 400 (优先调用valueOf)
console.log(obj3 - obj4); // -200

// 4.3 布尔值运算
console.log(true + true); // 2 (转换为数值1后相加)
console.log(true + false); // 1

// 4.4 null和undefined
console.log(1 + null); // 1 (null转换为0)
console.log(1 + undefined); // NaN (undefined转换为NaN)

// 4.5 日期对象
const date = new Date();
console.log(+date); // 时间戳
console.log(date + 1); // 日期字符串拼接1

// 5. 运算符优先级
console.log(2 + 3 * 4); // 14 (乘法优先级高于加法)
console.log((2 + 3) * 4); // 20 (括号提高优先级)
