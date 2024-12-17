/**
 * Reflect 详解
 *
 * Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。Reflect 并不是一个函数对象，因此它不可构造。
 * Reflect 的设计目的是为了操作对象提供更一致和更易预测的行为。
 *
 * 使用 Reflect 的原因：
 * 1. 提供了一组与对象操作相关的静态方法，这些方法与 Proxy handler 方法一一对应。
 * 2. 使得对象操作变得更加规范化和模块化。
 * 3. 提供了更好的返回值，避免了一些常见的错误。
 * 4. 使得 Proxy handler 方法的默认行为更容易实现。
 *
 * Reflect 解决的问题：
 * 1. 统一了对象操作的接口，使得操作对象的方式更加一致。
 * 2. 提供了更好的错误处理机制，避免了一些常见的错误。
 * 3. 使得 Proxy handler 方法的默认行为更容易实现。
 *
 * Reflect 的 API 主要包括以下方法：
 */

// Reflect.apply 参数: target, thisArg, argumentsList 分别是目标对象、this 值、参数列表
function sum(a, b) {
    return a + b;
}
console.log(Reflect.apply(sum, null, [1, 2])); // 3

// Reflect.construct 参数: target, argumentsList 分别是目标对象、参数列表
function Greeting(name) {
    this.name = name;
}
const instance = Reflect.construct(Greeting, ["World"]);
console.log(instance.name); // World

// Reflect.defineProperty 参数: target, propertyKey, attributes 分别是目标对象、属性名、属性描述符
const obj1 = {};
Reflect.defineProperty(obj1, "name", { value: "Reflect" });
console.log(obj1.name); // Reflect

// Reflect.deleteProperty 参数: target, propertyKey 分别是目标对象、属性名
const obj2 = { name: "Reflect" };
Reflect.deleteProperty(obj2, "name");
console.log(obj2.name); // undefined

// Reflect.get 参数: target, propertyKey, receiver 分别是目标对象、属性名、接收者, 当 receiver 为 undefined 时, 使用 target 作为 this 值, 当 receiver 为对象时, 使用 receiver 作为 this 值
const obj3 = { name: "Reflect" };
console.log(Reflect.get(obj3, "name")); // Reflect

// Reflect.getOwnPropertyDescriptor 参数: target, propertyKey 分别是目标对象、属性名
const obj4 = { name: "Reflect" };
console.log(Reflect.getOwnPropertyDescriptor(obj4, "name"));

// Reflect.getPrototypeOf 参数: target 是目标对象
const obj5 = {};
console.log(Reflect.getPrototypeOf(obj5)); // Object.prototype

// Reflect.has 参数: target, propertyKey 分别是目标对象、属性名
const obj6 = { name: "Reflect" };
console.log(Reflect.has(obj6, "name")); // true

// Reflect.isExtensible 参数: target 是目标对象
const obj7 = {};
console.log(Reflect.isExtensible(obj7)); // true

// Reflect.ownKeys 参数: target 是目标对象 返回目标对象自身的所有属性名,包括不可枚举的属性
const obj8 = { name: "Reflect" };
console.log(Reflect.ownKeys(obj8)); // ['name']

// Reflect.preventExtensions 参数: target 是目标对象
const obj9 = {};
Reflect.preventExtensions(obj9);
console.log(Reflect.isExtensible(obj9)); // false

// Reflect.set 参数: target, propertyKey, value, receiver 分别是目标对象、属性名、值、接收者
const obj10 = {};
Reflect.set(obj10, "name", "Reflect");
console.log(obj10.name); // Reflect
// Reflect.set 设置 receiver 后的 this 问题
const obj12 = {
    name: "Reflect",
    setName(value) {
        this.name = value;
    },
};

const receiver = {
    name: "Receiver",
};

// 使用 Reflect.set 设置 receiver 后的 this 问题, 使用 receiver 作为 this 值
Reflect.set(
    obj12,
    "setName",
    function (value) {
        this.name = value;
    },
    receiver
);

obj12.setName("New Reflect");
console.log(obj12.name); // New Reflect

receiver.setName = obj12.setName;
receiver.setName("New Receiver");
console.log(receiver.name); // New Receiver

// Reflect.setPrototypeOf 参数: target, proto 分别是目标对象、新原型
const obj11 = {};
Reflect.setPrototypeOf(obj11, Array.prototype);
console.log(Reflect.getPrototypeOf(obj11) === Array.prototype); // true
