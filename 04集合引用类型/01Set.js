/**
 * Set 是 ES6 引入的一种新的集合数据结构，它类似于数组，但是成员的值都是唯一的，没有重复的值。
 */

// 1. 创建 Set
const set1 = new Set(); // 创建一个空的 Set
const set2 = new Set([1, 2, 3, 4, 5]); // 通过数组创建 Set
const set3 = new Set("hello"); // 通过字符串创建 Set，每个字符作为一个元素
const set4_ = new Set([null, undefined, null, undefined]);

console.log(set1); // Set(0) {}
console.log(set2); // Set(5) { 1, 2, 3, 4, 5 }
console.log(set3); // Set(4) { 'h', 'e', 'l', 'o' }
console.log(set4_); // Set(2) { null, undefined }
// 2. Set 的属性
console.log(set2.size); // 5 - 返回 Set 对象的成员数量

// 3. Set 的操作方法
set1.add(1); // 添加一个值
set1.add(2);
console.log(set1); // Set(2) { 1, 2 }

set1.delete(1); // 删除一个值
console.log(set1); // Set(1) { 2 }

console.log(set1.has(2)); // true - 判断是否包含某个值
console.log(set1.has(1)); // false

set1.clear(); // 清空所有值
console.log(set1); // Set(0) {}

// 4. Set 的遍历方法
const set4 = new Set([1, 2, 3, 4, 5]);

// 4.1 keys() - 返回一个包含 Set 对象中所有键的迭代器
for (let key of set4.keys()) {
    console.log(key); // 1, 2, 3, 4, 5
}

// 4.2 values() - 返回一个包含 Set 对象中所有值的迭代器
for (let value of set4.values()) {
    console.log(value); // 1, 2, 3, 4, 5
}

// 4.3 entries() - 返回一个包含 Set 对象中所有键值对的迭代器
for (let entry of set4.entries()) {
    console.log(entry); // [1, 1], [2, 2], [3, 3], [4, 4], [5, 5]
}

// 4.4 forEach() - 使用回调函数遍历每个成员
set4.forEach((value) => {
    console.log(value); // 1, 2, 3, 4, 5
});

// 5. Set 的运算属性
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// 5.1 并集
const union = new Set([...setA, ...setB]);
console.log(union); // Set(5) { 1, 2, 3, 4, 5 }

// 5.2 交集
const intersection = new Set([...setA].filter((x) => setB.has(x)));
console.log(intersection); // Set(1) { 3 }

// 5.3 差集
const difference = new Set([...setA].filter((x) => !setB.has(x)));
console.log(difference); // Set(2) { 1, 2 }

// 5. Set 的内置方法
const setX = new Set([1, 2, 3]);
const setY = new Set([3, 4, 5]);

// 5.1 并集
const unionXY = setX.union(setY);
console.log("unionXY", unionXY); // Set(5) { 1, 2, 3, 4, 5 }

// 5.2 交集
const intersectionXY = setX.intersection(setY);
console.log("intersectionXY", intersectionXY); // Set(1) { 3 }

// 5.3 差集
const differenceXY = setX.difference(setY);
console.log("differenceXY", differenceXY); // Set(2) { 1, 2 }

// 5.4 子集
const isSubset = setX.isSubsetOf(setY);
console.log("isSubset", isSubset); // false

// 5.5 超集
const isSuperset = setY.isSupersetOf(setX);
console.log("isSuperset", isSuperset); // false

// 5.6 对称差集
const symmetricDifference = setX.symmetricDifference(setY);
console.log("symmetricDifference", symmetricDifference); // Set(4) { 1, 2, 4, 5 }

// 6. Set 的使用场景

// 6.1 去重
// Set 最常见的使用场景之一是数组去重。由于 Set 结构不会存储重复的值，因此可以很方便地将一个包含重复元素的数组转换为一个不包含重复元素的数组。
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]

// 6.2 交集运算
// Set 可以用于计算两个数组的交集。通过将两个数组转换为 Set，然后使用 filter 方法筛选出两个 Set 中都存在的元素。
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
const intersectionArray = [...new Set(array1)].filter((x) =>
    new Set(array2).has(x)
);
console.log(intersectionArray); // [3, 4]

// 6.3 差集运算
// Set 也可以用于计算两个数组的差集。通过将两个数组转换为 Set，然后使用 filter 方法筛选出只在第一个 Set 中存在的元素。
const differenceArray = [...new Set(array1)].filter(
    (x) => !new Set(array2).has(x)
);
console.log(differenceArray); // [1, 2]

// 6.4 唯一值计数
// Set 可以用于快速统计一个数组中唯一值的个数。通过将数组转换为 Set，然后获取 Set 的大小即可。
const arrayWithDuplicates2 = [1, 2, 2, 3, 4, 4, 5];
const uniqueCount = new Set(arrayWithDuplicates2).size;
console.log(uniqueCount); // 5

// 6.5 数据缓存
// Set 可以用于缓存已经处理过的数据，避免重复处理。例如，在处理网络请求时，可以使用 Set 缓存已经请求过的 URL，避免重复请求。
const processedUrls = new Set();
function fetchData(url) {
    if (processedUrls.has(url)) {
        console.log(`Already processed: ${url}`);
        return;
    }
    // 模拟网络请求
    console.log(`Fetching data from: ${url}`);
    processedUrls.add(url);
}
fetchData("https://example.com/api/data1");
fetchData("https://example.com/api/data2");
fetchData("https://example.com/api/data1"); // Already processed: https://example.com/api/data1

// 6.6 权限管理
// Set 可以用于管理用户权限。例如，可以使用 Set 存储用户的权限，方便检查用户是否具有某个权限。
const userPermissions = new Set(["read", "write"]);
function hasPermission(permission) {
    return userPermissions.has(permission);
}
console.log(hasPermission("read")); // true
console.log(hasPermission("delete")); // false

// 7. WeakSet
// WeakSet 是 ES6 引入的一种新的集合数据结构，它与 Set 类似，但是有一些重要的区别。

// 7.1 创建 WeakSet
const weakSet1 = new WeakSet();
const obj1 = { a: 1 };
const obj2 = { b: 2 };
weakSet1.add(obj1);
weakSet1.add(obj2);
console.log(weakSet1.has(obj1)); // true
console.log(weakSet1.has(obj2)); // true

// 7.2 WeakSet 的常用 API
// 7.2.1 add(value) - 向 WeakSet 中添加一个元素
weakSet1.add({ c: 3 }); // 只能添加对象
console.log(weakSet1);

// 7.2.2 delete(value) - 从 WeakSet 中删除一个元素
weakSet1.delete(obj1);
console.log(weakSet1.has(obj1)); // false

// 7.2.3 has(value) - 判断 WeakSet 中是否包含某个元素
console.log(weakSet1.has(obj2)); // true

// 7.3 WeakSet 与 Set 的区别
// 7.3.1 WeakSet 的元素只能是对象，而 Set 的元素可以是任意类型的值。
const setExample = new Set([1, "string", true, { d: 4 }]);
const weakSetExample = new WeakSet();
// weakSetExample.add(1); // TypeError: Invalid value used in weak set
weakSetExample.add({ e: 5 });

// 7.3.2 WeakSet 中的对象是弱引用，如果没有其他引用指向该对象，垃圾回收机制会自动回收该对象。
// 这意味着 WeakSet 中的对象可能会被自动删除，而 Set 中的对象不会。
let obj3 = { f: 6 };
weakSetExample.add(obj3);
console.log("weakSetExample.has(obj3)", weakSetExample.has(obj3)); // true
obj3 = null; // 解除对 obj3 的引用
console.log("weakSetExample.has(obj3)", weakSetExample.has(obj3)); // false
// 由于垃圾回收机制的运行时机不确定，无法保证何时 obj3 会被回收并从 WeakSet 中删除

// 7.4 WeakSet 的使用场景
// 7.4.1 适用于需要存储对象的集合，并且不需要考虑对象的生命周期管理的场景。
// 例如，可以使用 WeakSet 存储已经处理过的 DOM 节点，避免重复处理。
const processedNodes = new WeakSet();
function processNode(node) {
    if (processedNodes.has(node)) {
        console.log("Node already processed");
        return;
    }
    // 处理节点
    console.log("Processing node");
    processedNodes.add(node);
}
const node1 = document.createElement("div");
const node2 = document.createElement("span");
processNode(node1); // Processing node
processNode(node2); // Processing node
processNode(node1); // Node already processed

// 7.4.2 适用于需要存储对象的集合，并且希望对象在不再使用时自动从集合中删除的场景。
// 例如，可以使用 WeakSet 存储缓存的对象，避免内存泄漏。
const cache = new WeakSet();
function cacheObject(obj) {
    cache.add(obj);
    console.log("Object cached");
}
let obj4 = { g: 7 };
cacheObject(obj4); // Object cached
obj4 = null; // 解除对 obj4 的引用，垃圾回收机制会自动回收 obj4 并从 WeakSet 中删除
