/**
 * document对象常用的属性
 *
 * document对象表示整个HTML或XML文档，并且是DOM树的根节点。以下是一些常用的document属性：
 */

// 1. documentElement: 返回文档的根元素（对于HTML文档，通常是<html>元素）
console.log("1. documentElement:", document.documentElement);

// 2. head: 返回文档的<head>元素
console.log("2. head:", document.head);

// 3. body: 返回文档的<body>元素
console.log("3. body:", document.body);

// 4. title: 获取或设置文档的标题
console.log("4. title:", document.title);
document.title = "New Title";
console.log("4. title (after change):", document.title);

// 5. URL: 返回文档的完整URL
console.log("5. URL:", document.URL, document.documentURI);

// 6. domain: 返回文档的域名
console.log("6. domain:", document.domain);

// 7. referrer: 返回载入当前文档的文档的URL
console.log("7. referrer:", document.referrer);

// 8. cookie: 获取或设置与当前文档相关的cookie
console.log("8. cookie:", document.cookie);

// 9. lastModified: 返回文档最后修改的日期和时间
console.log("9. lastModified:", document.lastModified);

// 10. readyState: 返回文档的加载状态（"loading", "interactive", "complete"）
// 当HTML文档加载完成时，readyState 为 "interactive", 当css、js、字体等外部资源加载完成时，readyState 为 "complete"
console.log("10. readyState:", document.readyState);

// 11. characterSet: 返回文档的字符编码
console.log("11. characterSet:", document.characterSet);

// 12. scripts: 返回文档中所有<script>元素的HTMLCollection
console.log("12. scripts:", document.scripts);

// 13. forms: 返回文档中所有<form>元素的HTMLCollection
console.log("13. forms:", document.forms);

// 14. images: 返回文档中所有<img>元素的HTMLCollection
console.log("14. images:", document.images);

// 15. links: 返回文档中所有<a>和<area>元素的HTMLCollection，这些元素的href属性已被设置
console.log("15. links:", document.links);

// 16. anchors: 返回文档中所有<a>元素的HTMLCollection，这些元素的name属性已被设置
console.log("16. anchors:", document.anchors);

/**
 * document 常用方法介绍
 */

// 1. createElement: 创建一个指定标签名的元素节点
const newElement = document.createElement("div");
newElement.textContent = "This is a new div element";
document.body.appendChild(newElement);
console.log("1. createElement:", newElement);

// 2. createTextNode: 创建一个包含指定文本内容的文本节点
const newTextNode = document.createTextNode("This is a new text node");
document.body.appendChild(newTextNode);
console.log("2. createTextNode:", newTextNode);

// 3. getElementById: 返回具有指定 id 属性值的元素
const elementById = document.getElementById("node");
console.log("3. getElementById:", elementById);

// 4. getElementsByClassName: 返回包含所有具有指定类名的元素的实时 HTMLCollection
const elementsByClassName = document.getElementsByClassName("example-class");
console.log("4. getElementsByClassName:", elementsByClassName);

// 5. getElementsByTagName: 返回包含所有具有指定标签名的元素的实时 HTMLCollection
const elementsByTagName = document.getElementsByTagName("div");
console.log("5. getElementsByTagName:", elementsByTagName);

// 6. querySelector: 返回与指定的选择器或选择器组匹配的第一个元素
const firstElement = document.querySelector(".example-class");
console.log("6. querySelector:", firstElement);

// 7. querySelectorAll: 返回与指定的选择器或选择器组匹配的所有元素的静态 NodeList
const allElements = document.querySelectorAll(".example-class");
console.log("7. querySelectorAll:", allElements);

// 8. createDocumentFragment: 创建一个空的 DocumentFragment
const fragment = document.createDocumentFragment();
const fragmentElement = document.createElement("p");
fragmentElement.textContent = "This is a paragraph in a fragment";
fragment.appendChild(fragmentElement);
document.body.appendChild(fragment);
console.log("8. createDocumentFragment:", fragment);

// 9. write: 向文档流写入 HTML 或文本
document.write("<p>This is written using document.write</p>");
console.log("9. write: Document content written");

// 10. open: 打开一个文档进行写入
document.open();
document.write("<p>Document opened and written using document.open!!!</p>");
document.close();
console.log("10. open: Document opened and written");

// 11. close: 关闭由 document.open() 打开的文档
// Note: document.close() is called after document.open() and document.write() in the above example

// 12. execCommand: 在设计模式下执行命令, 比较少用
document.designMode = "on";
document.execCommand("bold");
console.log("12. execCommand: Text made bold using execCommand");
document.designMode = "off";

// 13. getSelection: 返回一个表示用户选择的 Selection 对象
const selection = document.getSelection();
console.log("13. getSelection:", selection);

// 14. hasFocus: 返回文档是否有焦点
const hasFocus = document.hasFocus();
console.log("14. hasFocus:", hasFocus);

// 15. adoptNode: 将一个节点从另一个文档移动到当前文档， 比较少用
// const adoptedNode = document.adoptNode(newElement);
// console.log("15. adoptNode:", adoptedNode);

// 16. importNode: 从另一个文档导入一个节点， 比较少用
// const importedNode = document.importNode(newElement, true);
// console.log("16. importNode:", importedNode);

// 17. createEvent: 创建一个新的事件对象
const event = document.createEvent("Event");
event.initEvent("build", true, true);
newElement.dispatchEvent(event);
console.log("17. createEvent: Event created and dispatched");

// 18. addEventListener: 为文档添加事件监听器
document.addEventListener("click", () => {
  console.log("18. addEventListener: Document clicked");
});

// 19. removeEventListener: 移除文档的事件监听器
const clickHandler = () => {
  console.log("19. removeEventListener: Document clicked");
};
document.addEventListener("click", clickHandler);
document.removeEventListener("click", clickHandler);

// 20. createAttribute: 创建一个新的属性节点
const newAttr = document.createAttribute("data-example");
newAttr.value = "exampleValue";
newElement.setAttributeNode(newAttr);
console.log("20. createAttribute:", newElement.getAttribute("data-example"));
