/**
 * 为什么使用Promise
 *
 * 在JavaScript中，异步操作是非常常见的，例如网络请求、定时器、事件处理等。传统的异步处理方式是通过回调函数来实现的，
 * 但是回调函数的嵌套会导致代码难以维护和阅读，形成所谓的“回调地狱”。
 * Promise的出现就是为了解决这个问题，它提供了一种更优雅的方式来处理异步操作。
 *
 * Promise的优势
 *
 * 1. 链式调用：Promise通过then和catch方法可以实现链式调用，使得代码更加简洁和易读。
 * 2. 错误处理：Promise提供了统一的错误处理机制，通过catch方法可以捕获异步操作中的错误。
 * 3. 状态管理：Promise有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败），
 *    状态一旦改变就不会再变，可以避免回调函数中状态不一致的问题。
 * 4. 更好的语义化：Promise的语法更加语义化，使得代码更容易理解。
 *
 * 解决的问题
 *
 * 1. 回调地狱：Promise通过链式调用和统一的错误处理机制，解决了回调函数嵌套过深的问题。
 * 2. 错误处理分散：传统的回调函数中，错误处理往往分散在各个回调函数中，难以统一管理。Promise通过catch方法可以集中处理错误。
 * 3. 状态不一致：Promise的状态管理机制可以确保异步操作的状态一致，避免了回调函数中状态不一致的问题。
 *
 * Promise的不足
 *
 * 1. 学习成本：对于初学者来说，理解Promise的概念和用法需要一定的学习成本。
 * 2. 链式调用过长：虽然Promise解决了回调地狱的问题，但是链式调用过长时，代码依然会变得难以阅读。
 * 3. 兼容性问题：在一些老旧的浏览器中，Promise可能不被支持，需要引入polyfill来兼容。
 * 4. 无法取消Promise：一旦Promise被创建，就无法取消，只能通过状态来判断是否成功或失败。
 * 5. 无法获取中间值：在链式调用中，无法在中间获取到Promise的值，只能通过then方法来获取。
 * 6. 无法在Promise外部捕获错误：在Promise外部无法捕获错误，只能通过catch方法来捕获。
 */

/**
 * Promise的基本使用
 *
 * Promise是一种用于处理异步操作的对象，通过then和catch方法来处理异步操作的结果和错误。
 * 基本用法如下：
 */

/**
 * resolve方法的作用
 *
 * resolve方法用于将Promise的状态从pending（进行中）变为fulfilled（已成功），并将成功的结果传递给then方法的回调函数。
 *
 * reject方法的作用
 *
 * reject方法用于将Promise的状态从pending（进行中）变为rejected（已失败），并将失败的原因传递给catch方法的回调函数。
 */
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

/**
 * then方法的作用
 *
 * then方法用于在Promise成功时执行回调函数，并将成功的结果传递给回调函数。then方法可以链式调用，返回一个新的Promise对象，从而实现多个异步操作的顺序执行。
 * 基本用法如下：
 */
promise
    .then((result) => {
        console.log("第一个then接收到的数据:", result);
        // return "新的数据";
        return Promise.reject("新的数据");
    })
    .then((newResult) => {
        console.log("第二个then接收到的数据ppppppp:", newResult);
    })
    .catch((error) => {
        console.error("捕获到的错误ppppp:", error);
    });

/**
 * catch方法的作用
 *
 * catch方法用于在Promise失败时执行回调函数，并将失败的原因传递给回调函数。catch方法可以链式调用，返回一个新的Promise对象，从而实现多个异步操作的错误处理。
 * 基本用法如下：
 */
const failingPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = false;
        if (success) {
            resolve("Promise成功");
        } else {
            reject("Promise失败");
        }
    }, 1000);
});

failingPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error("捕获到的错误:", error);
    });

/**
 * 链式调用
 *
 * then和catch方法可以链式调用，从而实现多个异步操作的顺序执行和统一的错误处理。链式调用的基本用法如下：
 */
const anotherPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Promise成功");
        } else {
            reject("Promise失败");
        }
    }, 1000);
});

anotherPromise
    .then((result) => {
        console.log("第一个then接收到的数据:", result);
        throw new Error("新的错误");
        // return "新的数据";
    })
    .then((newResult) => {
        console.log("第二个then接收到的数据:", newResult);
    })
    .catch((error) => {
        console.error("捕获到的错误xxx:", error);
    });

/**
 * finally的使用场景
 *
 * finally方法用于在Promise执行结束后，无论结果是成功还是失败，都会执行的操作。常用于清理资源、关闭连接等操作。
 * 基本用法如下：
 */
const promiseWithFinally = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("Promise成功");
        } else {
            reject("Promise失败");
        }
    }, 1000);
});

promiseWithFinally
    .then((result) => {
        console.log("接收到的数据:", result);
    })
    .catch((error) => {
        console.error("捕获到的错误:", error);
    })
    .finally(() => {
        console.log("Promise已结束，无论成功还是失败都会执行");
    });

/**
 * Promise.all的使用方法
 *
 * Promise.all方法用于将多个Promise实例组合成一个新的Promise实例。该方法接收一个包含多个Promise实例的数组，并返回一个新的Promise实例。新的Promise实例在所有传入的Promise实例都成功时才会成功，如果有任何一个Promise实例失败，则新的Promise实例会失败。
 *
 * 基本用法如下：
 */
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise1成功");
    }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise2成功");
    }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise3失败");
    }, 3000);
});

Promise.all([promise1, promise2, promise3])
    .then((results) => {
        console.log("所有Promise成功:", results);
    })
    .catch((error) => {
        console.error("捕获到的错误all:", error); // 捕获到的错误: Promise3失败
    });

/**
 * 注意事项：
 * 1. Promise.all接收的数组中的Promise实例是并行执行的，而不是按顺序执行的。
 * 2. 如果数组中的任何一个Promise实例失败，Promise.all返回的Promise实例会立即失败，并且不会等待其他Promise实例的结果。
 * 3. Promise.all返回的Promise实例的结果是一个数组，数组中的元素对应于传入的Promise实例的结果，顺序与传入的Promise实例的顺序一致。
 *
 * 常用场景：
 * 1. 并行执行多个异步操作，并在所有操作完成后执行某个操作。例如，加载多个资源文件，并在所有文件加载完成后进行处理。
 * 2. 同时发起多个网络请求，并在所有请求完成后处理返回的数据。例如，获取多个API的结果，并在所有结果返回后进行数据整合。
 * 3. 执行多个相互独立的异步任务，并在所有任务完成后执行某个操作。例如，处理多个文件，并在所有文件处理完成后进行汇总。
 */
const p1 = new Promise((resolve, reject) => {
    resolve("p1成功");
})
    .then((result) => {
        console.log("p1接收到的数据:", result);
        return "p1新的数据";
    })
    .catch((error) => {
        console.error("捕获到的错误:", error);
    });

const p2 = new Promise((resolve, reject) => {
    reject("p2失败111");
}).then((result) => {
    console.log("p2接收到的数据:", result);
});

Promise.all([p1, p2])
    .then((results) => {
        console.log("所有Promise成功:", results);
    })
    .catch((error) => {
        console.error("捕获到的错误all1:", error);
    });

/**
 * Promise.race
 *
 * Promise.race方法接收一个Promise实例的数组，并返回一个新的Promise实例。
 * 只要数组中的任何一个Promise实例率先改变状态，Promise.race返回的Promise实例就会跟着改变状态。
 *
 * 基本使用：
 */
const racePromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("racePromise1成功");
    }, 1000);
});

const racePromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("racePromise2失败");
    }, 2000);
});

Promise.race([racePromise1, racePromise2])
    .then((result) => {
        console.log("Promise.race成功:", result); // Promise.race成功: racePromise1成功
    })
    .catch((error) => {
        console.error("Promise.race捕获到的错误:", error);
    });

/**
 * Promise.allSettled
 *
 * Promise.allSettled方法接收一个Promise实例的数组，并返回一个新的Promise实例。
 * 当数组中的所有Promise实例都已完成（无论是成功还是失败），Promise.allSettled返回的Promise实例就会完成。
 * 返回的结果是一个数组，数组中的每个元素是一个对象，表示对应的Promise实例的结果。
 *
 * 基本使用：
 */
const allSettledPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("allSettledPromise1成功");
    }, 1000);
});

const allSettledPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("allSettledPromise2失败");
    }, 2000);
});

Promise.allSettled([allSettledPromise1, allSettledPromise2]).then((results) => {
    console.log("Promise.allSettled结果:", results);
    // [
    //     { status: "fulfilled", value: "allSettledPromise1成功" },
    //     { status: "rejected", reason: "allSettledPromise2失败" }
    // ]
});

/**
 * Promise.any
 *
 * Promise.any方法接收一个Promise实例的数组，并返回一个新的Promise实例。
 * 只要数组中的任何一个Promise实例成功，Promise.any返回的Promise实例就会成功。
 * 如果数组中的所有Promise实例都失败，Promise.any返回的Promise实例会失败，并抛出一个AggregateError错误。
 *
 * 基本使用：
 */
const anyPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("anyPromise1失败");
    }, 1000);
});

const anyPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("anyPromise2成功");
    }, 2000);
});

Promise.any([anyPromise1, anyPromise2])
    .then((result) => {
        console.log("Promise.any成功:", result); // Promise.any成功: anyPromise2成功
    })
    .catch((error) => {
        console.error("Promise.any捕获到的错误:", error);
    });

/**
 * Promise.resolve
 *
 * Promise.resolve方法返回一个以给定值解析后的Promise对象。如果该值是一个Promise对象，则直接返回该Promise对象；如果该值是一个thenable对象（即带有then方法的对象），返回的Promise对象会“跟随”这个thenable对象，采用它的最终状态；否则返回的Promise对象将以该值为成功状态。
 *
 * 基本使用：
 */

// 1. 传入一个Promise对象
const resolvedPromise = Promise.resolve(
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("传入Promise对象");
        }, 1000);
    })
);
resolvedPromise.then((result) => {
    console.log("Promise.resolve传入Promise对象:", result); // Promise.resolve传入Promise对象: 传入Promise对象
});

// 2. 传入一个thenable对象
const thenable = {
    then: function (resolve, reject) {
        setTimeout(() => {
            resolve("传入thenable对象");
        }, 1000);
    },
};
const resolvedThenable = Promise.resolve(thenable);
resolvedThenable.then((result) => {
    console.log("Promise.resolve传入thenable对象:", result); // Promise.resolve传入thenable对象: 传入thenable对象
});

// 3. 传入一个非Promise对象的值
const resolvedValue = Promise.resolve("传入非Promise对象的值");
resolvedValue.then((result) => {
    console.log("Promise.resolve传入非Promise对象的值:", result); // Promise.resolve传入非Promise对象的值: 传入非Promise对象的值
});

// 4. 不传入值
const resolvedUndefined = Promise.resolve();
resolvedUndefined.then((result) => {
    console.log("Promise.resolve不传入值:", result); // Promise.resolve不传入值: undefined
});

/**
 * Promise.reject
 *
 * Promise.reject方法返回一个带有拒绝原因的Promise对象。与Promise.resolve类似，Promise.reject方法也可以传入一个值作为拒绝原因。
 *
 * 基本使用：
 */
const rejectedPromise = Promise.reject("Promise被拒绝的原因");
rejectedPromise.catch((error) => {
    console.error("Promise.reject捕获到的错误:", error); // Promise.reject捕获到的错误:   Promise被拒绝的原因
});

/**
 * Promise.try提案
 *
 * Promise.try提案旨在解决在Promise构造函数中同步代码抛出异常的问题。通常情况下，我们在Promise构造函数中编写异步代码，但如果其中包含同步代码且抛出异常，Promise将无法捕获该异常。Promise.try提案提供了一种更优雅的方式来处理这种情况。
 *
 * 基本使用：
 */
Promise.try = function (callback) {
    return new Promise((resolve, reject) => {
        try {
            resolve(callback());
        } catch (error) {
            reject(error);
        }
    });
};

// 示例：使用Promise.try处理同步和异步代码
Promise.try(() => {
    // 同步代码
    console.log("同步代码执行");
    // 模拟同步代码抛出异常
    if (Math.random() > 0.5) {
        throw new Error("同步代码异常");
    }
    // 异步代码
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("异步代码执行完毕");
        }, 1000);
    });
})
    .then((result) => {
        console.log("Promise.try成功:", result);
    })
    .catch((error) => {
        console.error("Promise.try捕获到的错误:", error);
    });

/**
 * Promise.try的优势
 *
 * 1. 统一处理同步和异步代码：Promise.try可以同时处理同步和异步代码，避免了在Promise构造函数中编写同步代码时无法捕获异常的问题。
 * 2. 代码更加简洁：使用Promise.try可以使代码更加简洁，减少了try/catch块的使用。
 * 3. 提高代码可读性：Promise.try使得代码的意图更加明确，易于理解和维护。
 */
