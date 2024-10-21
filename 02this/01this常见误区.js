/**
 * 误区1: this 指向调用的函数本身
 * 误区2: this 指向函数的作用域
 * 正解: this 跟词法作用域没有任何关系,跟执行位置相关,函数执行的时候会创建一个上下文,会包括this对象
 */

function foo(num) {
    console.log("foo: " + num);
    // 记录foo被调用的次数
    // 注意，在当前的调用方式下（参见下方代码） ，this确实指向foo
    this.count++;
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
    if (i > 5) {
        // foo(i); // foo.count 为0; 证明误区1错误
        // 使用call(..)可以确保this指向函数对象foo本身
        foo.call(foo, i); // 4
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo被调用了多少次？
console.log(foo.count); // 4

// 误区2佐证:
// function foo() {
//     var a = 2;
//     this.bar();
// }
// function bar() {
//     console.log(this.a); // undefined 并不是2
// }
// foo();
