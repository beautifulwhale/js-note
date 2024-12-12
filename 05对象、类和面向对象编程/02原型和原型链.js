/**
 * 原型 (Prototype) 和 原型链 (Prototype Chain)
 *
 * 在JavaScript中，每个对象都有一个原型对象，原型对象也可以有自己的原型，依此类推，这种关系被称为原型链。
 * 原型链的顶端是Object.prototype，它的原型是null。
 */

// 1. 原型 (Prototype)
// 每个JavaScript对象（除了null）都有一个原型对象。我们可以通过对象的__proto__属性来访问它的原型。
const obj = { name: "Alice" };
console.log(obj.__proto__ === Object.prototype); // true

// 2. 原型链 (Prototype Chain)
// 当我们访问一个对象的属性时，如果该对象没有这个属性，JavaScript会沿着原型链向上查找，直到找到该属性或到达原型链的顶端。
const obj2 = Object.create(obj);
obj2.age = 25;
console.log(obj2.name); // "Alice" - 从原型链上继承的属性
console.log(obj2.age); // 25 - 自身的属性

// 3. 特殊的原型 - 函数
// 在JavaScript中，函数也是对象。每个函数都有一个prototype属性，这个属性是一个对象，包含了通过该函数创建的实例共享的属性和方法。
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
};
const person1 = new Person("Bob");
person1.greet(); // Hello, my name is Bob

// 4. constructor属性
// 每个原型对象都有一个constructor属性，指向关联的构造函数。
console.log(Person.prototype.constructor === Person); // true
console.log(person1.constructor === Person); // true

// 5. instanceof操作符
// instanceof操作符用于检查一个对象是否是某个构造函数的实例。它会沿着原型链向上查找。
console.log(person1 instanceof Person); // true
console.log(person1 instanceof Object); // true

function isInstanceOf(obj, constructor) {
    let proto = obj.__proto__;
    while (proto !== null) {
        if (proto === constructor.prototype) {
            return true;
        }
        proto = proto.__proto__;
    }
    return false;
}
console.log(isInstanceOf(person1, Person)); // true
console.log(isInstanceOf(person1, Object)); // true

// 6. 原型链的顶端 - Object.prototype
// Object.prototype是所有对象的原型，它的原型是null。
console.log(Object.prototype.__proto__); // null

// 7. 自定义原型链
// 我们可以通过自定义原型链来实现继承。
function Animal(name) {
    this.name = name;
}
Animal.prototype.getName = function () {
    return this.name;
};

function Dog(name, breed) {
    Animal.call(this, name); // 调用父类构造函数
    this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype); // 设置原型链
Dog.prototype.constructor = Dog; // 修正constructor属性

Dog.prototype.bark = function () {
    console.log("Woof! Woof!");
};

const dog1 = new Dog("Rex", "Labrador");
console.log(dog1.getName()); // Rex
dog1.bark(); // Woof! Woof!
console.log(dog1 instanceof Dog); // true
console.log(dog1 instanceof Animal); // true
console.log(dog1 instanceof Object); // true

// 8. Function的原型
// Function是JavaScript中的一种特殊对象类型，用于定义函数。每个函数都是Function类型的实例。
function exampleFunction() {
    console.log("This is an example function.");
}
console.log(exampleFunction instanceof Function); // true
console.log(exampleFunction instanceof Object); // true

// Function.prototype是所有函数的原型，它本身也是一个函数。
console.log(Function.prototype instanceof Function); // true
console.log(Function.prototype instanceof Object); // true
console.log(Function.prototype.constructor === Function); // true

// 9. Array的原型
// Array是JavaScript中的一种特殊对象类型，用于表示数组。每个数组都是Array类型的实例。
const exampleArray = [1, 2, 3];
console.log(exampleArray instanceof Array); // true
console.log(exampleArray instanceof Object); // true

// Array.prototype是所有数组的原型，它本身也是一个数组。
console.log(Array.prototype instanceof Array); // true
console.log(Array.prototype instanceof Object); // true

// 10. 自定义Function和Array的原型方法
// 我们可以通过在Function.prototype和Array.prototype上添加方法来扩展它们的功能。

// 为Function添加一个自定义方法
Function.prototype.describe = function () {
    console.log(
        `This function is named ${this.name} and has ${this.length} parameters.`
    );
};
exampleFunction.describe(); // This function is named exampleFunction and has 0 parameters.

// 为Array添加一个自定义方法
Array.prototype.first = function () {
    return this[0];
};
console.log(exampleArray.first()); // 1
