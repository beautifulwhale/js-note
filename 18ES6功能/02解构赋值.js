/**
 * 解构赋值（Destructuring Assignment）
 *
 * 解构赋值是一种从数组或对象中提取数据，并将其赋值给变量的语法。它使得从复杂的数据结构中提取数据变得更加简洁和易读。
 */

// 1. 数组解构赋值
const array = [1, 2, 3, 4];
const [a, b, c, d] = array;
console.log(a, b, c, d); // 输出 1 2 3 4

// 2. 对象解构赋值
const obj = { name: "Alice", age: 25, city: "New York" };
const { name, age, city } = obj;
console.log(name, age, city); // 输出 Alice 25 New York

// 3. 基本数据类型解构赋值
const str = "hello";
const [h, e, l1, l2, o] = str;
console.log(h, e, l1, l2, o); // 输出 h e l l o

// 4. 嵌套解构赋值
const nestedObj = { a: { b: { c1: 1 } } };
const {
    a: {
        b: { c1 },
    },
} = nestedObj;
console.log(c1); // 输出 1

const nestedArray = [1, [2, [3, 4]]];
const [x, [y, [z, w]]] = nestedArray;
console.log(x, y, z, w); // 输出 1 2 3 4

// 5. 解构赋值的默认值
const [p = 10, q = 20] = [undefined, 30];
console.log(p, q); // 输出 10 30

const { foo = "defaultFoo", bar = "defaultBar" } = { foo: "customFoo" };
console.log(foo, bar); // 输出 customFoo defaultBar

// 6. 解构赋值的边界情况
const [m, n] = [1];
console.log(m, n); // 输出 1 undefined

const { key1, key2 } = { key1: "value1" };
console.log(key1, key2); // 输出 value1 undefined

// 6.1 从 undefined 解构
// 当解构赋值的右侧是 undefined 时，变量会被赋予默认值（如果有默认值的话），否则变量的值为 undefined。
const [u = 5] = [undefined];
console.log(u); // 输出 5

const { v = 10 } = { v: undefined };
console.log(v); // 输出 10

// 6.2 从 null 解构
// 当解构赋值的右侧是 null 时，变量会被赋予默认值（如果有默认值的话），否则变量的值为 null。
const [w_new = 5] = [null];
console.log(w_new); // 输出 null

const { x_new = 10 } = { x_new: null };
console.log(x_new); // 输出 null

// 解释：
// 在解构赋值中，undefined 会触发默认值，而 null 不会触发默认值。
// 因此，当解构赋值的右侧是 undefined 时，变量会被赋予默认值（如果有默认值的话），否则变量的值为 undefined。
// 而当解构赋值的右侧是 null 时，变量会被赋予 null，即使有默认值也不会触发。

// 7. 解构赋值的应用场景
// 7.1 交换变量值
let var1 = 1;
let var2 = 2;
[var1, var2] = [var2, var1];
console.log(var1, var2); // 输出 2 1

// 7.2 从函数返回值中解构
function getCoordinates() {
    return [10, 20];
}
const [xCoord, yCoord] = getCoordinates();
console.log(xCoord, yCoord); // 输出 10 20

// 7.3 提取对象中的部分属性
const user = { id: 1, username: "user1", email: "user1@example.com" };
const { id, username } = user;
console.log(id, username); // 输出 1 user1

// 7.4 处理函数参数
function printUser({ id, username }) {
    console.log(`ID: ${id}, Username: ${username}`);
}
printUser(user); // 输出 ID: 1, Username: user1

// 7.5 设置函数参数的默认值
function multiply([a = 1, b = 1] = []) {
    return a * b;
}
console.log(multiply([2, 3])); // 输出 6
console.log(multiply([2])); // 输出 2
console.log(multiply()); // 输出 1

// 结论：
// 解构赋值是一种强大的语法，可以简化从数组和对象中提取数据的过程。它在处理嵌套数据结构、设置默认值、交换变量值、提取对象属性和处理函数参数等方面非常有用。
