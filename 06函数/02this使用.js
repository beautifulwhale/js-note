/**
 * this的实质
 *
 * this是JavaScript中的一个关键字，它的值是在函数执行时确定的，指向调用函数的对象。
 * this的值取决于函数的调用方式，而不是函数定义的位置。
 */

// 判断this的几种方式

// 1. 作为对象的方法调用
// 当函数作为对象的方法调用时，this指向该对象。
const person1 = {
    name: "Alice",
    greetMethod: function () {
        console.log(this.name);
    },
};
person1.greetMethod(); // this指向person1，输出"Alice"

// 2. 作为普通函数调用
// 当函数作为普通函数调用时，this指向全局对象（在浏览器中是window，在Node.js中是global）。
// 在严格模式下，this为undefined。
function globalGreet() {
    console.log(this);
}
globalGreet(); // 在非严格模式下，this指向window；在严格模式下，this为undefined

// 3. 作为构造函数调用
// 当函数作为构造函数调用时，this指向新创建的实例对象。
function PersonConstructor(name) {
    this.name = name;
}
const personInstance = new PersonConstructor("Bob"); // this指向新创建的实例对象personInstance

// 4. 使用call、apply或bind调用
// 使用call、apply或bind方法调用函数时，this指向指定的对象。
function greetWithName() {
    console.log(this.name);
}
const person2 = { name: "Charlie" };
greetWithName.call(person2); // this指向person2，输出"Charlie"

// 使用this时的注意点

// 1. 确保this指向正确的对象，避免在回调函数中丢失this。
// 举例说明该注意点
// 在回调函数中丢失this的例子：
const person3 = {
    name: "David",
    greet: function () {
        setTimeout(function () {
            console.log(this.name); // this指向全局对象，输出undefined
        }, 1000);
    },
};
person3.greet();

// 解决方法：使用箭头函数
const person4 = {
    name: "Eve",
    greetWithArrow: function () {
        setTimeout(() => {
            console.log(this.name); // this指向person4，输出"Eve"
        }, 1000);
    },
};
person4.greetWithArrow();

// 2. 在事件处理函数中，this指向触发事件的元素。
// 举例说明在事件处理函数中，this指向触发事件的元素
const button = document.createElement("button");
button.textContent = "Click me";
button.addEventListener("click", function () {
    console.log(this); // this指向触发事件的元素，即button
    console.log(this.textContent); // 输出"Click me"
});
document.body.appendChild(button);

// 3. 在箭头函数中，this继承自外层作用域。
// 举例说明在箭头函数中，this继承自外层作用域
const person5 = {
    name: "Frank",
    greet: function () {
        const innerFunction = () => {
            console.log(this.name); // this继承自外层作用域，指向person5，输出"Frank"
        };
        innerFunction();
    },
};
person5.greet();

// this的优先级

// 在JavaScript中，this的指向有四种主要的优先级：
// 1. new绑定
// 2. 显式绑定（call、apply、bind）
// 3. 隐式绑定（对象调用）
// 4. 默认绑定（全局对象或undefined）
// 优先级顺序
// 当多种绑定方式同时存在时，优先级顺序如下：
// new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

// 示例
function example() {
    console.log(this.name);
}
const obj3 = { name: "Eve", example: example };
const obj4 = { name: "Frank" };

obj3.example(); // 隐式绑定，输出"Eve"
obj3.example.call(obj4); // 显式绑定，输出"Frank"
const boundExample = obj3.example.bind(obj4);
boundExample(); // 显式绑定，输出"Frank"

const newExample = new example(); // new绑定，输出undefined（新对象没有name属性）
console.log(newExample);

// 绑定this的三个函数及如何手写这三个函数

// 1. call
// call方法用于调用一个函数，并指定this的值和参数。
function greetWithCall(greeting) {
    console.log(greeting + ", " + this.name);
}
const person3_call = { name: "David" };
greetWithCall.call(person3_call, "Hello"); // 输出"Hello, David"

// 手写实现：
Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};
console.log(greetWithCall.myCall(person3, "Hello")); // 输出"Hello, David"

// 2. apply
// apply方法与call类似，但接受参数数组。
function greetWithApply(greeting) {
    console.log(greeting + ", " + this.name);
}
const person4_apply = { name: "Eve" };
greetWithApply.apply(person4_apply, ["Hi"]); // 输出"Hi, Eve"

// 手写实现：
Function.prototype.myApply = function (context, args) {
    context = context || globalThis;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};

// 3. bind
// bind方法返回一个新函数，并指定this的值和参数。
function greetWithBind(greeting) {
    console.log(greeting + ", " + this.name);
}
const person5_bind = { name: "Frank" };
const boundGreetWithBind = greetWithBind.bind(person5_bind, "Hey");
boundGreetWithBind(); // 输出"Hey, Frank"

// 手写实现：
Function.prototype.myBind = function (context, ...args) {
    const fn = this;
    return function (...newArgs) {
        return fn.apply(context, args.concat(newArgs));
    };
};

// 常见的this面试题

// 1. 下面代码输出什么？
const obj7 = {
    name: "Alice",
    greet: function () {
        console.log(this.name);
    },
};
const greet1 = obj7.greet;
greet1(); // 输出undefined，因为greet1作为普通函数调用，this指向全局对象

// 2. 下面代码输出什么？
const obj8 = {
    name: "Bob",
    greet: function () {
        console.log(this.name);
    },
};
obj8.greet(); // 输出"Bob"，因为greet作为对象的方法调用，this指向obj8

// 3. 下面代码输出什么？
function Person(name) {
    this.name = name;
    this.greet = function () {
        console.log(this.name);
    };
}
const person1_new_constructor = new Person("Charlie");
person1_new_constructor.greet(); // 输出"Charlie"，因为greet作为对象的方法调用，this指向person1_new_constructor

// 4. 下面代码输出什么？
const obj9 = {
    name: "David",
    greet: function () {
        setTimeout(function () {
            console.log(this.name);
        }, 1000);
    },
};
obj9.greet(); // 输出undefined，因为setTimeout的回调函数作为普通函数调用，this指向全局对象

// 5. 下面代码输出什么？
const obj10 = {
    name: "Eve",
    greet: function () {
        setTimeout(() => {
            console.log(this.name);
        }, 1000);
    },
};
obj10.greet(); // 输出"Eve"，因为箭头函数的this继承自greet方法，指向obj10
