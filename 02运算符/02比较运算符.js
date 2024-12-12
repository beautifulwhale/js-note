// 1. 比较运算符
// 1.1 大于(>)、小于(<)、大于等于(>=)、小于等于(<=)
console.log(5 > 3); // true
console.log(5 < 3); // false
console.log(5 >= 5); // true
console.log(3 <= 2); // false

// 1.2 字符串比较 - 按字典序比较
console.log("apple" < "banana"); // true (字典序比较)
console.log("12" < "2"); // true (字典序比较)
console.log("12" < 2); // false (数值比较,字符串会转换为数值)

// 1.3 不同类型比较
// 数值和字符串比较时,字符串会转换为数值
console.log(5 > "3"); // true
console.log("10" > 5); // true

// 对象比较时会调用valueOf()或toString()
const obj1 = {
    valueOf() {
        return 10;
    },
};
const obj2 = {
    valueOf() {
        return 5;
    },
};
console.log(obj1 > obj2); // true
const obj7 = {};
const obj8 = {};
console.log("test: ", obj7 == obj8, obj7 == 0); // false (不同引用)

// 2. 相等运算符
// 2.1 相等(==)和不相等(!=) - 会进行类型转换
console.log(5 == "5"); // true
console.log(1 == true); // true
console.log(null == undefined); // true
console.log("xxx", [] == false); // true
console.log({} == false); // false
console.log([1, 2] == "1,2"); // true

// 2.2 严格相等(===)和严格不相等(!==) - 不进行类型转换
console.log(5 === "5"); // false
console.log(1 === true); // false
console.log(null === undefined); // false
console.log([] == false); // false

// 2.3 对象比较 - 比较引用
const obj3 = { name: "test" };
const obj4 = { name: "test" };
const obj5 = obj3;

console.log(obj3 == obj4); // false (不同引用)
console.log(obj3 === obj4); // false (不同引用)
console.log(obj3 === obj5); // true (相同引用)

// 3. 相等运算符的转换规则
// 3.1 null和undefined
console.log(null == undefined); // true
console.log(null === undefined); // false

// 3.2 数字和字符串
console.log(123 == "123"); // true (字符串转换为数字)
console.log(0 == ""); // true (空字符串转换为0)

// 3.3 布尔值
console.log(true == 1); // true (布尔值转换为数字)
console.log(false == 0); // true
console.log(true == "1"); // true

// 3.4 对象与原始类型
console.log([1] == 1); // true (数组转换为原始值)
console.log([1, 2] == "1,2"); // true (数组转换为字符串)

const obj6 = {
    valueOf() {
        return 123;
    },
    toString() {
        return "456";
    },
};
console.log(obj6 == 123); // true (优先调用valueOf)

// 4. 特殊情况
console.log(NaN == NaN); // false (NaN不等于任何值,包括自身)
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true (使用Object.is判断NaN)

console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false (可以区分+0和-0)

// 5. 实际应用建议
// 5.1 优先使用===进行比较,避免隐式类型转换
// 5.2 比较对象时注意引用问题
// 5.3 使用Object.is处理特殊数值比较
// 5.4 数组或对象的内容比较,可以使用JSON.stringify或专门的深比较函数
console.log(JSON.stringify(obj3) === JSON.stringify(obj4)); // true (内容相同)
