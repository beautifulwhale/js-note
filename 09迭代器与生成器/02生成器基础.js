/**
 * ES6 Generator 基本使用
 *
 * Generator 是 ES6 引入的一种异步编程解决方案，语法上类似于传统的函数，但有一些显著的区别。
 * Generator 函数使用 function* 关键字定义，函数体内部使用 yield 关键字来定义不同的阶段。
 */

// 1. Generator 函数的定义
function* generatorFunction() {
    yield "第一阶段";
    yield "第二阶段";
    yield "第三阶段";
    return "结束";
}

// 2. 使用 Generator 函数
const generator = generatorFunction();
console.log(generator.next()); // { value: '第一阶段', done: false }
console.log(generator.next()); // { value: '第二阶段', done: false }
console.log(generator.next()); // { value: '第三阶段', done: false }
console.log(generator.next()); // { value: '结束', done: true }

/**
 * yield 关键字的作用
 *
 * yield 关键字用于暂停和恢复 Generator 函数的执行。每次调用 next() 方法时，Generator 函数会从上一次暂停的地方继续执行，直到遇到下一个 yield 语句。
 * yield 语句的返回值是一个对象，包含两个属性：value 和 done。value 是 yield 表达式的值，done 是一个布尔值，表示 Generator 函数是否已经执行完毕。
 */

// 3. yield 表达式的种类
function* generatorFunction2() {
    console.log("开始执行");
    yield 1; // 返回数字
    console.log("执行到 yield 1");
    yield "字符串"; // 返回字符串
    console.log("执行到 yield 字符串");
    yield [1, 2, 3]; // 返回数组
    console.log("执行到 yield 数组");
    yield { name: "张三" }; // 返回对象
    console.log("执行到 yield 对象!!!");
}

const generator2 = generatorFunction2();
console.log(generator2.next().value); // 1
console.log(generator2.next().value); // 字符串
console.log(generator2.next().value); // [1, 2, 3]
console.log(generator2.next().value); // { name: '张三' }
console.log(generator2.next().value); // undefined

/**
 * next() 方法的参数
 *
 * next() 方法可以接受一个参数，这个参数会被当作上一个 yield 表达式的返回值。
 * 通过这种方式，可以在 Generator 函数的执行过程中向其传递数据。
 */

// 4. next() 方法的参数示例
function* generatorFunction3() {
    const value1 = yield 1;
    console.log(value1); // 传递给第一个 yield 的值
    const value2 = yield 2;
    console.log(value2); // 传递给第二个 yield 的值
    yield 3;
}

const generator3 = generatorFunction3();
console.log(generator3.next().value); // 1
console.log(generator3.next("传递给第一个 yield 的值").value); // 2
console.log(generator3.next("传递给第二个 yield 的值").value); // 3
console.log(generator3.next().done); // true

// 5. next() 方法不传递值的示例
function* generatorFunction4() {
    const value1 = yield 1;
    console.log("value1", value1); // 未传递值，输出 undefined
    const value2 = yield value1 + 2; // value1 为 undefined，value1 + 2 结果为 NaN
    console.log("value2", value2); // 未传递值，输出 undefined
    yield value2 + 3; // value2 为 undefined，value2 + 3 结果为 NaN
}

const generator4 = generatorFunction4();
console.log(generator4.next().value); // 1
console.log(generator4.next().value); // NaN
console.log(generator4.next(5).value); // 8
console.log(generator4.next().done); // true

/**
 * generator 的 throw 方法
 *
 * throw 方法用于在 Generator 函数内部抛出错误，并且可以在外部捕获该错误。
 */
function* generatorFunction5() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (error) {
        console.log("捕获到错误:", error.message);
    }
}

const generator5 = generatorFunction5();
console.log(generator5.next().value); // 1
console.log(generator5.next().value); // 2
console.log(generator5.throw(new Error("自定义错误")).value); // 捕获到错误: 自定义错误

/**
 * generator 的异常捕获
 *
 * 可以通过在生成器函数内部抛出异常，并在函数外部捕获该异常来实现。
 */
function* generatorFunction7() {
    yield 1;
    yield 2;
    throw new Error("生成器内部错误");
    yield 3;
}

const generator7 = generatorFunction7();
try {
    console.log(generator7.next().value); // 1
    console.log(generator7.next().value); // 2
    console.log(generator7.next().value); // 生成器内部错误
} catch (error) {
    console.log("捕获到生成器内部错误:", error.message); // 捕获到生成器内部错误: 生成器内部错误
}

/**
 * generator 的 return 方法
 *
 * return 方法用于提前终止 Generator 函数的执行，并返回给定的值。
 */
function* generatorFunction6() {
    yield 1;
    yield 2;
    yield 3;
}

const generator6 = generatorFunction6();
console.log(generator6.next().value); // 1
console.log(generator6.return("提前终止").value); // 提前终止
console.log(generator6.next().done); // true

/**
 * generator 的 return 方法与 finally
 *
 * 当调用 return 方法时，如果生成器函数内部存在 finally 代码块，finally 代码块会在生成器函数终止前执行。
 */
function* generatorFunction8() {
    try {
        yield 1;
        yield 2;
    } finally {
        console.log("执行 finally 代码块");
    }
    yield 3;
}

const generator8 = generatorFunction8();
console.log(generator8.next().value); // 1
console.log(generator8.return("提前终止").value); // 执行 finally 代码块 提前终止
console.log(generator8.next().done); // true

/**
 * 总结 generator 的 next、throw 和 return 方法的异同点
 *
 * 1. next 方法
 * - 用途: 用于恢复生成器函数的执行，并返回一个对象，表示当前的迭代结果。
 * - 参数: 可选，传递给生成器函数的值，作为上一个 yield 表达式的返回值。
 * - 返回值: 一个对象，包含 done 和 value 两个属性。done 表示生成器函数是否执行完毕，value 表示当前 yield 表达式的返回值。
 *
 * 2. throw 方法
 * - 用途: 用于在生成器函数内部抛出一个错误，并恢复生成器函数的执行。
 * - 参数: 必须，抛出的错误对象。
 * - 返回值: 如果生成器函数内部捕获了错误，则返回一个对象，包含 done 和 value 两个属性。done 表示生成器函数是否执行完毕，value 表示当前 yield 表达式的返回值。
 *
 * 3. return 方法
 * - 用途: 用于提前终止生成器函数的执行，并返回给定的值。
 * - 参数: 可选，作为生成器函数的返回值。
 * - 返回值: 一个对象，包含 done 和 value 两个属性。done 始终为 true，value 表示传递给 return 方法的值。
 *
 * 异同点总结:
 * - 相同点: next、throw 和 return 方法都会恢复生成器函数的执行，并返回一个包含 done 和 value 属性的对象。
 * - 不同点:
 *   - next 方法用于正常恢复生成器函数的执行，可以传递一个值作为上一个 yield 表达式的返回值。
 *   - throw 方法用于在生成器函数内部抛出一个错误，并恢复生成器函数的执行。
 *   - return 方法用于提前终止生成器函数的执行，并返回给定的值，done 始终为 true。
 */

/**
 * yield* 表达式
 *
 * yield* 表达式用于在一个生成器函数中委托另一个可迭代对象（如另一个生成器函数、数组、字符串等）的迭代。
 * 它可以将生成器函数的控制权交给另一个可迭代对象，直到该对象迭代完成为止。
 *
 * 为什么需要 yield* 表达式？
 * 1. 简化代码：使用 yield* 表达式可以简化生成器函数中嵌套迭代的代码，使代码更加简洁和易读。
 * 2. 代码复用：通过委托迭代，可以将通用的迭代逻辑封装在一个生成器函数中，并在其他生成器函数中复用。
 * 3. 组合生成器：yield* 表达式允许生成器函数之间进行组合，使得生成器函数可以像积木一样组合在一起，形成更复杂的迭代逻辑。
 *
 * yield* 表达式的作用：
 * 1. 委托迭代：将生成器函数的控制权交给另一个可迭代对象，直到该对象迭代完成为止。
 * 2. 传递值：yield* 表达式可以将传递给生成器函数的值传递给委托的可迭代对象，并将委托对象的返回值作为 yield* 表达式的返回值。
 * 3. 捕获异常：yield* 表达式可以捕获委托对象在迭代过程中抛出的异常，并在生成器函数中进行处理。
 *
 * 示例：
 */

// 示例 1：委托另一个生成器函数的迭代
function* generatorA() {
    yield 1;
    yield 2;
    return "结束";
}

function* generatorB() {
    const result = yield* generatorA();
    console.log("result---", result);
    yield 3;
}

const iteratorB = generatorB();
console.log(iteratorB.next().value); // 1
console.log(iteratorB.next().value); // 2
console.log(iteratorB.next().value); // 3
console.log(iteratorB.next().done); // true

// 示例 2：委托数组的迭代
function* generatorC() {
    yield* [4, 5, 6];
    yield 7;
}

const iteratorC = generatorC();
console.log(iteratorC.next().value); // 4
console.log(iteratorC.next().value); // 5
console.log(iteratorC.next().value); // 6
console.log(iteratorC.next().value); // 7
console.log(iteratorC.next().done); // true

// 示例 3：传递值和捕获异常
function* generatorD() {
    try {
        yield* generatorE();
    } catch (error) {
        console.log("捕获异常了:", error);
    }
}

function* generatorE() {
    yield 8;
    throw new Error("自定义错误");
}

const iteratorD = generatorD();
console.log(iteratorD.next().value); // 8
console.log(iteratorD.next().done); // 捕获异常了: 自定义错误 true

// 示例 4: 使用生成器的 yield* 实现数组的扁平化处理
function* flatten(array) {
    for (const item of array) {
        if (Array.isArray(item)) {
            yield* flatten(item);
        } else {
            yield item;
        }
    }
}

const nestedArray = [1, [2, [3, 4], 5], 6];
const flatIterator = flatten(nestedArray);

console.log([...flatIterator]); // 输出: [1, 2, 3, 4, 5, 6]

/**
 * 生成器函数中的 this 指向
 *
 * 在生成器函数中，this 默认指向全局对象（在浏览器中是 window，在 Node.js 中是 global）。
 * 如果需要访问和修改 this 上的属性，可以通过在生成器函数中显式绑定 this 来实现。
 */

function* generatorF() {
    this.value = 10;
    yield this.value;
    // console.log("this", this);
    this?.increment?.();
    yield this.value;
}

generatorF.prototype.increment = function () {
    this.value++;
};

const obj2 = generatorF();
console.log(obj2.next().value); // 输出: 10
console.log("obj2.value", obj2.value); // 输出: undefined
console.log(obj2.next().value); // 输出: 10

const obj = generatorF.call(generatorF.prototype);
console.log(obj.next().value); // 输出: 10
console.log("obj.value", obj.value); // 输出: 10
console.log(obj.next().value); // 输出: 11

/**
 * 生成器的应用
 *
 * 生成器不仅仅是一个可以暂停和恢复的函数，它们在实际开发中有很多应用场景。下面我们从三个方面详细介绍生成器的应用：
 * 1. 把异步操作同步化表达
 * 2. 控制流管理
 * 3. 部署 iterator 接口
 */

// 1. 把异步操作同步化表达
// 生成器可以用来处理异步操作，使得代码看起来像是同步执行的。通过结合 Promise 和生成器，可以实现类似于 async/await 的效果。

function* asyncGenerator() {
    const data1 = yield fetchData(1);
    console.log("data1", data1);
    const data2 = yield fetchData(2);
    console.log("data2", data2);
    const data3 = yield fetchData(3);
    console.log("data3", data3);
}

function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data ${id}`);
        }, 1000);
    });
}

function run(generator) {
    const iterator = generator();

    function handle(result) {
        if (result.done) return;
        result.value.then((data) => {
            handle(iterator.next(data));
        });
    }

    handle(iterator.next());
}

run(asyncGenerator);

// 2. 控制流管理
// 生成器可以用来管理复杂的控制流，特别是在需要暂停和恢复执行的场景中。下面是一个简单的例子，展示了如何使用生成器来管理控制流。

// 经典的控制流管理例子：任务队列

function* taskQueue() {
    console.log("任务1开始");
    yield;
    console.log("任务1结束");

    console.log("任务2开始");
    yield;
    console.log("任务2结束");

    console.log("任务3开始");
    yield;
    console.log("任务3结束");
}

const tasks = taskQueue();

function runTasks() {
    const task = tasks.next();
    if (!task.done) {
        setTimeout(runTasks, 2000); // 模拟异步操作，每秒执行一个任务
    }
}

runTasks();

// 3. 部署 iterator 接口
// 生成器可以用来轻松地部署 iterator 接口，使得对象可以被迭代。下面是一个例子，展示了如何使用生成器来实现自定义的迭代器。

const iterableObject = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    },
};

for (const value of iterableObject) {
    console.log(value); // 输出: 1, 2, 3
}
