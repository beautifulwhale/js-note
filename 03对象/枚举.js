const obj = {
    a: 1,
};
Object.prototype.b = 2;
console.log("a" in obj); // in 会检查其原型链
console.log("b" in obj); // true

console.log(obj.hasOwnProperty("a")); // hasOwnProperty 不会
console.log(obj.hasOwnProperty("b"));

Object.defineProperty(obj, "c", {
    value: 3,
    enumerable: true,
    writable: true,
    configurable: true,
});

Object.defineProperty(obj, "d", {
    value: 3,
    enumerable: false, // 是否可以枚举
    writable: true,
    configurable: true,
});

for (const key in obj) {
    console.log("key:", key, "value:", obj[key]);
}

// 数组的 for of 需要对象是可迭代对象
const myArr = [1, 2, 3];
console.log("myArr:", myArr);

// for (const i of myArr) {
//     console.log("i", i);
// }

// for of 向访问对象请求一个可迭代对象, 通过调用迭代器对象的next方法遍历
const it = myArr[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// 对象并不是一个可迭代的对象,但是可以给对象定义迭代器对象属性,便可以使用 for of
const obj1 = {
    a: 1,
    b: 2,
    [Symbol.iterator]: function () {
        const o = this;
        let idx = 0;
        const keys = Object.keys(o);
        return {
            next: function () {
                return {
                    value: o[keys[idx++]],
                    done: idx > keys.length,
                };
            },
        };
    },
};

for (const i of obj1) {
    console.log("i: ", i);
}

const it1 = obj1[Symbol.iterator]();
console.log("ob1", it1.next());
console.log("ob1", it1.next());
console.log("ob1", it1.next());
