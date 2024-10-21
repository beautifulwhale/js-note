/**
 * 1. 默认绑定: 非严格模式下指向全局变量window, 严格模式下是undefined  优先级No.4
 */

function foo() {
    // "use strict";
    console.log(this.a);
}

var a = 2;

(function () {
    "use strict";
    foo(); // 2  注意: 与函数调用位置的严格模式无语, 只与调用的函数相关
})();
// foo();

/**
 * 2. 隐式绑定: 跟调用位置的对象有关,会使用对象的上下文来引用函数,同时需要注意隐式丢失问题, 即采用默认绑定  优先级No.3
 */

function bar() {
    console.log(this.name);
}

const obj = {
    name: "xiaoming",
    bar: bar,
};

var name = "xiaozhang";
obj.bar(); // xiaoming

// 隐式丢失:
var baz = obj.bar;
baz(); // xiaozhang 由于这个函数只是bar函数的引用, 并且调用的位置是默认绑定的方式调用的

// 回调函数也可以造成隐式丢失:
function doBar(fn) {
    fn(); // xiaozhang  fn也只是bar函数的引用
}
doBar(obj.bar);

/**
 * 3. 显示绑定 call/apply/bind  优先级No.2
 */
function foo() {
    console.log(this.a);
}
var o = { a: 1 };
var a = 2;

// foo();
foo.call(o);
foo.call(null) // 2 绑定为null 会忽略
foo.apply(o);
var bindFoo = foo.bind(o);
bindFoo();

/**
 * 4. new 绑定  优先级No.1
 */
