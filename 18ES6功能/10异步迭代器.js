/**
 * 异步迭代器 (Asynchronous Iterators)
 *
 * 异步迭代器是 ES2018 引入的一种新特性，用于处理异步数据流。与同步迭代器不同，异步迭代器的 next() 方法返回的是一个 Promise。
 * 异步迭代器的主要用途是处理需要异步获取的序列数据，例如从网络请求中逐步获取数据。
 */

// 1. 异步迭代器的使用
// 要创建一个异步迭代器对象，需要实现一个具有 Symbol.asyncIterator 方法的对象，该方法返回一个具有 next() 方法的对象。
const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next() {
                if (i < 3) {
                    return Promise.resolve({ value: i++, done: false });
                } else {
                    return Promise.resolve({ value: undefined, done: true });
                }
            }
        };
    }
};

// 使用 for await...of 循环遍历异步迭代器
(async () => {
    for await (const num of asyncIterable) {
        console.log(num); // 输出 0, 1, 2
    }
})();

// 2. 异步生成器函数
// 异步生成器函数是一个能够生成异步迭代器的函数。它的语法与普通生成器函数类似，但需要在 function 关键字前加上 async。
async function* asyncGenerator() {
    let i = 0;
    while (i < 3) {
        yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

// 使用 for await...of 循环遍历异步生成器函数返回的异步迭代器
(async () => {
    for await (const num of asyncGenerator()) {
        console.log(num); // 每隔一秒输出 0, 1, 2
    }
})();

// 3. 异步迭代器的实际应用
// 异步迭代器和异步生成器函数在处理需要逐步获取的异步数据时非常有用，例如从 API 获取分页数据。
async function* fetchData(url) {
    let page = 1;
    while (true) {
        const response = await fetch(`${url}?page=${page}`);
        const data = await response.json();
        if (data.length === 0) break;
        yield data;
        page++;
    }
}

// 使用 for await...of 循环遍历异步生成器函数返回的异步迭代器
(async () => {
    const url = "https://api.example.com/data";
    for await (const pageData of fetchData(url)) {
        console.log(pageData); // 输出每页的数据
    }
})();

// 4. 使用 yield* 处理异步生成器函数
// yield* 表达式用于在一个生成器函数中委托另一个生成器函数。对于异步生成器函数，yield* 也可以用于委托另一个异步生成器函数。

async function* asyncGenerator1() {
    yield new Promise(resolve => setTimeout(() => resolve(1), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(2), 1000));
}

async function* asyncGenerator2() {
    yield new Promise(resolve => setTimeout(() => resolve(3), 1000));
    yield* asyncGenerator1(); // 委托 asyncGenerator1
    yield new Promise(resolve => setTimeout(() => resolve(4), 1000));
}

// 使用 for await...of 循环遍历异步生成器函数返回的异步迭代器
(async () => {
    for await (const num of asyncGenerator2()) {
        console.log(num); // 每隔一秒输出 3, 1, 2, 4
    }
})();
