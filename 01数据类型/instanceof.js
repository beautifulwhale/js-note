/**
 * JavaScript instanceof 操作符的手写实现
 */

// 2. 手写 instanceof 操作符
function myInstanceof(obj, constructor) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(obj);
    // 获取构造函数的 prototype 对象
    const prototype = constructor.prototype;

    // 递归查找原型链
    while (proto !== null) {
        if (proto === prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

// 测试 instanceof
class Person {
    constructor(name) {
        this.name = name;
    }
}

const person = new Person("张三");
console.log(myInstanceof(person, Person)); // true
console.log(myInstanceof(person, Object)); // true
console.log(myInstanceof(person, Array)); // false

// 3. 使用示例
const arr = [1, 2, 3];
console.log(myInstanceof(arr, Array)); // true
console.log(myIn("length", arr)); // true

const str = new String("hello");
console.log(myInstanceof(str, String)); // true
console.log(myIn("charAt", str)); // true
