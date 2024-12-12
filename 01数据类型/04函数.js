/**
 * JavaScript 函数详解
 */

// 1. 函数声明的几种方式
// 1.1 函数声明
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

// 1.2 函数表达式
const greet = function (name) {
    console.log(`Hi, ${name}!`);
};

// 1.3 箭头函数
const welcome = (name) => {
    console.log(`Welcome, ${name}!`);
};

// 2. 函数是第一等公民
// 2.1 函数可以赋值给变量
const myFunc = sayHello;

// 2.2 函数可以作为参数传递
function executeFunction(fn, param) {
    fn(param);
}
executeFunction(sayHello, "张三");

// 2.3 函数可以作为返回值
function createGreeter(prefix) {
    return function (name) {
        console.log(`${prefix}, ${name}!`);
    };
}
const morningGreeter = createGreeter("早上好");
morningGreeter("李四");

// 3. 函数作用域与全局作用域
var globalVar = "我是全局变量";

function scopeDemo() {
    var localVar = "我是局部变量";
    console.log(globalVar); // 可以访问全局变量
    console.log(localVar); // 可以访问局部变量
}

// console.log(localVar); // 报错:无法访问局部变量

// 4. 函数的属性和方法
function propertyDemo(a, b, c) {
    console.log(arguments.length);
    console.log(propertyDemo.name);
    console.log(propertyDemo.length);
    console.log(arguments.callee === propertyDemo);
    // console.log(propertyDemo.toString());
}

propertyDemo(1, 2);

// 4.1 call、apply、bind方法
const person = {
    name: "王五",
    greet: function () {
        console.log(`你好,我是${this.name}`);
    },
};

const anotherPerson = {
    name: "赵六",
};

person.greet.call(anotherPerson); // 改变this指向
person.greet.apply(anotherPerson); // 改变this指向
const boundGreet = person.greet.bind(anotherPerson); // 返回新函数
boundGreet();

// 5. 函数参数
// 5.1 默认参数
function multiply(a, b = 1) {
    return a * b;
}
console.log(multiply(5)); // 5
console.log(multiply(5, 2)); // 10

// 5.2 剩余参数
function sum(...rest) {
    console.log("rest: ", rest, Array.isArray(rest));
    return rest.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 5.3 参数解构
function printUserInfo({ name, age, city = "未知" }) {
    console.log(`姓名:${name}, 年龄:${age}, 城市:${city}`);
}
printUserInfo({ name: "张三", age: 25 });

// 6. 闭包示例
// 6.1 计数器闭包
// 闭包位置: 返回的对象中的方法可以访问外部函数的count变量
// 原因: increment和decrement方法形成了对count的闭包,使count变量持续存在
function createCounter() {
    let count = 0;
    return {
        get: () => count,
        increment: () => count++,
        decrement: () => count--,
    };
}

// 6.2 函数工厂闭包
// 闭包位置: 返回的函数可以访问外部参数message
// 原因: 内部函数保持了对外部参数的引用
function makeGreeting(message) {
    return function (name) {
        return message + " " + name;
    };
}
const sayHello_new = makeGreeting("你好");
const sayBye = makeGreeting("再见");

// 6.3 私有变量闭包
// 闭包位置: 返回的方法可以访问私有变量_balance
// 原因: 通过闭包实现数据私有化,外部无法直接访问_balance
function createBankAccount(initialBalance) {
    let _balance = initialBalance;
    return {
        deposit: (amount) => {
            _balance += amount;
        },
        withdraw: (amount) => {
            _balance -= amount;
        },
        getBalance: () => _balance,
    };
}

// 6.4 函数缓存(记忆化)闭包
// 闭包位置: 返回的函数可以访问cache对象
// 原因: 利用闭包特性缓存计算结果
function memoize(fn) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];
        }
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

// 6.5 模块化闭包
// 闭包位置: 返回的公共API可以访问私有变量和方法
// 原因: 利用闭包实现模块私有成员
const calculator = (function () {
    let result = 0;
    function add(x) {
        result += x;
    }
    function subtract(x) {
        result -= x;
    }

    return {
        add: add,
        subtract: subtract,
        getResult: () => result,
    };
})();

// 6.6 循环中的闭包
// 闭包位置: setTimeout的回调函数访问循环变量i
// 原因: 使用let创建块级作用域,每次迭代都会创建新的变量环境
function setupHandlers() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    }
}
setupHandlers();

// 6.7 柯里化闭包
// 闭包位置: 返回的函数可以访问已传入的参数
// 原因: 通过闭包保存部分参数
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

// 7. 容易误认为是闭包的案例
// 7.1 全局变量引用
// 不是闭包: 函数访问的是全局作用域的变量
var count = 0;
function increment() {
    count++;
    console.log(count);
}

// 7.2 this指向
// 不是闭包: this的值由调用方式决定,不是词法作用域
const obj = {
    value: 1,
    getValue: function () {
        return this.value;
    },
};

// 7.3 普通的嵌套函数
// 不是闭包: 内部函数没有持有外部函数的变量
function outer() {
    const x = 1;
    function inner(y) {
        return y + 2; // 只使用参数y,没有使用外部变量x
    }
    return inner(2);
}

// 7.4 立即执行函数(IIFE)
// 不一定是闭包: 如果IIFE内部没有持有外部变量的引用
var closureFunction = (function () {
    const temp = "临时变量";
    return function (i) {
        console.log(temp, i);
    };
})();

closureFunction(5); // 输出: 临时变量 2
