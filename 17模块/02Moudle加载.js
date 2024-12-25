/**
 * 浏览器的加载方式
 * 浏览器加载 JavaScript 文件的方式有多种，主要包括同步加载和异步加载。
 *
 * 1. 同步加载：
 *    默认情况下，浏览器会同步加载 JavaScript 文件，这意味着在加载和执行 JavaScript 文件时，浏览器会阻塞后续的 HTML 解析和渲染。
 *    示例：
 *    <script src="script.js"></script>
 *
 * 2. 异步加载：
 *    异步加载可以通过设置 script 标签的 async 或 defer 属性来实现。
 *
 *    - async 属性：
 *      使用 async 属性的 script 标签会异步加载 JavaScript 文件，但加载完成后会立即执行，可能会打断 HTML 的解析。
 *      示例：
 *      <script src="script.js" async></script>
 *
 *    - defer 属性：
 *      使用 defer 属性的 script 标签会异步加载 JavaScript 文件，并在 HTML 解析完成后按顺序执行。
 *      示例：
 *      <script src="script.js" defer></script>
 *
 * 使用 type="module" 加载的注意点
 * 使用 type="module" 属性可以加载 ES6 模块，但需要注意以下几点：
 *
 * 1. 模块默认是延迟执行的：
 *    使用 type="module" 的 script 标签会自动延迟执行，类似于使用了 defer 属性。
 *    示例：
 *    <script type="module" src="module.js"></script>
 *
 * 2. 模块的作用域是独立的：
 *    模块中的变量和函数不会污染全局作用域，每个模块都有自己的作用域。
 *
 * 3. 模块的导入和导出：
 *    可以使用 import 和 export 关键字在模块之间导入和导出变量、函数、类等。
 *    示例：
 *    // module.js
 *    export const a = 1;
 *    export function foo() {
 *        console.log("foo");
 *    }
 *
 *    // main.js
 *    import { a, foo } from './module.js';
 *    console.log(a); // 1
 *    foo(); // foo
 *
 * 4. 模块的路径必须是相对或绝对路径：
 *    使用 import 导入模块时，路径必须是相对路径或绝对路径，不能省略文件扩展名。
 *    示例：
 *    import { a } from './module.js'; // 正确
 *    import { a } from 'module'; // 错误
 *
 * 5. 模块的跨域加载：
 *    如果需要跨域加载模块，需要服务器设置 CORS 头部，允许跨域请求。
 *    示例：
 *    Access-Control-Allow-Origin: *
 *
 * 6. 浏览器兼容性：
 *    并非所有浏览器都支持 ES6 模块，使用前需要检查浏览器的兼容性。
 */

/**
 * ES Module 和 CommonJS 的差异
 *
 * 1. 语法差异：
 *    - ES Module 使用 import 和 export 关键字导入和导出模块。
 *      示例：
 *      // 导出
 *      export const a = 1;
 *      export function foo() {
 *          console.log("foo");
 *      }
 *
 *      // 导入
 *      import { a, foo } from './module.js';
 *      console.log(a); // 1
 *      foo(); // foo
 *
 *    - CommonJS 使用 require() 函数导入模块，使用 module.exports 或 exports 对象导出模块。
 *      示例：
 *      // 导出
 *      const a = 1;
 *      function foo() {
 *          console.log("foo");
 *      }
 *      module.exports = { a, foo };
 *
 *      // 导入
 *      const { a, foo } = require('./module');
 *      console.log(a); // 1
 *      foo(); // foo
 *
 * 2. 模块加载时机：
 *    - ES Module 是静态加载的，在编译时就确定了模块的依赖关系，并且会提前加载所有依赖的模块。
 *    - CommonJS 是动态加载的，在代码运行时才加载模块。
 *
 * 3. 同步异步:
 *    - ES Module 是异步加载的，使用 await 和 async 关键字。
 *    - CommonJS 是同步加载的，使用 require() 函数。
 *
 * 4. 输出: (重要***)
 *    - ES Module 输出的是值的引用，修改后会影响原模块。
 *    - CommonJS 输出的是值的拷贝，修改后不会影响原模块。
 *
 * 5. 模块作用域：
 *    - ES Module 中，每个模块都有自己的作用域，模块中的变量和函数不会污染全局作用域。
 *    - CommonJS 中，每个模块也有自己的作用域，但可以通过 global 对象访问全局作用域。
 *
 * 5. this 关键字：
 *    - 在 ES Module 中，顶层的 this 是 undefined。
 *    - 在 CommonJS 中，顶层的 this 指向当前模块的 exports 对象。
 *
 * 6. 导出方式：
 *    - ES Module 支持命名导出和默认导出，可以在一个模块中同时使用多种导出方式。
 *      示例：
 *      export const a = 1;
 *      export default function() {
 *          console.log("default export");
 *      }
 *
 *    - CommonJS 只支持单一导出，通过 module.exports 导出一个对象。
 *      示例：
 *      module.exports = {
 *          a: 1,
 *          foo: function() {
 *              console.log("foo");
 *          }
 *      };
 *
 * 7. 浏览器支持：
 *    - ES Module 是原生支持的，可以直接在浏览器中使用 <script type="module"> 标签加载。
 *    - CommonJS 主要用于 Node.js 环境，浏览器中需要使用打包工具（如 Browserify 或 Webpack）进行转换。
 */

/**
 * package.json 中的模块导入导出配置项：
 *
 * 1. "type" 字段：
 *    - "type" 字段用于指定项目的模块类型，可以是 "commonjs" 或 "module"。
 *    - 如果设置为 "module"，则项目中的所有文件将被视为 ES Module。
 *    - 如果未设置 "type" 字段或设置为 "commonjs"，则项目中的所有文件将被视为 CommonJS 模块。
 *    示例：
 *    {
 *      "type": "module"
 *    }
 *
 * 2. "main" 字段：
 *    - "main" 字段用于指定项目的入口文件。
 *    - 对于 CommonJS 项目，入口文件通常是一个 .js 文件。
 *    - 对于 ES Module 项目，入口文件可以是 .js 或 .mjs 文件。
 *    示例：
 *    {
 *      "main": "index.js"
 *    }
 *
 * 3. "exports" 字段：
 *    - "exports" 字段用于定义模块的导出方式，可以指定不同的导出路径和格式。
 *    - 可以为不同的环境（如 Node.js 和浏览器）指定不同的导出路径。
 *    示例：
 *    {
 *      "exports": {
 *        ".": "./index.js",  // 默认导出
 *        "./feature": "./src/feature.js"  // 子路径名称
 *      }
 *    }
 *    - 在 "exports" 中使用 require 和 import 的区别：
 *      - 对于 CommonJS 模块，使用 require 导入时，默认导出是一个对象。
 *      - 对于 ES Module，使用 import 导入时，默认导出是一个默认的导出值。
 *    示例：
 *    {
 *      "exports": {
 *        "require": "./index.cjs",
 *        "import": "./index.mjs"
 *      }
 *    }
 *
 * 4. "imports" 字段：
 *    - "imports" 字段用于定义模块的导入方式，可以指定别名和路径映射。
 *    - 主要用于 ES Module 项目，帮助简化模块导入路径。
 *    示例：
 *    {
 *      "imports": {
 *        "#utils": "./src/utils/index.js"
 *      }
 *    }
 *
 * 5. "browser" 字段：
 *    - "browser" 字段用于指定在浏览器环境中使用的入口文件或模块路径。
 *    - 可以为浏览器环境提供特定的模块版本，以替代 Node.js 版本。
 *    示例：
 *    {
 *      "browser": {
 *        "./index.js": "./index.browser.js"
 *      }
 *    }
 */

/**
 * 循环依赖问题
 * 在模块化编程中，循环依赖是指两个或多个模块相互依赖，形成一个循环引用的情况。ES Module 和 CommonJS 都有机制来处理循环依赖，但处理方式有所不同。
 *
 * 6.1 ES Module 中的循环依赖
 * 在 ES Module 中，当模块 A 导入模块 B，而模块 B 又导入模块 A 时，ES Module 会在解析过程中处理这种循环依赖。ES Module 使用静态分析和实时绑定的方式来解决循环依赖问题。
 *
 * 示例：
 * 假设有两个模块 a.js 和 b.js，它们相互依赖。
 *
 * // a.js
 * import { bFunction } from './b.js';
 * export function aFunction() {
 *     console.log('aFunction');
 *     bFunction();
 * }
 * bFunction();
 *
 * // b.js
 * import { aFunction } from './a.js';
 * export function bFunction() {
 *     console.log('bFunction');
 *     aFunction();
 * }
 * aFunction();
 *
 * 在这种情况下，ES Module 会在解析过程中处理循环依赖，并确保模块的导出在使用时是最新的。
 *
 * 6.2 CommonJS 中的循环依赖
 * 在 CommonJS 中，当模块 A require 模块 B，而模块 B 又 require 模块 A 时，CommonJS 会在运行时处理这种循环依赖。CommonJS 使用缓存和部分导出的方式来解决循环依赖问题。
 *
 * 示例：
 * 假设有两个模块 a.js 和 b.js，它们相互依赖。
 *
 * // a.js
 * const b = require('./b.js');
 * module.exports = {
 *     aFunction: function() {
 *         console.log('aFunction');
 *         b.bFunction();
 *     }
 * };
 * b.bFunction();
 *
 * // b.js
 * const a = require('./a.js');
 * module.exports = {
 *     bFunction: function() {
 *         console.log('bFunction');
 *         a.aFunction();
 *     }
 * };
 * a.aFunction();
 *
 * 在这种情况下，CommonJS 会在第一次 require 时返回一个部分导出的对象，以避免无限循环。后续的 require 调用会从缓存中获取已解析的模块。
 *
 * 总结：
 * - ES Module 使用静态分析和实时绑定来处理循环依赖，确保模块的导出在使用时是最新的。
 * - CommonJS 使用缓存和部分导出的方式来处理循环依赖，避免无限循环。
 */
