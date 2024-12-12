/**
 * 创建对象的几种方式
 */

// 1. 使用对象字面量
const obj1 = {
    name: "Alice",
    age: 25,
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    },
};
obj1.greet(); // Hello, my name is Alice

// 2. 使用Object构造函数
const obj2 = new Object();
obj2.name = "Bob";
obj2.age = 30;
obj2.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
};
obj2.greet(); // Hello, my name is Bob

// 3. 使用构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function () {
        console.log(`Hello, my name is ${this.name}`);
    };
}
const obj3 = new Person("Charlie", 35);
obj3.greet(); // Hello, my name is Charlie

// 4. 使用Object.create()方法
const proto = {
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    },
};
const obj4 = Object.create(proto);
obj4.name = "David";
obj4.age = 40;
obj4.greet(); // Hello, my name is David

/**
 * new 操作符的作用及本质
 *
 * new 操作符用于创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一的实例。
 * 它的作用包括：
 * 1. 创建一个空的简单JavaScript对象（即{}）。
 * 2. 链接该对象（即设置该对象的构造函数）到另一个对象。
 * 3. 将步骤1新创建的对象作为this的上下文。
 * 4. 如果该函数没有返回对象，则返回this。
 */

function CustomConstructor(name) {
    // this = {};  // 隐式创建一个空对象
    this.name = name;
    // return this;  // 隐式返回this对象
}

const obj5 = new CustomConstructor("Eve");
console.log(obj5.name); // Eve

// 模拟new操作符的实现
function myNew(constructor, ...args) {
    // 创建一个空对象，并将其原型指向构造函数的原型
    const obj = Object.create(constructor.prototype);
    // 将构造函数的this指向新创建的对象，并执行构造函数
    const result = constructor.apply(obj, args);
    // 如果构造函数返回一个对象，则返回该对象，否则返回新创建的对象
    return result instanceof Object ? result : obj;
}

const obj6 = myNew(CustomConstructor, "Frank");
console.log(obj6.name); // Frank
