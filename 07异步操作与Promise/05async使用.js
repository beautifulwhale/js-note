/**
 * 1. async函数的含义
 * async函数是ES2017引入的一种用于处理异步操作的语法糖。它使得编写和阅读异步代码更加直观和简洁。
 * async函数返回一个Promise对象，可以使用await关键字等待Promise的结果。
 */

async function exampleAsyncFunction() {
    return "Hello, async!";
}

exampleAsyncFunction().then((result) => console.log(result)); // Hello, async!

/**
 * 2. 使用async和await
 * async函数内部可以使用await关键字来等待一个Promise对象的结果。await会暂停async函数的执行，直到Promise对象的结果被解析。
 * 这使得我们可以像编写同步代码一样编写异步代码。
 */

async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

/**
 * 3. await返回的结果如何接收
 * await关键字会暂停async函数的执行，直到Promise对象的结果被解析。我们可以将await表达式的结果赋值给一个变量，从而接收Promise的结果。
 */

async function getNumber() {
    const numberPromise = new Promise((resolve) => {
        setTimeout(() => resolve(42), 1000);
    });
    const number = await numberPromise;
    console.log(number); // 42
}

getNumber();

/**
 * 4. async/await与其他异步操作的区别
 * async/await是基于Promise的语法糖，使得异步代码更加简洁和易读。相比于传统的回调函数和Promise链，async/await可以避免回调地狱和过多的then链。
 * 传统的回调函数和Promise链：
 */

function fetchDataWithCallback(callback) {
    fetch("https://api.example.com/data")
        .then((response) => response.json())
        .then((data) => callback(null, data))
        .catch((error) => callback(error, null));
}

fetchDataWithCallback((error, data) => {
    if (error) {
        console.error("Error fetching data:", error);
    } else {
        console.log(data);
    }
});

/**
 * 使用async/await：
 */

async function fetchDataWithAsync() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchDataWithAsync();

/**
 * 5. 如何按顺序完成多个异步操作
 * 我们可以使用await关键字按顺序等待多个Promise对象的结果，从而按顺序完成多个异步操作。
 */
async function sequentialAsyncOperations() {
    const tasks = [
        () =>
            new Promise((resolve) => setTimeout(() => resolve("First"), 1000)),
        () =>
            new Promise((resolve) => setTimeout(() => resolve("Second"), 1000)),
        () =>
            new Promise((resolve) => setTimeout(() => resolve("Third"), 1000)),
    ];

    for (const task of tasks) {
        const result = await task();
        console.log(result);
    }
}

sequentialAsyncOperations();

/**
 * 6. 并行执行多个异步操作
 * 我们也可以使用Promise.all并行执行多个异步操作，并等待所有操作完成。
 */

async function parallelAsyncOperations() {
    const [result1, result2, result3] = await Promise.all([
        new Promise((resolve) => setTimeout(() => resolve("First"), 1000)),
        new Promise((resolve) => setTimeout(() => resolve("Second"), 1000)),
        new Promise((resolve) => setTimeout(() => resolve("Third"), 1000)),
    ]);

    console.log(result1); // First
    console.log(result2); // Second
    console.log(result3); // Third
}

parallelAsyncOperations();

/**
 * 7. 顶层await
 * 顶层await是指在模块的顶层作用域中使用await关键字，直接等待一个Promise对象的结果。
 * 顶层await的引入使得在模块级别编写异步代码变得更加简洁和直观，避免了嵌套的then链或额外的async函数。
 *
 * 使用场景：
 * 1. 在模块初始化时需要进行异步操作，例如从远程服务器获取配置数据或初始化数据库连接。
 * 2. 在模块导入时需要等待某些异步操作完成，以确保模块的依赖已经准备就绪。
 *
 * 示例：
 * 假设我们有一个模块需要在加载时从远程服务器获取配置数据，并在获取到数据后进行初始化。
 */

// const config = await fetchConfig();

// async function fetchConfig() {
//     const response = await fetch("https://api.example.com/config");
//     if (!response.ok) {
//         throw new Error("Failed to fetch config");
//     }
//     return response.json();
// }

// console.log("Config loaded:", config);

/**
 * 手写async函数，通过生成器的角度去思考
 * async函数是生成器函数的语法糖，它使得编写异步代码更加简洁和直观。
 * 下面是一个手写的async函数示例，通过生成器来实现相同的功能。
 */

function asyncFunction(generatorFunc) {
    return new Promise((resolve, reject) => {
        const generator = generatorFunc();
        function step(nextValue) {
            try {
                const result = generator.next(nextValue);
                if (result.done) {
                    resolve(result.value);
                } else {
                    Promise.resolve(result.value).then(step, reject);
                }
            } catch (error) {
                reject(error);
            }
        }
        step();
    });
}

function* testGenerator() {
    const a = yield Promise.resolve(5);
    const b = yield Promise.resolve(2);
    return a + b;
}

asyncFunction(testGenerator).then(console.log).catch(console.error);
