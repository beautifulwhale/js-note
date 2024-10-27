const obj = {
    a: 1,
};

const values = Object.getOwnPropertyDescriptor(obj, "a");
console.log("values", values);

// 1. 对象属性描述符
const obj1 = Object.defineProperty(obj, "b", {
    value: 2,
    writable: false, // 决定是否可以修改
    enumerable: true,
    configurable: true,
});

obj1.b = 3;
console.log("obj1", obj1);

Object.defineProperty(obj, "c", {
    value: 4,
    writable: true,
    enumerable: true, // 是否可枚举 for in 是否枚举出
    configurable: false, // 是否可配置  不可删除
});
console.log(obj.c);
delete obj.c;
console.log("obj.c", obj.c);

// 2. 不可变对象
const myObj = { a: 1 };

// a. 不可修改、删除
Object.defineProperty(myObj, "STATIC", {
    value: 111,
    writable: false,
    configurable: false,
    enumerable: true,
});

// b. 禁止扩展  不可以新增属性了
Object.preventExtensions(myObj);
myObj.b = 123; // 新增失败
console.log("myObj", myObj);

// c. 密封对象 Object.seal() 会给对象属性的configurable 都设置成false

// d. 冻结对象 Object.freeze()  会给对象属性的configurable、writable 都设置成false 可以在最高使用
const objF = {
    prop() {},
    foo: "bar",
};

// 冻结前：可以添加新属性，也可以更改或删除现有属性
objF.foo = "baz";
objF.lumpy = "woof";
delete objF.prop;

// 冻结。
const o = Object.freeze(objF);

// 返回值和我们传入的对象相同。
o === objF; // true

// 对象已冻结。
Object.isFrozen(objF); // === true

// 现在任何更改都会失败。
objF.foo = "quux"; // 静默但什么都没做
// 静默且没有添加属性
objF.quaxxor = "the friendly duck";

// 严格模式下，这样的尝试会抛出 TypeError
function fail() {
    "use strict";
    objF.foo = "sparky"; // 抛出 TypeError
    delete objF.foo; // 抛出 TypeError
    delete objF.quaxxor; // 返回 true，因为属性‘quaxxor’从未被添加过。
    objF.sparky = "arf"; // 抛出 TypeError
}

// fail();

// 尝试通过 Object.defineProperty 更改；
// 下面的两个语句都会抛出 TypeError。
// Object.defineProperty(objF, "ohai", { value: 17 });
// Object.defineProperty(objF, "foo", { value: "eit" });

// 同样无法更改原型
// 下面的两个语句都会抛出 TypeError。
// Object.setPrototypeOf(obj, { x: 20 });
// objF.__proto__ = { x: 20 };
