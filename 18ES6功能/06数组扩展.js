/**
 * ES6 数组扩展
 *
 * ES6 对数组进行了多方面的扩展，使得数组的操作更加灵活和强大。以下是一些主要的扩展内容：
 *
 * 1. Array.from() - 从类数组或可迭代对象创建一个新的数组实例。
 * 2. Array.of() - 创建一个新的数组实例，使用一组指定的元素。
 * 3. copyWithin() - 在数组内部复制指定位置的元素到另一个位置。
 * 4. find() - 返回数组中满足提供的测试函数的第一个元素的值。
 * 5. findIndex() - 返回数组中满足提供的测试函数的第一个元素的索引。
 * 6. fill() - 用静态值填充数组的所有元素。
 * 7. entries() - 返回一个包含数组键值对的迭代器。
 * 8. keys() - 返回一个包含数组键的迭代器。
 * 9. values() - 返回一个包含数组值的迭代器。
 * 10. includes() - 判断数组是否包含某个值，返回布尔值。
 * 11. flat() - 创建一个新数组，递归地将子数组中的元素合并到该数组中。
 * 12. flatMap() - 首先映射每个元素，然后将结果压平。
 * 13. at() - 通过给定的索引返回数组中的元素，支持负索引。
 * 14. toReversed() - 返回一个新数组，元素顺序反转。
 * 15. toSorted() - 返回一个新数组，元素按升序排序。
 * 16. toSpliced() - 返回一个新数组，删除或替换指定的元素。
 * 17. with() - 返回一个新数组，替换指定索引的元素。
 * 18. Array.prototype.sort() 的排序稳定性。
 */

// 示例：Array.from()
const arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
const arrFrom = Array.from(arrayLike);
console.log(arrFrom); // 输出: ['a', 'b', 'c']

// 示例：Array.of()
const arrOf = Array.of(1, 2, 3);
console.log(arrOf); // 输出: [1, 2, 3]

// 示例：copyWithin()
const arrCopy = [1, 2, 3, 4, 5];
arrCopy.copyWithin(0, 3);
console.log(arrCopy); // 输出: [4, 5, 3, 4, 5]

// 示例：find()
const found = [5, 12, 8, 130, 44].find(element => element > 10);
console.log(found); // 输出: 12

// 示例：findIndex()
const foundIndex = [5, 12, 8, 130, 44].findIndex(element => element > 10);
console.log(foundIndex); // 输出: 1

// 示例：fill()
const filledArray = new Array(3).fill(7);
console.log(filledArray); // 输出: [7, 7, 7]

// 示例：entries()
const entriesArray = ['a', 'b', 'c'];
const entriesIterator = entriesArray.entries();
for (let entry of entriesIterator) {
    console.log(entry); // 输出: [0, 'a'], [1, 'b'], [2, 'c']
}

// 示例：keys()
const keysArray = ['a', 'b', 'c'];
const keysIterator = keysArray.keys();
for (let key of keysIterator) {
    console.log(key); // 输出: 0, 1, 2
}

// 示例：values()
const valuesArray = ['a', 'b', 'c'];
const valuesIterator = valuesArray.values();
for (let value of valuesIterator) {
    console.log(value); // 输出: 'a', 'b', 'c'
}

// 示例：includes()
const includesArray = [1, 2, 3];
console.log(includesArray.includes(2)); // 输出: true
console.log(includesArray.includes(4)); // 输出: false

// 示例：flat()
const flatArray = [1, 2, [3, 4, [5]]];
console.log(flatArray.flat()); // 输出: [1, 2, 3, 4, [5]]

// 示例：flatMap()
const flatMapArray = [1, 2, 3];
console.log(flatMapArray.flatMap(x => [x * 2])); // 输出: [2, 4, 6]

// 示例：at()
const atArray = [1, 2, 3];
console.log(atArray.at(1)); // 输出: 2
console.log(atArray.at(-1)); // 输出: 3

// 示例：toReversed()
const reversedArray = [1, 2, 3];
console.log(reversedArray.toReversed()); // 输出: [3, 2, 1]

// 示例：toSorted()
const sortedArray = [3, 1, 2];
console.log(sortedArray.toSorted()); // 输出: [1, 2, 3]

// 示例：toSpliced()
const splicedArray = [1, 2, 3];
console.log(splicedArray.toSpliced(1, 2, 'a', 'b')); // 输出: [1, 'a', 'b', 3]

// 示例：with()
const withArray = [1, 2, 3];
console.log(withArray.with(1, 'b')); // 输出: [1, 'b', 3]

// 示例：Array.prototype.sort() 的排序稳定性
const stableSortArray = [2, 1, 3, 4, 5];
console.log(stableSortArray.sort()); // 输出: [1, 2, 3, 4, 5]
