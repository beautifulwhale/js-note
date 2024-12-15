// ES6 新增的运算符

// 1. 幂运算符 (**)
// 幂运算符用于计算基数的指数次幂。
console.log(2 ** 3); // 输出：8
console.log(4 ** 0.5); // 输出：2

// 2. 指数赋值运算符 (**=)
// 指数赋值运算符用于将右操作数的值作为指数赋值给左操作数。
let a = 2;
a **= 3;
console.log(a); // 输出：8

// 3. 扩展运算符 (...)
// 扩展运算符用于展开数组或对象。
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
console.log(arr2); // 输出：[1, 2, 3, 4, 5, 6]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2); // 输出：{ a: 1, b: 2, c: 3 }

// 4. 剩余参数运算符 (...)
// 剩余参数运算符用于将剩余的参数收集到一个数组中。
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 输出：10

// 5. Nullish 合并运算符 (??)
// Nullish 合并运算符用于在左操作数为 null 或 undefined 时返回右操作数。
const foo = null ?? "default string";
console.log(foo); // 输出：'default string'

const bar = 0 ?? 42;
console.log(bar); // 输出：0

// 6. 可选链运算符 (?.)
// 可选链运算符用于在对象属性或方法不存在时返回 undefined，而不是抛出错误。
const user = {
    name: "Alice",
    address: {
        city: "Wonderland",
    },
};
console.log(user?.address?.city); // 输出：'Wonderland'
console.log(user?.contact?.phone); // 输出：undefined

// 7. 逻辑运算符
// 逻辑运算符用于在多个条件中进行逻辑运算。
const a_ = 1;
const b_ = 2;
// console.log(a_ &&= b_); // 输出：2
// console.log(a_ ||= b_); // 输出：1
console.log(a_ ??= b_); // 输出：1
