/**
 * Map 是 ES6 引入的一种新的集合数据结构，它类似于对象，但是键值对的键可以是任意类型的值。
 */

// 1. 创建 Map
const map1 = new Map(); // 创建一个空的 Map
const map2 = new Map([
    [1, "one"],
    [2, "two"],
    [3, "three"],
]); // 通过数组创建 Map
const map3 = new Map(Object.entries({ a: 1, b: 2, c: 3 })); // 通过对象创建 Map
const map4_1 = new Map(map2); // 通过另一个 Map 创建 Map

console.log("map1", map1); // Map(0) {}
console.log("map2", map2); // Map(3) { 1 => 'one', 2 => 'two', 3 => 'three' }
console.log("map3", map3); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }
console.log("map4_1", map4_1); // Map(3) { 1 => 'one', 2 => 'two', 3 => 'three' }
/**
 * 通过 Set 创建 Map 时，需要将 Set 转换为键值对的形式。
 * 可以使用 Array.from() 方法将 Set 转换为数组，然后将每个元素转换为 [key, value] 的形式。
 */
const set = new Set([1, 2, 3]);
const mapFromSet = new Map(Array.from(set, (item) => [item, item]));
console.log("mapFromSet", mapFromSet); // Map(3) { 1 => 1, 2 => 2, 3 => 3 }

// 2. Map 的属性
console.log(map2.size); // 3 - 返回 Map 对象的键值对数量

// 3. Map 的操作方法
map1.set("key1", "value1"); // 添加一个键值对
map1.set("key2", "value2");
console.log(map1); // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }

map1.delete("key1"); // 删除一个键值对
console.log(map1); // Map(1) { 'key2' => 'value2' }

console.log(map1.has("key2")); // true - 判断是否包含某个键
console.log(map1.has("key1")); // false

map1.clear(); // 清空所有键值对
console.log(map1); // Map(0) {}

// 4. Map 的遍历方法
const map4 = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
]);

// 4.1 keys() - 返回一个包含 Map 对象中所有键的迭代器
for (let key of map4.keys()) {
    console.log(key); // 'a', 'b', 'c'
}

// 4.2 values() - 返回一个包含 Map 对象中所有值的迭代器
for (let value of map4.values()) {
    console.log(value); // 1, 2, 3
}

// 4.3 entries() - 返回一个包含 Map 对象中所有键值对的迭代器
for (let entry of map4.entries()) {
    console.log(entry); // ['a', 1], ['b', 2], ['c', 3]
}

// 4.4 forEach() - 使用回调函数遍历每个键值对
map4.forEach((value, key) => {
    console.log(key, value); // 'a' 1, 'b' 2, 'c' 3
});

// 5. Map 的使用场景

// 5.1 记录元素出现次数
const array = ["apple", "banana", "apple", "orange", "banana", "apple"];
const countMap = new Map();
array.forEach((item) => {
    countMap.set(item, (countMap.get(item) || 0) + 1);
});
console.log(countMap); // Map(3) { 'apple' => 3, 'banana' => 2, 'orange' => 1 }

// 5.2 存储 DOM 节点与数据的映射关系
const nodeDataMap = new Map();
const div1 = document.createElement("div");
const div2 = document.createElement("div");
nodeDataMap.set(div1, { id: 1, name: "div1" });
nodeDataMap.set(div2, { id: 2, name: "div2" });
console.log(nodeDataMap.get(div1)); // { id: 1, name: 'div1' }
console.log(nodeDataMap.get(div2)); // { id: 2, name: 'div2' }

// 5.3 缓存计算结果
const cache = new Map();
function fibonacci(n) {
    if (n <= 1) return n;
    if (cache.has(n)) return cache.get(n);
    const result = fibonacci(n - 1) + fibonacci(n - 2);
    cache.set(n, result);
    return result;
}
console.log(fibonacci(10)); // 55

// 6. Map 与 Object 的区别
/**
 * 1. Map 的键可以是任意类型的值，而 Object 的键只能是字符串或 Symbol。
 * 2. Map 的键值对是有序的，而 Object 的键值对是无序的。
 * 3. Map 的键值对数量可以通过 size 属性获取，而 Object 的键值对数量可以通过 Object.keys(obj).length 获取。
 */

// 7. Map数据类型转化

// 7.1 Map 转 Object
const mapToObject = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
]);
const obj = Object.fromEntries(mapToObject);
console.log("obj", obj); // { a: 1, b: 2, c: 3 }

// 7.2 Object 转 Map
const objToMap = { a: 1, b: 2, c: 3 };
const map = new Map(Object.entries(objToMap));
console.log("map", map); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }

// 7.3 Map 转 Array
const mapToArray = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
]);
const array_new = Array.from(mapToArray); // 使用 Array.from() 方法
const array_new_2 = [...mapToArray]; // 使用扩展运算符
console.log("array_new", array_new); // [['a', 1], ['b', 2], ['c', 3]]
console.log("array_new_2", array_new_2); // [['a', 1], ['b', 2], ['c', 3]]

// 7.4 Array 转 Map
const arrayToMap = [
    ["a", 1],
    ["b", 2],
    ["c", 3],
];
const map_new = new Map(arrayToMap);
console.log("map_new", map_new); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }

// 7.5 Map 转 JSON
const mapToJson = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
]);
const json = JSON.stringify(mapToJson);
console.log("json", json); // {"a":1,"b":2,"c":3}

// 7.6 JSON 转 Map
const jsonToMap = '{"a":1,"b":2,"c":3}';
const map_new1 = new Map(Object.entries(JSON.parse(jsonToMap)));
console.log("map_new1", map_new1); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }

// 8. WeakMap
// WeakMap 是 ES6 引入的一种新的集合数据结构，它与 Map 类似，但是有一些重要的区别。

// 8.1 创建 WeakMap
const weakMap1 = new WeakMap();
const obj1 = { a: 1 };
const obj2 = { b: 2 };
weakMap1.set(obj1, "value1");
weakMap1.set(obj2, "value2");
console.log(weakMap1.get(obj1)); // "value1"
console.log(weakMap1.get(obj2)); // "value2"

// 8.2 WeakMap 的常用 API
// 8.2.1 set(key, value) - 向 WeakMap 中添加一个键值对
weakMap1.set({ c: 3 }, "value3"); // 只能添加对象、Symbol作为键, 不能添加其他类型的值
console.log(weakMap1);

// 8.2.2 delete(key) - 从 WeakMap 中删除一个键值对
weakMap1.delete(obj1);
console.log(weakMap1.has(obj1)); // false

// 8.2.3 has(key) - 判断 WeakMap 中是否包含某个键
console.log(weakMap1.has(obj2)); // true

// 8.2.4 get(key) - 获取 WeakMap 中某个键对应的值
console.log(weakMap1.get(obj2)); // "value2"

// 8.3 WeakMap 与 Map 的区别
// 8.3.1 WeakMap 的键只能是对象，而 Map 的键可以是任意类型的值。
const mapExample = new Map([
    [1, "number"],
    ["string", "string"],
    [true, "boolean"],
    [{ d: 4 }, "object"],
]);
const weakMapExample = new WeakMap();
// weakMapExample.set(1, "number"); // TypeError: Invalid value used as weak map key
weakMapExample.set({ e: 5 }, "object");

// 8.3.2 WeakMap 中的对象是弱引用，如果没有其他引用指向该对象，垃圾回收机制会自动回收该对象。
// 这意味着 WeakMap 中的对象可能会被自动删除，而 Map 中的对象不会。
let obj3 = { f: 6 };
weakMapExample.set(obj3, "value");
console.log("weakMapExample.has(obj3)", weakMapExample.has(obj3)); // true
obj3 = null; // 解除对 obj3 的引用
console.log("weakMapExample.has(obj3)", weakMapExample.has(obj3)); // false
// 由于垃圾回收机制的运行时机不确定，无法保证何时 obj3 会被回收并从 WeakMap 中删除

// 8.4 WeakMap 的使用场景
// 8.4.1 适用于需要存储对象的集合，并且不需要考虑对象的生命周期管理的场景。
// 例如，可以使用 WeakMap 存储已经处理过的 DOM 节点，避免重复处理。
const processedNodes = new WeakMap();
function processNode(node) {
    if (processedNodes.has(node)) {
        console.log("Node already processed");
        return;
    }
    // 处理节点
    console.log("Processing node");
    processedNodes.set(node, true);
}
const node1 = document.createElement("div");
const node2 = document.createElement("span");
processNode(node1); // Processing node
processNode(node2); // Processing node
processNode(node1); // Node already processed

// 8.4.2 部署私有属性
// WeakMap 可以用于实现对象的私有属性。通过将私有属性存储在 WeakMap 中，
// 可以确保这些属性只能通过特定的对象访问，并且在对象被垃圾回收时自动删除。

const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        privateData.set(this, { name, age });
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }

    setName(name) {
        privateData.get(this).name = name;
    }

    setAge(age) {
        privateData.get(this).age = age;
    }
}

const person1 = new Person("Alice", 30);
console.log(person1.getName()); // Alice
console.log(person1.getAge()); // 30
person1.setName("Bob");
person1.setAge(25);
console.log(person1.getName()); // Bob
console.log(person1.getAge()); // 25
