// 01 可计算的属性名称
var prefix = "foo";

var obj = {
    [prefix + "bar"]: "bar",
    [prefix + "baz"]: "baz",
};

console.log(obj);

// 02 数组
var arr = ["foo", "bar", "baz"];

arr.a = "a";
console.log("arr", arr);

arr["3"] = "nihao";
console.log("arr--", arr);

// 03 复制对象- 理清深浅拷贝问题.

// 浅拷贝 Object.assign  扩展运算符
const map = new Map();
map.set("name", { a: "a", b: "b" });
map.set("age", 12);
const obj1 = { a: 1, b: { c: 2 }, map: new Map() };
const obj2 = Object.assign({}, obj1, { c: 3 });
console.log(obj2);
// obj2.b.c = 3;
// console.log(obj1); // 修改拷贝对象会影响到原对象

// 深拷贝:
// 1. JSON序列化: 弊端很多,不能够处理null、Symbol等, 同时也会让Date、RegExp、Map、Set出现问题,变成了普通的对象
const obj3 = JSON.parse(JSON.stringify(obj1));
console.log("obj3", obj3);
obj3.b.c = 3;
console.log("obj1", obj1);

// 2.手写深拷贝
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    if (obj instanceof Map) {
        const cloneMap = new Map();
        hash.set(obj, cloneMap);
        obj.forEach((key, value) => {
            cloneMap.set(deepClone(key, hash), deepClone(value, hash));
        });
        return cloneMap;
    }

    if (obj instanceof Set) {
        const cloneSet = new Set();
        hash.set(obj, cloneSet);
        obj.forEach((val) => {
            cloneSet.add(deepClone(val, hash));
        });
        return cloneSet;
    }

    const cloneObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, cloneObj);

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }

    return cloneObj;
}
obj1.foo = obj1; // 循环引用, 需使用WeakMap 来解决, key为弱引用,obj不再使用,会被拉进回收机制主动回收
const obj4 = deepClone(obj1);
console.log("obj4", obj4);
