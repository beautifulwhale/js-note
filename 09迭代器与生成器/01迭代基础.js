/**
 * 迭代器详解
 *
 * 迭代器是一个对象，它提供了一个接口，用于遍历一个集合（如数组、字符串等）。迭代器接口定义了一个next()方法，该方法返回一个对象，
 * 该对象包含两个属性：done和value。done是一个布尔值，表示迭代是否完成；value是当前迭代的值。
 *
 * 迭代器接口
 * 迭代器接口是一个包含next()方法的对象，该方法返回一个对象，包含done和value两个属性。
 *
 * 可迭代对象
 * 可迭代对象是实现了[Symbol.iterator]方法的对象，该方法返回一个迭代器。常见的可迭代对象包括数组、字符串、Set、Map、arguments对象、NodeList等。
 *
 * 调用迭代器接口的场合
 * 1. for...of循环
 * 2. 展开运算符（...）
 * 3. 解构赋值
 * 4. Array.from()方法
 * 5. Promise.all()方法
 * 6. Promise.race()方法
 * 7. yield*
 * 8. 其他使用数组作为参数的场合
 *
 * 实现一个迭代器
 * 可以通过实现[Symbol.iterator]方法来创建一个可迭代对象，该方法返回一个迭代器对象。
 */

const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    },
};

for (const value of myIterable) {
    console.log(value); // 输出: 1, 2, 3
}

const getIterator = function () {
    let index = 0;
    return {
        next() {
            return {
                done: false,
                value: index++,
            };
        },
    };
};

const iterator_ = getIterator();
console.log(iterator_.next().value); // 输出: 0
console.log(iterator_.next().value); // 输出: 1
console.log(iterator_.next().value); // 输出: 2

// 使用迭代器接口实现一个可迭代对象
const obj = {
    data: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        let self = this;
        return {
            next() {
                if (index >= self.data.length) {
                    return {
                        done: true,
                        value: undefined,
                    };
                } else {
                    return {
                        done: false,
                        value: self.data[index++],
                    };
                }
            },
        };
    },
};

for (const value of obj) {
    console.log(value); // 输出: 1, 2, 3
}

const obj2 = {
    1: "a",
    2: "b",
    3: "c",
    // 下方a、b、c在for...of中输出时，会输出undefined;
    // a: 'a',
    // b: 'b',
    // c: 'c',
    [Symbol.iterator]() {
        let index = 1;
        let self = this;
        return {
            next() {
                if (index > Object.keys(self).length) {
                    return {
                        done: true,
                        value: undefined,
                    };
                } else {
                    return {
                        done: false,
                        value: self[index++],
                    };
                }
            },
        };
    },
};

for (const value of obj2) {
    console.log("value", value); // 输出: a, b, c
}

/**
 * 默认具有迭代器接口的数据结构
 * 1. Array
 * 2. String
 * 3. Set
 * 4. Map
 * 5. arguments对象
 * 6. NodeList
 *
 * iterator与generator函数的配合使用
 * generator函数是一个返回迭代器的函数，可以使用function*语法定义。generator函数可以使用yield关键字来生成值。
 */

function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
}

const iterator = generatorFunction();
console.log(iterator.next().value); // 输出: 1
console.log(iterator.next().value); // 输出: 2
console.log(iterator.next().value); // 输出: 3

/**
 * 迭代器对象的return、throw函数
 * 迭代器对象可以实现return和throw方法，用于在迭代过程中提前终止迭代或抛出错误。
 */

const customIterable = {
    [Symbol.iterator]() {
        let index = 0;
        return {
            next() {
                if (index < 3) {
                    return { value: index++, done: false };
                } else {
                    return { done: true };
                }
            },
            return() {
                console.log("迭代提前终止");
                return { done: true };
            },
            throw(error) {
                console.log("迭代过程中抛出错误:", error);
                return { done: true };
            },
        };
    },
};

const iterator2 = customIterable[Symbol.iterator]();

console.log(iterator2.next().value); // 输出: 0
console.log(iterator2.next().value); // 输出: 1
console.log(iterator2.return().done); // 输出: 迭代提前终止 true
try {
    iterator2.throw(new Error("自定义错误"));
} catch (e) {
    console.log(e.message); // 输出: 自定义错误
}

/**
 * for...of 详解
 *
 * for...of 是 ES6 引入的一种新的遍历结构，用于遍历可迭代对象（包括数组、Map、Set、字符串、TypedArray、arguments 对象等）。
 * for...of 语句在遍历过程中会调用可迭代对象的 [Symbol.iterator] 方法，返回一个新的迭代器对象。
 *
 * 1. 遍历数组
 */
const array = [1, 2, 3, 4, 5];
for (const value of array) {
    console.log(value); // 输出: 1 2 3 4 5
}

/**
 * 2. 遍历 Map
 */
const map = new Map();
map.set("name", "张三");
map.set("age", 18);
for (const [key, value] of map) {
    console.log(key, value); // 输出: name 张三, age 18
}

/**
 * 3. 遍历 Set
 */
const set = new Set([1, 2, 3, 4, 5]);
for (const value of set) {
    console.log(value); // 输出: 1 2 3 4 5
}

/**
 * 4. 遍历字符串
 */
const string = "Hello";
for (const char of string) {
    console.log(char); // 输出: H e l l o
}

/**
 * 5. 遍历 arguments 对象
 */
function printArguments() {
    for (const arg of arguments) {
        console.log(arg);
    }
}
printArguments(1, 2, 3); // 输出: 1 2 3

/**
 * for...of 与 for...in 的差异与优势
 *
 * 1. for...of 适用于遍历可迭代对象，而 for...in 适用于遍历对象的可枚举属性。
 * 2. for...of 遍历的是值，而 for...in 遍历的是属性名。
 * 3. for...of 不会遍历对象的原型链上的属性，而 for...in 会遍历原型链上的属性。
 * 4. for...of 更适合用于数组、Map、Set 等数据结构的遍历，语法简洁，易于理解。
 * 5. for...in 更适合用于普通对象的属性遍历，但需要注意过滤掉原型链上的属性。
 */
