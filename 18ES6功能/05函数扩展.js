/**
 * ES6 函数扩展
 *
 * ES6 对函数进行了多方面的扩展，使得函数的使用更加灵活和强大。以下是一些主要的扩展内容：
 *
 * 1. 函数参数默认值
 * 2. length 和 name 属性
 * 3. rest 参数
 * 4. 箭头函数
 * 5. 箭头函数中的 this 问题
 * 6. 尾调用与尾递归
 */

// 1. 函数参数默认值
// 函数参数可以设置默认值，当未传入参数时使用默认值。
function greet(name = "世界") {
    console.log(`你好, ${name}!`);
}
greet(); // 输出: 你好, 世界!
greet("小明"); // 输出: 你好, 小明!

// 2. length 和 name 属性
// 函数的 length 属性表示函数形参的个数，name 属性表示函数的名称。length 是不包括默认参数的个数
function example(a, b) {}
console.log(example.length); // 输出: 2
console.log(example.name); // 输出: example

// 3. rest 参数
// rest 参数用于将不定数量的参数收集到一个数组中。
function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 输出: 10

// 4. 箭头函数
// 箭头函数提供了一种更简洁的函数定义方式。
const add = (a, b) => a + b;
console.log(add(2, 3)); // 输出: 5

// 5. 箭头函数中的 this 问题
// 箭头函数不会创建自己的 this，而是继承外部函数的 this。
const obj = {
    value: 42,
    getValue: function () {
        return () => this.value; // 使用箭头函数
    },
};
const getValue = obj.getValue();
console.log(getValue()); // 输出: 42

// 6. 尾调用与尾递归
// 尾调用是指在函数的最后一步调用另一个函数，尾递归是尾调用的特殊情况。
// 尾调用优化（Tail Call Optimization, TCO）是指在某些情况下，编译器或解释器可以优化尾调用，避免增加调用栈的深度，从而提高性能。
// 原理分析：
// 当一个函数调用另一个函数作为它的最后一步时，当前函数的上下文可以被丢弃，因为不再需要返回到当前函数。这意味着可以重用当前函数的调用栈帧，而不是在调用另一个函数时创建新的栈帧。
// 这样做的好处是可以有效地防止栈溢出，尤其是在递归调用的情况下，允许更深的递归而不会消耗过多的内存。
// 尾递归是尾调用的一种特殊情况，指的是函数直接调用自身作为最后一步，利用尾调用优化可以使递归变得更加高效。
function factorial(n, acc = 1) {
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc); // 尾递归
}
console.log(factorial(5)); // 输出: 120

/**
 * 结论：
 * ES6 对函数的扩展使得函数的定义和使用更加灵活，提供了默认参数、rest 参数、箭头函数等新特性，极大地提高了代码的可读性和可维护性。
 */
