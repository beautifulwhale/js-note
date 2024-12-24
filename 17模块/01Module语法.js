/**
 * ES6模块语法
 */

/**
 * 1. 按需导入导出
 * 按需导入导出是指只导入或导出模块中需要的部分，而不是整个模块。这样可以减少不必要的代码加载，提高性能。
 *
 * 导出：
 * 在模块中，可以使用export关键字按需导出变量、函数或类。
 */
export const myVariable = 42;
export function myFunction() {
    console.log("Hello, world!");
}
export class MyClass {
    constructor() {
        console.log("MyClass instance created");
    }
}

/**
 * 导入：
 * 在另一个模块中，可以使用import关键字按需导入所需的部分。
 */
import { myVariable, myFunction, MyClass } from "./myModule.js";

/**
 * 2. 具名导入导出
 * 具名导入导出是指使用特定的名称导入或导出模块中的部分。
 *
 * 导出：
 * 在模块中，可以使用export关键字具名导出变量、函数或类。
 */
export const namedVariable = 100;
export function namedFunction() {
    console.log("Named function");
}
export class NamedClass {
    constructor() {
        console.log("NamedClass instance created");
    }
}

/**
 * 导入：
 * 在另一个模块中，可以使用import关键字具名导入所需的部分。
 */
import { namedVariable, namedFunction, NamedClass } from "./namedModule.js";

/**
 * 3. 默认导出
 * 默认导出是指一个模块只能有一个默认导出，导出时不需要指定名称。
 *
 * 导出：
 * 在模块中，可以使用export default关键字导出变量、函数或类。
 */
const defaultVariable = 200;
// export default defaultVariable;

// export default function defaultFunction() {
//     console.log("Default function");
// }
// export default const a = 1; // 错误, 因为default已经是被作为了变量 不允许再赋值

/**
 * 导入：
 * 在另一个模块中，可以使用import关键字导入默认导出的部分。
 */
import defaultVariable from "./defaultModule.js";

/**
 * 4. as别名
 * as别名是指在导入或导出时使用as关键字为导入或导出的部分指定一个别名。
 *
 * 导出：
 * 在模块中，可以使用as关键字为导出的部分指定别名。
 */
const originalVariable = 300;
export { originalVariable as aliasVariable };

/**
 * 导入：
 * 在另一个模块中，可以使用as关键字为导入的部分指定别名。
 */
import { aliasVariable as newAliasVariable } from "./aliasModule.js";

/**
 * 5. export与import的混合写法
 * 在一个模块中，可以同时使用export和import关键字进行导入和导出。
 */
import { anotherVariable } from "./anotherModule.js";
export const combinedVariable = anotherVariable + 100;

import { anotherFunction } from "./anotherModule.js";
export function combinedFunction() {
    anotherFunction();
    console.log("Combined function");
}

import { AnotherClass } from "./anotherModule.js";
export class CombinedClass extends AnotherClass {
    constructor() {
        super();
        console.log("CombinedClass instance created");
    }
}

/**
 * 6. 通用的导入导出
 * 通用的导入导出是指使用*和as关键字导入或导出模块中的所有部分。
 */
export * from "./anotherModule.js";
export { a } from "./anotherModule.js";
export { a as b } from "./anotherModule.js";
export { default } from "./anotherModule.js";
export * as c from "./anotherModule.js";

/**
 * 7. import() 函数
 * import() 函数是 JavaScript 中用于动态导入模块的函数。它允许在代码执行时按需加载模块，而不是在编译时静态导入。
 *
 * 原因：
 * 使用 import() 函数的主要原因是为了实现代码分割和按需加载。通过动态导入模块，可以减少初始加载时间，提高应用性能。
 *
 * 返回值：
 * import() 函数返回一个 Promise 对象，该对象在模块加载完成后解析为模块的导出对象。
 *
 * 使用场景：
 * 1. 按需加载：在用户触发某个操作时才加载相关模块，减少初始加载时间。
 * 2. 条件加载：根据不同的条件动态加载不同的模块。
 * 3. 延迟加载：在某些情况下，延迟加载模块以优化性能。
 *
 * 示例：
 * 假设我们有一个模块需要在用户点击按钮时才加载。
 */

document.getElementById("loadButton").addEventListener("click", async () => {
    try {
        const module = await import("./dynamicModule.js");
        module.someFunction();
    } catch (error) {
        console.error("Error loading module:", error);
    }
});

/**
 * 8. import.meta
 * import.meta 是一个包含关于当前模块元数据的对象。它提供了模块的上下文信息，例如模块的 URL。
 *
 * 使用场景：
 * 1. 获取模块的 URL：可以使用 import.meta.url 获取当前模块的 URL，常用于动态加载资源或模块。
 * 2. 获取环境信息：可以通过 import.meta 获取与模块相关的环境信息，例如构建工具提供的自定义元数据。
 *
 * 示例：
 * 假设我们需要获取当前模块的 URL 并在控制台中打印出来。
 */

console.log(import.meta.url);
