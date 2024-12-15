/**
 * WeakRef 是 ES2021 引入的一种新的引用类型，它允许你创建一个对对象的弱引用。
 * 弱引用不会阻止对象被垃圾回收机制回收，这意味着如果没有其他强引用指向该对象，
 * 垃圾回收机制可以回收该对象，即使存在对该对象的 WeakRef。
 */

// 1. 创建 WeakRef
const obj = { name: "example" };
const weakRef = new WeakRef(obj);

// 2. 使用 WeakRef
// 使用 WeakRef 的 .deref() 方法可以获取对象的强引用，如果对象已经被回收，则返回 undefined。
const derefObj = weakRef.deref();
if (derefObj) {
    console.log("对象仍然存在:", derefObj.name); // 对象仍然存在: example
} else {
    console.log("对象已被回收");
}

// 3. WeakRef 的使用场景
// WeakRef 适用于需要引用对象但不希望阻止其被垃圾回收的场景。例如，可以使用 WeakRef 实现缓存，
// 在内存紧张时允许缓存的对象被回收。

const cache = new Map();
function getCachedData(key) {
    const weakRef = cache.get(key);
    if (weakRef) {
        const cachedData = weakRef.deref();
        console.log("cachedData", cachedData);
        if (cachedData) {
            return cachedData;
        }
    }
    const newData = { data: `Data for ${key}` };
    cache.set(key, new WeakRef(newData));
    return newData;
}

const data1 = getCachedData("key1");
console.log(data1); // { data: 'Data for key1' }
const data2 = getCachedData("key1");
console.log(data2); // { data: 'Data for key1' }

// 注意：由于垃圾回收机制的运行时机不确定，无法保证何时对象会被回收并从 WeakRef 中删除。
// 因此，使用 WeakRef 时需要考虑对象可能随时被回收的情况。

// 4. FinalizationRegistry
// FinalizationRegistry 是 ES2021 引入的另一种新的引用类型，它允许你在对象被垃圾回收时执行回调函数。
// 这对于清理资源或执行其他与对象生命周期相关的操作非常有用。

// 4.1 创建 FinalizationRegistry
const registry = new FinalizationRegistry((heldValue) => {
    console.log(`对象被回收: ${heldValue}`);
});

// 4.2 注册对象
const obj1 = { name: "example1" };
const obj2 = { name: "example2" };
registry.register(obj1, "example1");
registry.register(obj2, "example2");

// 4.3 取消注册对象
// 可以使用 unregister 方法取消对象的注册
registry.unregister(obj1);

// 4.4 FinalizationRegistry 的使用场景
// FinalizationRegistry 适用于需要在对象被垃圾回收时执行清理操作的场景。例如，可以使用 FinalizationRegistry
// 清理与对象相关的资源，避免内存泄漏。

class Resource {
    constructor(name) {
        this.name = name;
        this.data = new Array(1000000).fill(name); // 模拟占用大量内存的资源
        registry.register(this, name);
    }

    release() {
        console.log(`释放资源: ${this.name}`);
        registry.unregister(this);
        this.data = null;
    }
}

let resource1 = new Resource("Resource1");
let resource2 = new Resource("Resource2");

// 释放资源后，删除对对象的所有引用
resource1.release();
resource2.release();

// 删除对对象的强引用
resource1 = null;
resource2 = null;

// 在 Node.js 中，可以使用 --expose-gc 选项来手动触发垃圾回收
// 例如：node --expose-gc script.js
if (global.gc) {
    // 多次触发垃圾回收
    for (let i = 0; i < 5; i++) {
        global.gc();
        console.log(`触发垃圾回收: 第 ${i + 1} 次`);
    }
} else {
    console.warn("No GC hook! Start your program with `node --expose-gc`.");
}

// 由于垃圾回收的时机不确定，可能需要等待一段时间
setTimeout(() => {
    console.log("等待垃圾回收完成...");
}, 1000);

// 注意：由于垃圾回收机制的运行时机不确定，无法保证何时对象会被回收并触发 FinalizationRegistry 的回调函数。
// 因此，使用 FinalizationRegistry 时需要考虑回调函数可能随时被执行的情况。
