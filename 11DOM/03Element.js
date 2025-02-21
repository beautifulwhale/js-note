document.addEventListener("DOMContentLoaded", () => {
  const element = document.createElement("div");
  element.textContent = "Element Example";
  document.body.appendChild(element);

  // 2.2 元素状态的相关属性
  // attributes: 返回一个包含元素所有属性的类数组对象
  console.log("2.3 Element.attributes:", element.attributes);
  // className: 获取或设置元素的 class 属性
  console.log("2.4 Element.className:", element.className);
  // classList: 返回元素的类名集合，提供添加、移除和切换类名的方法
  console.log("2.4 Element.classList:", element.classList);
  // dataset: 提供对元素 data-* 属性的访问
  console.log("2.5 Element.dataset:", element.dataset);
  // innerHTML: 获取或设置元素的 HTML 内容
  console.log("2.6 Element.innerHTML:", element.innerHTML);
  // outerHTML: 获取或设置元素及其内容的 HTML
  console.log("2.7 Element.outerHTML:", element.outerHTML);
  // clientHeight: 返回元素的内部高度，包括内边距
  console.log("2.8 Element.clientHeight:", element.clientHeight);
  // clientWidth: 返回元素的内部宽度，包括内边距
  console.log("2.8 Element.clientWidth:", element.clientWidth);
  // clientLeft: 返回元素左边框的宽度
  console.log("2.9 Element.clientLeft:", element.clientLeft);
  // clientTop: 返回元素上边框的宽度
  console.log("2.9 Element.clientTop:", element.clientTop);
  // scrollHeight: 返回元素的总高度，包括溢出部分
  console.log("2.10 Element.scrollHeight:", element.scrollHeight);
  // scrollWidth: 返回元素的总宽度，包括溢出部分
  console.log("2.10 Element.scrollWidth:", element.scrollWidth);
  // scrollLeft: 获取或设置元素的水平滚动位置
  console.log("2.11 Element.scrollLeft:", element.scrollLeft);
  // scrollTop: 获取或设置元素的垂直滚动位置
  console.log("2.11 Element.scrollTop:", element.scrollTop);
  // offsetParent: 返回最近的定位祖先元素
  console.log("2.12 Element.offsetParent:", element.offsetParent);
  // offsetHeight: 返回元素的高度，包括边框和内边距
  console.log("2.13 Element.offsetHeight:", element.offsetHeight);
  // offsetWidth: 返回元素的宽度，包括边框和内边距
  console.log("2.13 Element.offsetWidth:", element.offsetWidth);
  // offsetLeft: 返回元素相对于 offsetParent 的左边距
  console.log("2.14 Element.offsetLeft:", element.offsetLeft);
  // offsetTop: 返回元素相对于 offsetParent 的上边距
  console.log("2.14 Element.offsetTop:", element.offsetTop);
  // style: 返回元素的内联样式对象
  console.log("2.15 Element.style:", element.style);
  // children: 返回元素的子元素集合
  console.log("2.16 Element.children:", element.children);
  // childElementCount: 返回子元素的数量
  console.log(
    "2.16 Element.childElementCount:",
    element.childElementCount
  );
  // firstElementChild: 返回第一个子元素
  console.log(
    "2.17 Element.firstElementChild:",
    element.firstElementChild
  );
  // lastElementChild: 返回最后一个子元素
  console.log("2.17 Element.lastElementChild:", element.lastElementChild);
  // nextElementSibling: 返回下一个兄弟元素
  console.log(
    "2.18 Element.nextElementSibling:",
    element.nextElementSibling
  );
  // previousElementSibling: 返回上一个兄弟元素
  console.log(
    "2.18 Element.previousElementSibling:",
    element.previousElementSibling
  );

  // 3. 实例方法
  // querySelector: 返回与指定选择器匹配的第一个子元素
  console.log("3.1 Element.querySelector:", element.querySelector("div"));
  // querySelectorAll: 返回与指定选择器匹配的所有子元素
  console.log(
    "3.2 Element.querySelectorAll:",
    element.querySelectorAll("div")
  );
  // getElementsByClassName: 返回具有指定类名的所有子元素
  console.log(
    "3.3 Element.getElementsByClassName:",
    element.getElementsByClassName("example-class")
  );
  // getElementsByTagName: 返回具有指定标签名的所有子元素
  console.log(
    "3.4 Element.getElementsByTagName:",
    element.getElementsByTagName("div")
  );
  // closest: 返回与选择器匹配的最近的祖先元素
  console.log("3.5 Element.closest:", element.closest(".parent-class"));
  // matches: 检查元素是否匹配指定的选择器
  console.log("3.6 Element.matches:", element.matches(".example-class"));
  // scrollIntoView: 滚动元素到可视区域
  element.scrollIntoView();
  console.log("3.7 Element.scrollIntoView: Element scrolled into view");
  // getBoundingClientRect: 返回元素的大小及其相对于视口的位置
  console.log(
    "3.8 Element.getBoundingClientRect:",
    element.getBoundingClientRect()
  );
  // getClientRects: 返回元素的所有边框矩形
  console.log("3.9 Element.getClientRects:", element.getClientRects());
  // insertAdjacentElement: 在指定位置插入一个元素
  const newElement = document.createElement("p");
  newElement.textContent = "Inserted Element";
  element.insertAdjacentElement("beforebegin", newElement);
  console.log("3.10 Element.insertAdjacentElement: Element inserted");
  // insertAdjacentHTML: 在指定位置插入HTML
  element.insertAdjacentHTML("afterbegin", "<span>Inserted HTML</span>");
  console.log("3.11 Element.insertAdjacentHTML: HTML inserted");
  // insertAdjacentText: 在指定位置插入文本
  element.insertAdjacentText("beforeend", "Inserted Text");
  console.log("3.12 Element.insertAdjacentText: Text inserted");

  // 4. 属性相关的操作方法
  // getAttribute: 获取指定属性的值
  console.log("4.1 Element.getAttribute:", element.getAttribute("id"));
  // setAttribute: 设置指定属性的值
  element.setAttribute("data-example", "exampleValue");
  console.log("4.2 Element.setAttribute: Attribute set");
  // removeAttribute: 移除指定属性
  element.removeAttribute("data-example");
  console.log("4.3 Element.removeAttribute: Attribute removed");
  // hasAttribute: 检查元素是否具有指定属性
  console.log("4.4 Element.hasAttribute:", element.hasAttribute("id"));
  // getAttributeNames: 获取元素所有属性名的数组
  console.log("4.5 Element.getAttributeNames:", element.getAttributeNames());

  /**
   * Text节点和DocumentFragment节点介绍
   *
   * Text节点和DocumentFragment节点是DOM中的两种常见节点类型，它们在操作文档内容时非常有用。
   */

  // 1. Text节点
  // Text节点表示元素或属性中的文本内容。它是不可分割的文本块，可以包含在元素节点中。
  const textNode = document.createTextNode("这是一个文本节点");
  console.log("Text节点:", textNode);
  console.log("Text节点的内容:", textNode.textContent);

  // 2. DocumentFragment节点
  // DocumentFragment节点是一个轻量级的文档对象，可以包含和操作一组节点。它不会像普通的DOM节点那样影响文档的结构。
  const fragment = document.createDocumentFragment();
  const fragmentElement1 = document.createElement("div");
  fragmentElement1.textContent = "Fragment Element 1";
  const fragmentElement2 = document.createElement("div");
  fragmentElement2.textContent = "Fragment Element 2";
  fragment.appendChild(fragmentElement1);
  fragment.appendChild(fragmentElement2);
  console.log("DocumentFragment节点:", fragment);
  console.log("DocumentFragment节点的子节点:", fragment.childNodes);

  // 将DocumentFragment节点的内容添加到文档中
  document.body.appendChild(fragment);
  console.log("DocumentFragment节点的内容已添加到文档中");
});