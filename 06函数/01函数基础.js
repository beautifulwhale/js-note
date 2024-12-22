/**
 * JavaScript中的函数基础知识
 *
 * 函数是JavaScript中的一等公民，是一种可以被调用的代码块。函数可以接受参数，并返回一个值。函数的定义和调用是JavaScript编程的基础。
 *
 * 1. 函数的定义
 * 在JavaScript中，可以通过多种方式定义函数，包括函数声明、函数表达式、箭头函数等。
 */

// 1.1 函数声明
// 使用function关键字定义一个函数
function add(a, b) {
    return a + b;
}
console.log(add(2, 3)); // 5

// 1.2 函数表达式
// 将一个函数赋值给变量
const subtract = function (a, b) {
    return a - b;
};
console.log(subtract(5, 2)); // 3

// 1.3 箭头函数
// 使用箭头函数定义一个函数
const multiply = (a, b) => a * b;
console.log(multiply(2, 3)); // 6

/**
 * 2. 函数参数
 * 函数可以接受参数，并在函数体内使用这些参数。JavaScript中的函数参数是动态类型的，可以是任何类型的值。
 */

// 2.1 默认参数
// 可以为函数参数设置默认值
function greet(name = "World") {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, World!
greet("Alice"); // Hello, Alice!

// 2.2 剩余参数
// 使用剩余参数语法，可以将不定数量的参数收集到一个数组中
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

/**
 * 3. 函数返回值
 * 函数可以返回一个值，使用return关键字。如果没有显式返回值，函数会返回undefined。
 */

// 3.1 返回单个值
function square(x) {
    return x * x;
}
console.log(square(4)); // 16

// 3.2 返回多个值
// 可以通过返回一个对象或数组来返回多个值
function getCoordinates() {
    return { x: 10, y: 20 };
}
const { x, y } = getCoordinates();
console.log(x, y); // 10 20

/**
 * 4. 函数作用域
 * 函数在定义时会创建一个新的作用域，函数内部定义的变量在函数外部无法访问。
 */

function scopeExample() {
    const localVar = "I am local";
    console.log(localVar); // I am local
}
scopeExample();
// console.log(localVar); // Uncaught ReferenceError: localVar is not defined

/**
 * 5. 闭包
 * 闭包是指函数可以访问其外部作用域的变量，即使在函数外部调用时。闭包是JavaScript中强大的特性，常用于数据封装和函数工厂。
 */

function createCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

/**
 * 6. 高阶函数
 * 高阶函数是指接受函数作为参数或返回一个函数的函数。高阶函数在JavaScript中广泛用于函数式编程。
 */

function applyOperation(a, b, operation) {
    return operation(a, b);
}
console.log(applyOperation(2, 3, add)); // 5
console.log(applyOperation(5, 2, subtract)); // 3

/**
 * 7. 函数的属性
 * 函数也是对象，因此可以有自己的属性和方法。常见的函数属性包括length、name和prototype。
 */

function exampleFunction(a, b, c) {}
console.log(exampleFunction.length); // 3，表示函数的参数个数
console.log(exampleFunction.name); // exampleFunction，表示函数的名称

/**
 * 8. 立即执行函数表达式（IIFE）
 * IIFE是一种在定义后立即执行的函数，常用于创建独立的作用域，避免全局变量污染。
 */

(function () {
    const message = "IIFE executed";
    console.log(message); // IIFE executed
})();
// IIFE的用途包括：避免全局变量污染、创建独立作用域、封装代码等。

/**
 * 9. 尾调用优化
 * 尾调用是指函数的最后一步是调用另一个函数。尾调用优化是一种通过重用当前函数的调用帧来优化递归调用的方法，减少栈空间的使用。
 */

function factorial(n, acc = 1) {
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc); // 尾调用
}
console.log(factorial(5)); // 120

/**
 * 10. 递归
 * 递归是指函数调用自身的编程技巧。递归常用于解决分治问题、遍历数据结构等。
 */

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2); // 递归调用
}
console.log(fibonacci(5)); // 5

/**
 * 11. 函数的私有属性
 * 在JavaScript中，函数的私有属性可以通过闭包来实现。闭包是一种函数与其词法环境的组合，使得函数可以访问其外部作用域中的变量，即使在该函数执行完毕后。
 * 通过闭包，可以创建函数的私有属性，使得这些属性只能在函数内部访问，无法从外部直接访问。
 */

function createCounter() {
    let count = 0; // 私有属性

    return {
        increment: function () {
            count++;
            console.log(count);
        },
        decrement: function () {
            count--;
            console.log(count);
        },
        getCount: function () {
            return count;
        },
    };
}

const counter_new = createCounter();
counter_new.increment(); // 1
counter_new.increment(); // 2
counter_new.decrement(); // 1
console.log(counter_new.getCount()); // 1
// 无法直接访问count
// console.log(counter_new.count); // undefined
