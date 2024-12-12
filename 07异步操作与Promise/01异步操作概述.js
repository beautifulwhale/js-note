/**
 * 单线程模式、同步任务与异步任务的区别
 *
 * JavaScript是一种单线程语言，这意味着在同一时间只能执行一个任务。单线程模式的优点是避免了多线程编程中的复杂性，如竞争条件和死锁问题。然而，这也意味着JavaScript需要一种机制来处理耗时任务，以避免阻塞主线程。
 *
 * 同步任务是指在主线程上按顺序执行的任务，每个任务必须等待前一个任务完成后才能开始执行。这种方式的优点是执行顺序明确，代码易于理解，但缺点是如果某个任务耗时较长，会阻塞后续任务的执行，导致页面卡顿或无响应。
 *
 * 异步任务是指不在主线程上立即执行的任务，而是将其放入任务队列中，等待主线程空闲时再执行。异步任务的优点是可以避免阻塞主线程，提高程序的响应速度和性能，但缺点是代码执行顺序不再是线性的，增加了编程的复杂性。
 *
 * 任务队列与事件循环
 *
 * 任务队列（Task Queue）是一个存放异步任务的队列，当异步任务完成时，会将回调函数放入任务队列中，等待主线程空闲时执行。任务队列中的任务按照先入先出的顺序执行。
 *
 * 事件循环（Event Loop）是JavaScript处理异步任务的机制。事件循环的工作原理是不断检查主线程是否空闲，如果空闲则从任务队列中取出一个任务并执行，直到任务队列为空或主线程再次被占用。
 *
 * 任务队列与事件循环的配合工作
 *
 * 1. 主线程执行同步任务，直到任务完成或遇到异步任务。
 * 2. 遇到异步任务时，将其放入任务队列中，并继续执行后续的同步任务。
 * 3. 当主线程空闲时，事件循环从任务队列中取出一个任务并执行。
 * 4. 重复上述过程，直到任务队列为空或主线程再次被占用。
 *
 * 通过任务队列与事件循环的配合工作，JavaScript能够在单线程模式下高效地处理异步任务，避免阻塞主线程，提高程序的响应速度和性能。
 */

// 示例代码
console.log("同步任务1");

setTimeout(() => {
    console.log("异步任务1");
}, 1000);

console.log("同步任务2");

setTimeout(() => {
    console.log("异步任务2");
}, 500);

console.log("同步任务3");

// 输出顺序：
// 同步任务1
// 同步任务2
// 同步任务3
// 异步任务2
// 异步任务1
// 以上输出顺序说明了同步任务按顺序执行，而异步任务在主线程空闲时按任务队列的顺序执行。

/**
 * 常见的异步操作模式
 *
 * 在JavaScript中，有多种方式可以实现异步操作，以下是几种常见的异步操作模式：
 *
 * 1. 回调函数（Callback）
 * 2. 事件监听（Event Listener）
 * 3. 发布订阅模式（Publish-Subscribe）
 * 4. 定时器（Timer）
 * 5. Promise
 * 6. async/await
 */

// 1. 回调函数（Callback）
// 回调函数是一种最基本的异步操作方式，通过将一个函数作为参数传递给另一个函数，在异步操作完成后调用该回调函数。
function fetchData(callback) {
    setTimeout(() => {
        const data = "数据";
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log("回调函数接收到的数据:", data);
});

// 2. 事件监听（Event Listener）
// 事件监听是一种通过监听特定事件来处理异步操作的方式，常用于浏览器中的DOM事件。
const button = document.createElement("button");
button.textContent = "点击我";
button.addEventListener("click", () => {
    console.log("按钮被点击了");
});
document.body.appendChild(button);

// 3. 发布订阅模式（Publish-Subscribe）
// 发布订阅模式是一种通过发布者和订阅者之间的通信来处理异步操作的方式，常用于模块之间的解耦。
const pubSub = {
    events: {},
    subscribe: function (event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    },
    publish: function (event, data) {
        if (this.events[event]) {
            this.events[event].forEach((listener) => listener(data));
        }
    },
};

pubSub.subscribe("dataReceived", (data) => {
    console.log("发布订阅模式接收到的数据:", data);
});

setTimeout(() => {
    pubSub.publish("dataReceived", "数据");
}, 1000);

// 4. 定时器（Timer）
// 定时器是一种通过设定时间间隔来处理异步操作的方式，常用于周期性任务或延时任务。
setTimeout(() => {
    console.log("定时器延时任务");
}, 1000);

setInterval(() => {
    console.log("定时器周期性任务");
}, 2000);

// 5. Promise
// Promise是一种用于处理异步操作的对象，通过then和catch方法来处理异步操作的结果和错误。
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Promise成功");
        } else {
            reject("Promise失败");
        }
    }, 1000);
});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

// 6. async/await
// async/await是基于Promise的语法糖，使得异步代码看起来像同步代码，更加简洁和易读。
async function fetchDataAsync() {
    try {
        const result = await promise;
        console.log("async/await接收到的数据:", result);
    } catch (error) {
        console.error(error);
    }
}

fetchDataAsync();
