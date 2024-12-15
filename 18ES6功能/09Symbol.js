/**
 * Symbol 是 ES6 引入的一种新的原始数据类型，表示独一无二的值。
 * 它是 JavaScript 语言的第七种数据类型，前六种是：Undefined、Null、Boolean、String、Number、Object。
 */

// 1. 创建 Symbol
const sym1 = Symbol();
const sym2 = Symbol("description111");

console.log(typeof sym1); // "symbol"
console.log(sym1); // Symbol()
console.log(sym2.description); // "description111"

// 2. Symbol 的唯一性
const sym3 = Symbol("key");
const sym4 = Symbol("key");

console.log(sym3 === sym4); // false

// 3. 使用 Symbol 作为对象属性的键, 使用 Symbol 作为对象属性的键时，Symbol 会作为对象的属性名，而不是字符串, 并且需要使用[]来访问
const myObj = {
    [sym1]: "value1",
    [sym2]: "value2",
};

console.log(myObj[sym1]); // "value1"
console.log(myObj[sym2]); // "value2"

// 4. Symbol.for() 和 Symbol.keyFor()
// Symbol.for() 方法会先检查给定的键是否已存在，如果存在则返回已存在的 Symbol，否则创建一个新的 Symbol。
const globalSym1 = Symbol.for("globalKey");
const globalSym2 = Symbol.for("globalKey");

console.log(globalSym1 === globalSym2); // true

// Symbol.keyFor() 方法返回一个已登记的 Symbol 的键。
const key = Symbol.keyFor(globalSym1);
console.log(key); // "globalKey"
console.log(Symbol.keyFor(Symbol.for("globalKey1"))); // "globalKey1"
console.log(Symbol.keyFor(sym4)); // undefined

// 5. Symbol 的用途
// 5.1 防止对象属性名冲突
const obj = {
    id: 1,
    [Symbol("id")]: 2,
    [sym1]: 3,
};

console.log(obj.id); // 1
console.log("obj[Symbol('id')]", obj[Symbol("id")]); // undefined
console.log("obj[sym1]", obj[sym1]); // 3

// 5.2 定义类的私有属性
class MyClass {
    constructor() {
        this[Symbol("private")] = "This is a private property";
    }

    getPrivate() {
        return this[Symbol("private")];
    }
}

const instance = new MyClass();
console.log(instance.getPrivate()); // "This is a private property"

// 5.3 实现迭代器
const iterable = {
    [Symbol.iterator]() {
        let step = 0;
        return {
            next() {
                step++;
                if (step <= 5) {
                    return { value: step, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    },
};

for (const value of iterable) {
    console.log(value); // 1, 2, 3, 4, 5
}

// 5.4 定义常量
const COLOR_RED = Symbol("red");
const COLOR_GREEN = Symbol("green");

function getColor(color) {
    switch (color) {
        case COLOR_RED:
            return "Red";
        case COLOR_GREEN:
            return "Green";
        default:
            return "Unknown color";
    }
}

console.log(getColor(COLOR_RED)); // "Red"
console.log(getColor(COLOR_GREEN)); // "Green"
