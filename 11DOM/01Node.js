/**
 * 使用案例介绍Node属性与方法
 */
document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  node.textContent = "Hello, World!";
  document.body.appendChild(node);

  const node2 = document.getElementById("node2");
  // 1. 属性
  console.log("1. 属性");
  // 1.1 nodeType: 1 表示元素节点 2 表示属性节点 3 表示文本节点 4 表示CDATA节点 8 表示注释节点 9 表示文档节点 10 表示文档类型节点
  console.log("1.1 nodeType:", node.nodeType);
  // 1.2 nodeName: 元素节点的标签名
  console.log("1.2 nodeName:", node.nodeName, node2.nodeName);
  // 1.3 nodeValue: 元素节点的值 文本节点和注释节点的nodeValue为null
  console.log(
    "1.3 nodeValue:",
    node.nodeValue,
    node2.nodeValue,
    node2.firstChild.nodeValue
  );
  // 1.4 textContent: 元素节点的文本内容
  console.log("1.4 textContent:", node.textContent, node2.textContent);
  // 1.5 baseURI: 元素节点的基本URI
  console.log("1.5 baseURI:", node.baseURI);
  // 1.6 ownerDocument: 元素节点的文档对象
  console.log("1.6 ownerDocument:", node.ownerDocument);
  // 1.7 nextSibling: 元素节点的下一个兄弟节点
  console.log("1.7 nextSibling:", node.nextSibling);
  // 1.8 previousSibling: 元素节点的上一个兄弟节点
  console.log(
    "1.8 previousSibling:",
    node.previousSibling,
    node2.previousSibling.nodeValue
  );
  // 1.9 parentNode: 元素节点的父节点
  console.log("1.9 parentNode:", node.parentNode);
  // 1.10 parentElement: 元素节点的父元素节点
  console.log("1.10 parentElement:", node.parentElement);
  // 1.11 firstChild: 元素节点的第一个子节点
  console.log("1.11 firstChild:", node.firstChild);
  // 1.12 lastChild: 元素节点的最后一个子节点
  console.log("1.12 lastChild:", node.lastChild);
  // 1.13 childNodes: 元素节点的子节点
  console.log("1.13 childNodes:", node.childNodes);
  // 1.14 isConnected: 元素节点是否已连接
  console.log("1.14 isConnected:", node.isConnected);

  // 2. 方法
  // 2.1 createElement 创建元素节点 appendChild 添加子节点
  console.log("2. 方法");
  const newNode = document.createElement("span");
  newNode.textContent = "New Node";
  node.appendChild(newNode);
  console.log("2.1 appendChild:", node.childNodes);

  // 2.2 cloneNode: 克隆节点 参数为true表示深克隆(包括子节点) 为false表示浅克隆
  const clonedNode = node.cloneNode(true);
  console.log("2.2 cloneNode:", clonedNode);

  // 2.3 insertBefore: 在指定节点前插入新节点 参数为新节点和指定节点, 返回新节点
  const insertedNode = document.createElement("p");
  insertedNode.textContent = "Inserted Node";
  const insertedNode2 = node.insertBefore(insertedNode, newNode.nextSibling);
  console.log("2.3 insertBefore:", node.childNodes, insertedNode2);

  // 2.4 removeChild: 移除指定节点
  node.removeChild(newNode);
  console.log("2.5 removeChild:", node.childNodes);

  // 2.5 replaceChild: 替换指定节点
  const replacedNode = document.createElement("h1");
  replacedNode.textContent = "Replaced Node";
  node.replaceChild(replacedNode, insertedNode);
  console.log("2.6 replaceChild:", node.childNodes);

  // 2.7 contains: 判断指定节点是否包含在当前节点中
  console.log("2.7 contains:", node.contains(replacedNode));

  // 2.8 compareDocumentPosition: 比较两个节点的文档位置
  console.log(
    "2.8 compareDocumentPosition:",
    node.compareDocumentPosition(replacedNode)
  );

  // 2.9 isEqualNode: 判断两个节点是否相等, 两个元素的属性值和子节点都相等则返回true
  console.log("2.9 isEqualNode:", node.isEqualNode(clonedNode));
  // 2.10 isSameNode: 判断两个节点是否是同一个节点, 两个节点指向同一个对象则返回true
  console.log("2.10 isSameNode:", node.isSameNode(clonedNode));

  // 2.11 normalize: 规范化节点, 合并相邻的文本节点
  node.normalize();
  console.log("2.11 normalize:", node.childNodes);

  // 2.12 getRootNode: 返回当前节点的根节点
  console.log("2.12 getRootNode:", node.getRootNode());

  /**
   * NodeList 和 HTMLCollection 介绍
   *
   * NodeList 和 HTMLCollection 是两种常见的类数组对象，用于表示一组 DOM 节点。
   * 它们之间有一些相似之处，但也有一些重要的区别。
   */

  // 1. NodeList
  // NodeList 是一个类数组对象，表示一组节点对象。它可以是实时的（live）或静态的（static）。
  // 例如，使用 querySelectorAll 方法返回的 NodeList 是静态的，而使用 childNodes 属性返回的 NodeList 是实时的。
  const nodeList = document.querySelectorAll("div");
  console.log("NodeList:", nodeList);
  nodeList.forEach((node) => console.log(node));

  // 2. HTMLCollection
  // HTMLCollection 是一个类数组对象，表示一组元素节点。它总是实时的（live）。
  // 例如，使用 getElementsByTagName 方法返回的 HTMLCollection 是实时的。
  const htmlCollection = document.getElementsByTagName("div");
  console.log("HTMLCollection:", htmlCollection);
  for (let i = 0; i < htmlCollection.length; i++) {
    console.log(htmlCollection[i]);
  }

  /**
   * NodeList 和 HTMLCollection 的区别
   *
   * 1. NodeList 可以包含任何类型的节点，而 HTMLCollection 只包含元素节点。
   * 2. NodeList 可以是静态的或实时的，而 HTMLCollection 总是实时的。
   * 3. NodeList 支持 forEach 方法，而 HTMLCollection 不支持。
   * 4. NodeList 可以通过索引访问节点，也可以使用 item 方法访问节点。
   *    HTMLCollection 也可以通过索引访问节点，但还可以通过元素的 name 或 id 属性访问节点。
   */

  /**
   * ParentNode 和 ChildNode 介绍
   *
   * ParentNode 和 ChildNode 是 DOM 中的两个接口，分别用于表示可以有子节点的节点和可以作为子节点的节点。
   * 这两个接口提供了一些属性和方法，用于操作和访问节点的子节点和父节点。
   */

  // 1. ParentNode
  // ParentNode 接口表示可以有子节点的节点，包括 Document、Element 和 DocumentFragment。
  // ParentNode 提供了以下属性和方法：
  // - children: 返回一个包含所有子元素的 HTMLCollection。
  // - firstElementChild: 返回第一个子元素。
  // - lastElementChild: 返回最后一个子元素。
  // - childElementCount: 返回子元素的数量。
  // - append: 将一个或多个节点或字符串添加到当前节点的子节点列表的末尾。
  // - prepend: 将一个或多个节点或字符串添加到当前节点的子节点列表的开头。
  const parentNode = document.querySelector("body");
  console.log("ParentNode children:", parentNode.children);
  console.log("ParentNode firstElementChild:", parentNode.firstElementChild);
  console.log("ParentNode lastElementChild:", parentNode.lastElementChild);
  console.log("ParentNode childElementCount:", parentNode.childElementCount);

  // 2. ChildNode
  // ChildNode 接口表示可以作为子节点的节点，包括 Element、DocumentType 和 CharacterData（如 Text 和 Comment）。
  // ChildNode 提供了以下方法：
  // - remove: 从其父节点中移除当前节点。
  // - before: 在当前节点之前插入一个或多个节点或字符串。
  // - after: 在当前节点之后插入一个或多个节点或字符串。
  // - replaceWith: 用一个或多个节点或字符串替换当前节点。
  const childNode = document.querySelector("div");
  childNode.remove();
  console.log("ChildNode removed");
});
