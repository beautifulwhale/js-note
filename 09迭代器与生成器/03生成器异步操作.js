/**
 * 生成器为何可以实现异步操作
 *
 * 生成器函数（generator function）可以通过 yield 关键字暂停执行，并在需要的时候恢复执行。这种特性使得生成器函数非常适合处理异步操作。
 * 在处理异步操作时，我们可以在每个异步操作前使用 yield 关键字暂停生成器函数的执行，等待异步操作完成后再恢复执行。
 * 这种方式使得代码看起来像是同步执行的，从而提高了代码的可读性和可维护性。
 *
 * 生成器实现异步操作的优势
 *
 * 1. 代码可读性高：生成器函数使得异步代码看起来像是同步执行的，避免了回调地狱（callback hell）的问题。
 * 2. 控制流管理：生成器函数可以通过 yield 关键字暂停和恢复执行，从而实现对异步操作的精细控制。
 * 3. 错误处理：生成器函数可以使用 try...catch 语句来捕获和处理异步操作中的错误，使得错误处理更加简单和直观。
 *
 * 如何实现对异步操作的控制
 *
 * 通过结合生成器函数和 Promise，可以实现对异步操作的控制。具体步骤如下：
 * 1. 定义一个生成器函数，在每个异步操作前使用 yield 关键字暂停执行。
 * 2. 定义一个辅助函数，用于执行生成器函数并处理异步操作的结果。
 * 3. 在辅助函数中，通过调用生成器函数的 next 方法恢复执行，并将异步操作的结果传递回生成器函数。
 *
 * 下面是一个示例代码，展示了如何使用生成器函数和 Promise 来实现对异步操作的控制。
 */

function* asyncGenerator() {
    try {
        const data1 = yield fetchData(1);
        console.log("data1", data1);
        const data2 = yield fetchData(2);
        console.log("data2", data2);
        const data3 = yield fetchData(3);
        console.log("data3", data3);
    } catch (error) {
        console.error("Error:", error);
    }
}

function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.8) {
                reject(`Error fetching data ${id}`);
            } else {
                resolve(`Data ${id}`);
            }
        }, 1000);
    });
}

function run(generator) {
    const iterator = generator();

    function handle(result) {
        if (result.done) return;
        result.value
            .then((data) => {
                handle(iterator.next(data));
            })
            .catch((error) => {
                iterator.throw(error);
            });
    }

    handle(iterator.next());
}

run(asyncGenerator);

/**
 * Thunk 与生成器的结合使用
 *
 * Thunk 函数是一个只接受回调函数作为参数的函数。它可以用来将多参数函数转换为单参数函数。
 * 在异步编程中，Thunk 函数可以用来延迟计算或执行。
 *
 * 下面是一个简单的 Thunk 函数示例：
 */

function thunkify(fn) {
    return function (...args) {
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        };
    };
}

function asyncOperation(value, callback) {
    setTimeout(() => {
        callback(null, value * 2);
    }, 1000);
}

const thunkedAsyncOperation = thunkify(asyncOperation);

function* generatorFunction() {
    const result1 = yield thunkedAsyncOperation(1);
    console.log("result1", result1);
    const result2 = yield thunkedAsyncOperation(result1);
    console.log("result2", result2);
    const result3 = yield thunkedAsyncOperation(result2);
    console.log("result3", result3);
}

function runGenerator(gen) {
    const iterator = gen();

    function handle(err, result) {
        if (err) {
            return iterator.throw(err);
        }
        const next = iterator.next(result);
        if (next.done) return;
        next.value(handle);
    }

    handle();
}

runGenerator(generatorFunction);

/**
 * co 模块与生成器自动执行
 *
 * co 是一个用于自动执行生成器函数的库。它可以让我们更方便地处理异步操作。
 * 使用 co 模块，我们可以将生成器函数中的异步操作自动执行，而不需要手动编写执行逻辑。
 *
 * 下面是一个使用 co 模块的示例：
 */

// const co = require("co");

// function* coGeneratorFunction() {
//     const data1 = yield fetchData(1);
//     console.log("data1", data1);
//     const data2 = yield fetchData(2);
//     console.log("data2", data2);
//     const data3 = yield fetchData(3);
//     console.log("data3", data3);
// }

// co(coGeneratorFunction).catch((error) => {
//     console.error("Error:", error);
// });
