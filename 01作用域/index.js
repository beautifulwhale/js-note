// for (var i = 0; i < 10; i++) {
//     console.log(i);
// }

// try catch 中catch会创建一个块级作用域
// try {
//     undefined();
// } catch (error) {
//     console.log("err", error);
// }

// console.log(error);

// function foo() {
//     console.log("foo");
// }
// var a = true;
// if (a) {
//     function foo() {
//         console.log("a");
//     }
// } else {
//     function foo() {
//         console.log("b");
//     }
// }
// foo();

// var n = 10;
// function fn() {
//     var n = 20;
//     function f() {
//         n++;
//         console.log(n);
//     }
//     f();
//     return f;
// }

// var x = fn(); // 21
// x(); // 22
// x(); // 23
// console.log(n); // 10

// var data = [];

// for (var i = 0; i < 3; i++) {
//   data[i] = function () {
//     console.log(i);
//   };
// }

// data[0]();
// data[1]();
// data[2](); // 3 3 3

// var result = [];
// var a = 3; //
// var total = 0;

// function foo(a) {
//     for (let i = 0; i < 3; i++) {
//         result[i] = function () {
//             total += i * a;
//             console.log(total);
//         };
//     }
// }

// foo(1);
// result[0](); // 0
// result[1](); // 1
// result[2](); // 3
