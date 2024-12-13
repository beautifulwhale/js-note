/**
 * let、const、var的区别
 *
 * 1. 变量提升（Hoisting）
 *    - var：变量声明会被提升到所在作用域的顶部，但不会初始化，初始化会留在原来的位置。
 *    - let和const：不会被提升到作用域的顶部，声明之前使用会导致ReferenceError。
 *
 * 2. 暂时性死区（Temporal Dead Zone, TDZ）
 *    - let和const：在块级作用域内，从进入作用域到声明变量之间的区域称为暂时性死区，访问会导致ReferenceError。
 *    - var：不存在暂时性死区，可以在声明之前访问，值为undefined。
 *
 * 3. 不允许重复命名
 *    - let和const：在同一作用域内不允许重复声明同名变量。
 *    - var：允许重复声明同名变量，后声明的变量会覆盖前面的变量。
 *
 * 4. 块级作用域（Block Scope）
 *    - let和const：具有块级作用域，即在一对花括号{}内声明的变量只在花括号内有效。
 *    - var：没有块级作用域，只有函数作用域，即在函数内声明的变量在整个函数内有效。
 *
 * 5. 变量的可变性
 *    - let：声明的变量可以重新赋值。
 *    - const：声明的变量是常量，不能重新赋值。
 *    - var：声明的变量可以重新赋值。
 *
 * 块级作用域的作用：
 * 块级作用域解决了使用var声明变量时，变量提升和作用域污染的问题。使用let和const可以更好地控制变量的作用范围，避免变量在不该被访问的地方被访问，从而提高代码的可维护性和可读性。
 *
 * globalThis：
 * globalThis是ES2020引入的一个全局对象，它提供了一种标准的方式来访问不同环境下的全局对象。在浏览器中，globalThis等同于window；在Node.js中，globalThis等同于global。使用globalThis可以编写与环境无关的代码。
 */

// 示例代码
{
    let a = 10;
    const b = 20;
    var c = 30;

    console.log(a); // 10
    console.log(b); // 20
    console.log(c); // 30
}

// console.log(a); // ReferenceError: a is not defined
// console.log(b); // ReferenceError: b is not defined
console.log(c); // 30

// 暂时性死区示例
{
    // console.log(x); // ReferenceError: x is not defined
    let x = 10;
}

// 不允许重复命名示例
{
    let y = 10;
    // let y = 20; // SyntaxError: Identifier 'y' has already been declared
}

// globalThis示例
console.log(globalThis);

// for循环中的let和var的区别示例
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(`let i: ${i}`); // 输出 0, 1, 2
    }, 1000);
}

for (var j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log(`var j: ${j}`); // 输出 3, 3, 3
    }, 1000);
}

// 解释：
// 在第一个for循环中，使用let声明的变量i具有块级作用域。每次迭代时，i都是一个新的变量，因此setTimeout回调函数中引用的i是当前迭代的i值。
// 在第二个for循环中，使用var声明的变量j没有块级作用域，只有函数作用域。每次迭代时，j都是同一个变量，因此setTimeout回调函数中引用的j是循环结束后的j值，即3。

// 结论：
// 使用let声明的变量在块级作用域内有效，可以避免变量提升和作用域污染的问题，更适合在循环中使用。
// 使用var声明的变量在函数作用域内有效，容易导致变量提升和作用域污染的问题，不推荐在循环中使用。
