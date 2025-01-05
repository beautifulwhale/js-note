// script标签的工作原理
// script标签用于在HTML文档中嵌入或引用外部的JavaScript代码。浏览器在解析HTML文档时，遇到script标签会暂停解析，先下载并执行JavaScript代码，然后再继续解析HTML文档。

// async和defer脚本的动态加载
// async属性和defer属性用于控制外部脚本的加载和执行时机。

// 1. async属性：
// 当script标签带有async属性时，浏览器会异步下载脚本文件，并在下载完成后立即执行，而不阻塞HTML文档的解析。多个带有async属性的脚本文件的执行顺序不一定按照它们在HTML中的顺序。

// 示例：
/*
<script async src="script1.js"></script>
<script async src="script2.js"></script>
*/

// 2. defer属性：
// 当script标签带有defer属性时，浏览器会异步下载脚本文件，但会在HTML文档解析完成后，按照它们在HTML中的顺序依次执行。

// 示例：
/*
<script defer src="script1.js"></script>
<script defer src="script2.js"></script>
*/

// 加载使用协议
// script标签的src属性可以使用不同的协议来加载脚本文件，包括http、https、file等。通常情况下，建议使用https协议来加载脚本文件，以确保数据传输的安全性。其中使用 // 协议的脚本文件，会使用当前协议来加载脚本文件。

// 示例：
/*
<script src="https://example.com/script.js"></script>
<script src="http://example.com/script.js"></script>
<script src="file:///path/to/script.js"></script>
<script src="//script.js"></script>
*/

// 浏览器的重流和重绘
// 重流（Reflow）和重绘（Repaint）是浏览器渲染页面时的两个重要过程。

// 1. 重流（Reflow）：
// 重流是指当页面的布局和结构发生变化时，浏览器需要重新计算元素的位置和尺寸。重流会影响页面的布局，因此是一个比较耗时的操作。

// 2. 重绘（Repaint）：
// 重绘是指当页面的外观发生变化时（例如颜色、背景等），浏览器需要重新绘制元素的外观。重绘不会影响页面的布局，因此相对来说开销较小。

// 优化重流和重绘的方法
// 1. 避免频繁操作DOM：频繁操作DOM会导致多次重流和重绘，建议使用文档片段（DocumentFragment）或将多次操作合并为一次操作。
// 2. 使用CSS3硬件加速：使用CSS3的transform、opacity等属性可以触发GPU加速，减少重绘的开销。
// 3. 避免使用table布局：table布局会导致整个表格的重流，开销较大，建议使用div+css布局。
// 4. 减少复杂的CSS选择器：复杂的CSS选择器会增加浏览器的计算开销，建议使用简单的选择器。
// 5. 批量修改样式：将多次样式修改合并为一次修改，减少重流和重绘的次数。
// 6. 使用requestAnimationFrame：在进行动画操作时，使用requestAnimationFrame代替setTimeout或setInterval，可以优化重绘的性能。

// 示例：使用文档片段优化DOM操作
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);

// 示例：使用requestAnimationFrame优化动画
function animate() {
    // 动画逻辑
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
