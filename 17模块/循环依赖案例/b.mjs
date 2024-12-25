import { foo, baz } from "./a.mjs";
console.log("b.mjs");
try {
    console.log(foo); // 报错: 因为 foo 还没有被定义, 已知 a.mjs 输出了 foo 接口, 但是接口没定义
} catch (error) {
    console.log(error);
}
// 解决方案, 异步加载
import("./a.mjs")
    .then((module) => {
        console.log("b.mjs 中 foo 的值是:", module);
    })
    .catch((error) => {
        console.log(error);
    });

console.log('baz is:', baz());

export let bar = "bar";
