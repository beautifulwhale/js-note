/**
 * JavaScript 数组基础知识点和常用操作示例
 */

// 1. 数组的本质
// JavaScript中的数组本质上是一个特殊的对象
// 数组的索引其实是字符串类型的属性名
const arr = ["a", "b", "c"];
console.log(typeof arr); // 'object'
console.log(Object.keys(arr)); // ['0', '1', '2']

// 2. length属性
// length属性可读可写
const arr2 = ["a", "b", "c"];
console.log(arr2.length); // 3
arr2.length = 2; // 截断数组
console.log(arr2); // ['a', 'b']
arr2.length = 4; // 增加长度,空位用undefined填充
console.log(arr2); // ['a', 'b', undefined, undefined]

// 3. 数组的遍历方式
const arr3 = ["a", "b", "c"];

// 3.1 for循环
for (let i = 0; i < arr3.length; i++) {
    console.log(arr3[i]);
}

// 3.2 for...of (推荐,可以使用break/continue)
for (const item of arr3) {
    console.log(item);
}

// 3.3 forEach (不能break/continue)
arr3.forEach((item, index) => {
    console.log(item, index);
});

// 3.4 map (返回新数组)
const newArr = arr3.map((item) => item.toUpperCase());

// 4. 常用数组API
const arr4 = ["a", "b", "c"];

// 4.1 添加/删除元素
arr4.push("d"); // 尾部添加
arr4.pop(); // 尾部删除
arr4.unshift("x"); // 头部添加
arr4.shift(); // 头部删除
arr4.splice(1, 1, "y"); // 任意位置增删改

// 4.2 数组切片
const slice1 = arr4.slice(1, 2); // 不改变原数组

// 4.3 数组合并
const arr5 = arr4.concat(["d", "e"]);

// 4.4 查找元素
console.log(arr4.indexOf("b")); // 返回索引或-1
console.log(arr4.includes("b")); // 返回true/false
const found = arr4.find((item) => item > "b"); // 返回第一个满足条件的元素
const foundIndex = arr4.findIndex((item) => item > "b"); // 返回第一个满足条件的索引

// 4.5 数组排序
arr4.reverse(); // 反转数组
arr4.sort(); // 排序(按字符串规则)

// 4.6 数组转换
console.log(arr4.join("-")); // 转换为字符串
console.log(arr4.toString()); // 转换为字符串

// 4.7 数组归并
const sum = [1, 2, 3].reduce((acc, cur) => acc + cur, 0);

// 5. 类数组转换
// 5.1 arguments对象
function test() {
    // 方法1: Array.from
    const args1 = Array.from(arguments);

    // 方法2: 扩展运算符
    const args2 = [...arguments];

    // 方法3: Array.prototype.slice
    const args3 = Array.prototype.slice.call(arguments);
}

// 5.2 NodeList对象
// document.querySelectorAll返回的NodeList也是类数组,可以用同样方式转换
// const elements = Array.from(document.querySelectorAll('div'));

// 5.3 字符串
const chars = Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']

// 6. 数组的其他常用API

// 6.1 遍历相关
const arr6 = [1, 2, 3, 4, 5];

// forEach - 遍历数组
arr6.forEach((item, index) => {
    console.log(item, index);
});

// map - 映射新数组
const doubled = arr6.map(x => x * 2); // [2, 4, 6, 8, 10]

// filter - 过滤数组
const evenNums = arr6.filter(x => x % 2 === 0); // [2, 4]

// every - 检查是否所有元素都满足条件
const allPositive = arr6.every(x => x > 0); // true

// some - 检查是否存在元素满足条件
const hasEven = arr6.some(x => x % 2 === 0); // true

// 6.2 填充相关
const arr7 = new Array(3);
arr7.fill(7); // [7, 7, 7]

// 6.3 扁平化相关
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]

// flatMap - 先map后flat
const sentences = ["Hello world", "JavaScript array"];
const words = sentences.flatMap(x => x.split(" ")); // ["Hello", "world", "JavaScript", "array"]

// 6.4 复制部分数组
const arr8 = [1, 2, 3, 4, 5];
arr8.copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]

// 6.5 数组键值对
const arr9 = ["a", "b", "c"];
for (let [index, value] of arr9.entries()) {
    console.log(index, value);
}

// 6.6 数组转换为键值对
const keys = arr9.keys(); // 索引迭代器
const values = arr9.values(); // 值迭代器
const entries = arr9.entries(); // 键值对迭代器

// 6.7 查找最后一个匹配元素
const arr10 = [1, 2, 3, 2, 1];
console.log(arr10.lastIndexOf(2)); // 3
const lastBig = arr10.findLast(x => x > 2); // 3
const lastBigIndex = arr10.findLastIndex(x => x > 2); // 2
