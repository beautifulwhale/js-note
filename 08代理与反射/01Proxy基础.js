/**
 * Proxy 详解
 *
 * Proxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。
 * 通过 Proxy，可以拦截和修改对目标对象的操作。
 *
 * Proxy 构造函数接收两个参数：
 * 1. target：要包装的目标对象（可以是任何类型的对象，包括数组、函数等）。
 * 2. handler：一个对象，其属性是当执行一个操作时定义代理行为的函数。
 */

// 1. get
// 拦截对象属性的读取操作, 返回一个值
const target1 = { message: "Hello, World!" };
const handler1 = {
    get: function (target, property, receiver) {
        // target 是目标对象
        // property 是目标对象的属性
        // receiver 是代理对象
        console.log(`Getting property: ${property}`);
        return property in target ? target[property] : "Property not found";
    },
};
const proxy1 = new Proxy(target1, handler1);
console.log(proxy1.message); // Getting property: message \n Hello, World!
console.log(proxy1.nonExistent); // Getting property: nonExistent \n Property not found

// 2. set
// 拦截对象属性的设置操作, 返回一个布尔值, 表示属性是否被成功设置
const target2 = { message: "Hello, World!" };
const handler2 = {
    set: function (target, property, value, receiver) {
        console.log(`Setting property: ${property} to ${value}`);
        target[property] = value;
        // target[property] = "Hello, Proxy1!"; // 所有 set 都会被拦截
        return true;
    },
};
const proxy2 = new Proxy(target2, handler2);
proxy2.message = "Hello, Proxy!"; // Setting property: message to Hello, Proxy!
console.log(target2.message); // Hello, Proxy!

// 3. has
// 拦截 in 操作符, 返回一个布尔值, 表示属性是否存在
const target3 = { message: "Hello, World!" };
const handler3 = {
    has: function (target, property) {
        console.log(`Checking if property exists: ${property}`);
        return property in target;
    },
};
const proxy3 = new Proxy(target3, handler3);
console.log("message" in proxy3); // Checking if property exists: message \n true
console.log("nonExistent" in proxy3); // Checking if property exists: nonExistent \n false

// 4. deleteProperty
// 拦截 delete 操作符, 返回一个布尔值, 表示属性是否被成功删除
const target4 = { message: "Hello, World!" };
const handler4 = {
    deleteProperty: function (target, property) {
        console.log(`Deleting property: ${property}`);
        delete target[property];
        return true;
    },
};
const proxy4 = new Proxy(target4, handler4);
delete proxy4.message; // Deleting property: message
console.log(target4.message); // undefined

// 5. ownKeys
// 拦截 Object.getOwnPropertyNames、Object.getOwnPropertySymbols、Object.keys、for...in, 返回一个数组, 表示对象的所有属性
const target5 = { message: "Hello, World!" };
const handler5 = {
    ownKeys: function (target) {
        console.log("Getting own property keys");
        // 返回一个数组, 表示对象的所有属性, 包括不可枚举的属性, 对于 enumerable 为 false、configurable 为 false、writable 为 false、Symbol 的属性, 会被自动过滤.
        // return ["message", "nonExistent", Symbol("test")];
        return Object.keys(target);
    },
};
const proxy5 = new Proxy(target5, handler5);
console.log(Object.keys(proxy5)); // Getting own property keys \n ["message"]

// 6. getOwnPropertyDescriptor
// 拦截 Object.getOwnPropertyDescriptor, 返回一个对象, 表示属性的描述符
const target6 = { message: "Hello, World!" };
const handler6 = {
    getOwnPropertyDescriptor: function (target, property) {
        console.log(`Getting property descriptor for: ${property}`);
        return Object.getOwnPropertyDescriptor(target, property);
    },
};
const proxy6 = new Proxy(target6, handler6);
console.log(Object.getOwnPropertyDescriptor(proxy6, "message")); // Getting property descriptor for: message \n {value: "Hello, World!", writable: true, enumerable: true, configurable: true}

// 7. defineProperty
// 拦截 Object.defineProperty、Object.defineProperties, 返回一个布尔值, 表示属性是否被成功定义
const target7 = { message: "Hello, World!" };
const handler7 = {
    defineProperty: function (target, property, descriptor) {
        console.log(`Defining property: ${property}`, descriptor);
        Object.defineProperty(target, property, descriptor);
        return true;
    },
};
const proxy7 = new Proxy(target7, handler7);
Object.defineProperty(proxy7, "message", { value: "Hello, Proxy!" }); // Defining property: message {value: "Hello, Proxy!", writable: true, enumerable: true, configurable: true}
console.log(target7.message); // Hello, Proxy!

// 8. preventExtensions
// 拦截 Object.preventExtensions, 返回一个布尔值, 表示对象是否被成功设置为不可扩展
const target8 = { message: "Hello, World!" };
const handler8 = {
    preventExtensions: function (target) {
        console.log("Preventing extensions");
        Object.preventExtensions(target);
        return true;
    },
};
const proxy8 = new Proxy(target8, handler8);
Object.preventExtensions(proxy8); // Preventing extensions
console.log(Object.isExtensible(target8)); // false

// 9. isExtensible
// 拦截 Object.isExtensible, 返回一个布尔值, 表示对象是否可扩展
const target9 = { message: "Hello, World!" };
const handler9 = {
    isExtensible: function (target) {
        console.log("Checking if extensible");
        return Object.isExtensible(target);
    },
};
const proxy9 = new Proxy(target9, handler9);
console.log(Object.isExtensible(proxy9)); // Checking if extensible \n true

// 10. getPrototypeOf
// 拦截 Object.getPrototypeOf、Reflect.getPrototypeOf、instanceof, 返回一个对象, 表示对象的原型
const target10 = { message: "Hello, World!" };
const handler10 = {
    getPrototypeOf: function (target) {
        console.log("Getting prototype");
        return Object.getPrototypeOf(target);
    },
};
const proxy10 = new Proxy(target10, handler10);
console.log(Object.getPrototypeOf(proxy10)); // Getting prototype \n {}

// 11. setPrototypeOf
// 拦截 Object.setPrototypeOf, 返回一个布尔值, 表示原型是否被成功设置
const target11 = { message: "Hello, World!" };
const handler11 = {
    setPrototypeOf: function (target, prototype) {
        console.log("Setting prototype");
        Object.setPrototypeOf(target, prototype);
        return true;
    },
};
const proxy11 = new Proxy(target11, handler11);
Object.setPrototypeOf(proxy11, Array.prototype); // Setting prototype
console.log(Object.getPrototypeOf(target11) === Array.prototype); // true

// 12. apply
// 拦截函数调用、call、apply, 返回一个值
const target12 = function () {
    return "Hello, World!";
};
const handler12 = {
    apply: function (target, thisArg, argumentsList) {
        // target 是目标函数
        // thisArg 是函数调用时的 this 值
        // argumentsList 是函数调用时的参数列表
        console.log("Calling function");
        return target.apply(thisArg, argumentsList);
    },
};
const proxy12 = new Proxy(target12, handler12);
console.log(proxy12()); // Calling function \n Hello, World!

// 13. construct
// 拦截 new 操作符, 返回一个对象, 表示构造函数的实例
const target13 = function (message) {
    this.message = message;
};
const handler13 = {
    construct: function (target, argumentsList, newTarget) {
        // target 是目标构造函数
        // argumentsList 是构造函数调用时的参数列表
        // newTarget 是 new 操作符的目标对象
        console.log("Constructing instance");
        return new target(...argumentsList);
    },
};
const proxy13 = new Proxy(target13, handler13);
const instance = new proxy13("Hello, World!"); // Constructing instance
console.log("proxy13", proxy13); // proxy13 {message: "Hello, World!"}
console.log(instance.message); // Hello, World!

/**
 * Proxy 的撤销
 *
 * Proxy.revocable 方法可以创建一个可撤销的 Proxy 实例。
 * 调用 revoke 方法可以撤销代理，使代理对象失效。
 */
const { proxy: revocableProxy, revoke } = Proxy.revocable(target1, handler1);
console.log(revocableProxy.message); // Getting property: message \n Hello, World!
revoke();
try {
    console.log(revocableProxy.message); // TypeError: Cannot perform 'get' on a proxy that has been revoked
} catch (e) {
    console.error(e.message);
}

/**
 * Proxy 中的 this 指向问题
 *
 * 在 Proxy 中，this 的指向可能会与预期不符。
 * 例如，在 get 和 set 拦截器中，this 指向的是 handler 对象，而不是目标对象。
 * 需要注意在 handler 函数中正确处理 this 的指向。
 */
const targetWithThis = {
    message: "Hello, World!",
    getMessage(value) {
        return this.message + value;
    },
};
const handlerWithThis = {
    get(target, property, receiver) {
        if (property === "getMessage") {
            return function () {
                return target[property].call(target, ...arguments);
            };
        }
        return Reflect.get(target, property, receiver);
    },
};
const proxyWithThis = new Proxy(targetWithThis, handlerWithThis);
console.log(proxyWithThis.getMessage("123")); // Hello, World!123
