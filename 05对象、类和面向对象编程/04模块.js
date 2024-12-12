/**
 * JavaScript中的模块
 *
 * 模块是将代码组织成独立、可重用和可维护的单元的方式。模块化编程有助于提高代码的可读性、可维护性和可测试性。
 * 在JavaScript中，模块可以通过多种方式实现，包括立即执行函数表达式（IIFE）、CommonJS、AMD和ES6模块等。
 */

// 1. 立即执行函数表达式（IIFE）
// IIFE是一种通过函数作用域来实现模块化的方式，可以避免全局变量污染。
const myModule = (function () {
    // 私有变量和方法
    let privateVar = "I am private";
    function privateMethod() {
        console.log(privateVar);
    }

    // 公有变量和方法
    return {
        publicVar: "I am public",
        publicMethod: function () {
            privateMethod();
        },
    };
})();

console.log(myModule.publicVar); // I am public
myModule.publicMethod(); // I am private

// 2. CommonJS
// CommonJS是Node.js中使用的模块系统，通过module.exports和require来导出和导入模块。
/*
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
module.exports = { add, subtract };

// main.js
const math = require("./math");
console.log(math.add(2, 3)); // 5
console.log(math.subtract(5, 2)); // 3
*/

// 3. AMD
// AMD（Asynchronous Module Definition）是一种用于浏览器的模块系统，通过define和require来定义和加载模块。
/*
define("math", [], function () {
    return {
        add: function (a, b) {
            return a + b;
        },
        subtract: function (a, b) {
            return a - b;
        },
    };
});

require(["math"], function (math) {
    console.log(math.add(2, 3)); // 5
    console.log(math.subtract(5, 2)); // 3
});
*/

// 4. ES6模块
// ES6模块是JavaScript的标准模块系统，通过export和import来导出和导入模块。
/*
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from "./math";
console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3
*/

/**
 * 实现一个合理的模块
 *
 * 一个合理的模块应该具有以下特点：
 * 1. 单一职责：每个模块应该只负责一个功能或一组相关的功能。
 * 2. 封装：模块内部的实现细节应该对外部隐藏，只暴露必要的接口。
 * 3. 可重用：模块应该设计为可以在不同的项目或场景中重用。
 * 4. 可测试：模块应该易于测试，最好是独立于其他模块进行测试。
 */

// 例子：实现一个简单的计数器模块
const counterModule = (function () {
    // 私有变量
    let count = 0;

    // 私有方法
    function logCount() {
        console.log(`Current count: ${count}`);
    }

    // 公有方法
    return {
        increment: function () {
            count++;
            logCount();
        },
        decrement: function () {
            count--;
            logCount();
        },
        reset: function () {
            count = 0;
            logCount();
        },
    };
})();

counterModule.increment(); // Current count: 1
counterModule.increment(); // Current count: 2
counterModule.decrement(); // Current count: 1
counterModule.reset(); // Current count: 0

/**
 * 私有属性和方法
 *
 * 在JavaScript中，模块化编程可以通过闭包、Symbol和WeakMap等方式实现私有属性和方法。
 * 1. 闭包：通过函数作用域来实现私有属性和方法。
 * 2. Symbol：使用Symbol来创建唯一的属性名，从而实现私有属性。
 * 3. WeakMap：使用WeakMap来存储私有属性，确保属性只能通过特定对象访问。
 */

// 使用Symbol实现私有属性
const mySymbolModule = (function () {
    const _privateVar = Symbol("privateVar");

    return {
        setPrivateVar: function (value) {
            this[_privateVar] = value;
        },
        getPrivateVar: function () {
            return this[_privateVar];
        },
    };
})();

mySymbolModule.setPrivateVar("I am private");
console.log(mySymbolModule.getPrivateVar()); // I am private

// 使用WeakMap实现私有属性
const myWeakMapModule = (function () {
    const _privateVars = new WeakMap();

    function MyClass() {
        _privateVars.set(this, { privateVar: "I am private" });
    }

    MyClass.prototype.getPrivateVar = function () {
        return _privateVars.get(this).privateVar;
    };

    return MyClass;
})();

const instance = new myWeakMapModule();
console.log(instance.getPrivateVar()); // I am private
