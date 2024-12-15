// ES6 对象扩展功能详解

// 1. 属性的简洁表示法
// 在 ES6 中，可以使用简洁表示法来定义对象的属性和方法。
const name = "张三";
const age = 25;

const person = {
    name,
    age,
    greet() {
        console.log(`你好，我是${this.name}，我今年${this.age}岁。`);
    },
};

person.greet(); // 输出：你好，我是张三，我今年25岁。

// 2. 计算属性名
// ES6 允许在对象字面量中使用表达式作为属性名。
const propKey = "foo";
const obj = {
    [propKey]: true,
    ["a" + "bc"]: 123,
};

console.log(obj); // 输出：{ foo: true, abc: 123 }

// 3. Object.assign()
// Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target); // 输出：{ a: 1, b: 2, c: 3 }

// 4. Object.is()
// Object.is() 方法判断两个值是否为同一个值。它与严格比较运算符（===）的行为基本一致，但在 NaN 和 +0、-0 的处理上有所不同。
console.log(Object.is("foo", "foo")); // 输出：true
console.log(Object.is({}, {})); // 输出：false
console.log(Object.is(NaN, NaN)); // 输出：true
console.log(Object.is(+0, -0)); // 输出：false

// 5. Object.setPrototypeOf() 和 Object.getPrototypeOf()
// Object.setPrototypeOf() 方法设置一个指定的对象的原型 (即, 内部[[Prototype]]属性) 到另一个对象或 null。
// Object.getPrototypeOf() 方法返回指定对象的原型 (即, 内部[[Prototype]]属性的值)。
const proto = {};
const obj2 = Object.create(proto);

console.log(Object.getPrototypeOf(obj2) === proto); // 输出：true

const newProto = { greeting: "hello" };
Object.setPrototypeOf(obj2, newProto);
console.log(Object.getPrototypeOf(obj2) === newProto); // 输出：true

// 6. Object.keys()、Object.values() 和 Object.entries()
// Object.keys() 返回一个由对象的自身可枚举属性组成的数组。
// Object.values() 返回一个包含对象自身的所有可枚举属性值的数组。
// Object.entries() 返回一个给定对象自身可枚举属性的键值对数组。
const obj3 = { a: 1, b: 2, c: 3 };

console.log(Object.keys(obj3)); // 输出：['a', 'b', 'c']
console.log(Object.values(obj3)); // 输出：[1, 2, 3]
console.log(Object.entries(obj3)); // 输出：[ ['a', 1], ['b', 2], ['c', 3] ]
console.log(new Map(Object.entries(obj3))); // 输出：Map { 'a' => 1, 'b' => 2, 'c' => 3 }

// 7. 扩展运算符
// 扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
const obj4 = { ...obj3, d: 4 };
console.log(obj4); // 输出：{ a: 1, b: 2, c: 3, d: 4 }

// 8. Object.fromEntries()
// Object.fromEntries() 方法把键值对列表转换为一个对象。与 Object.entries() 相反。
const entries = [
    ["a", 1],
    ["b", 2],
    ["c", 3],
];
const obj5 = Object.fromEntries(entries);
console.log(obj5); // 输出：{ a: 1, b: 2, c: 3 }

// 9. 对象的解构赋值
// ES6 允许对象的解构赋值。
const { a, b, c } = obj3;
console.log(a, b, c); // 输出：1 2 3

// 10. hasOwn()
// hasOwn() 方法返回一个布尔值，指示对象自身属性中是否具有指定的属性。
console.log(Object.hasOwn(obj3, "a")); // 输出：true
console.log(Object.hasOwn(obj3, "d")); // 输出：false

// 11. 对象属性的遍历: for...in、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Object.getOwnPropertyDescriptors()、Reflect.ownKeys()
// for...in 语句以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性。
for (const key in obj3) {
    console.log(key); // 输出：a b c
}

// Object.keys() 返回一个包含对象自身所有可枚举属性名称的数组。
console.log(Object.keys(obj3)); // 输出：['a', 'b', 'c']

// Object.getOwnPropertyNames() 返回一个包含对象自身所有属性名称的数组。
console.log(Object.getOwnPropertyNames(obj3)); // 输出：['a', 'b', 'c']

// Object.getOwnPropertySymbols() 返回一个包含对象自身所有 Symbol 属性名称的数组。
console.log(Object.getOwnPropertySymbols(obj3)); // 输出：[]

// Object.getOwnPropertyDescriptors() 返回一个包含对象自身所有属性描述符的数组。
console.log(Object.getOwnPropertyDescriptors(obj3));
// 输出：{ a: { value: 1, writable: true, enumerable: true, configurable: true }, b: { value: 2, writable: true, enumerable: true, configurable: true }, c: { value: 3, writable: true, enumerable: true, configurable: true } }

// Reflect.ownKeys() 返回一个包含对象自身所有属性名称的数组。
console.log(Reflect.ownKeys(obj3)); // 输出：['a', 'b', 'c']

// 12. super关键字用于访问和调用对象的原型上的方法。
const obj6 = {
    foo: "bar",
    find() {
        return super.foo;
    },
    getMyBar() {
        return super.getBar();
    },
};

const proto_ = {
    foo: "baz",
    bar: "bar_proto",
    getBar() {
        return this.bar;
    },
};

Object.setPrototypeOf(obj6, proto_);

console.log(obj6.find()); // 输出：baz
console.log(obj6.getMyBar()); // 输出：bar_proto
