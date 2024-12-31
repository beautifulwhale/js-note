// MutationObserver 是一个用于监视DOM树变化的接口。它可以监视DOM节点的添加、删除、属性变化、文本内容变化等。

// 创建一个MutationObserver实例，并传入一个回调函数
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
});

// 需要监视的DOM节点
const targetNode = document.querySelector('.box');

// 配置对象，指定需要观察的变化类型
const config = {
  attributes: true, // 观察属性变化
  childList: true, // 观察子节点的变化
  subtree: true, // 观察整个子树
  characterData: true // 观察节点内容或节点文本的变化
};

// 开始观察
observer.observe(targetNode, config);

// 停止观察
// observer.disconnect();

// 使用场景：
// 1. 动态更新页面内容时，监视DOM变化并执行相应操作。
// 2. 监视表单输入变化，进行实时验证。
// 3. 监视属性变化，更新相关状态或样式。
// 4. 监视子节点变化，动态加载或卸载内容。

// MutationObserver API:
// 1. observe(targetNode, config): 开始观察指定的DOM节点，传入配置对象。
// 2. disconnect(): 停止观察。
// 3. takeRecords(): 清空并返回未处理的变动记录。

// MutationRecord对象：
// 每个变动记录都是一个MutationRecord对象，包含以下属性：
// 1. type: 变动类型（attributes, characterData, childList）。
// 2. target: 发生变动的DOM节点。
// 3. addedNodes: 被添加的节点列表。
// 4. removedNodes: 被移除的节点列表。
// 5. previousSibling: 被添加或移除节点的前一个兄弟节点。
// 6. nextSibling: 被添加或移除节点的下一个兄弟节点。
// 7. attributeName: 被修改的属性名。
// 8. attributeNamespace: 被修改的属性的命名空间。
// 9. oldValue: 变动前的值（仅在配置中指定了attributeOldValue或characterDataOldValue时提供）。

// 示例：
// 监视一个div元素的子节点变化
const exampleDiv = document.createElement('div');
document.body.appendChild(exampleDiv);

const exampleObserver = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    console.log(mutation);
  }
});

exampleObserver.observe(exampleDiv, { childList: true });

// 添加一个子节点，触发MutationObserver
const newChild = document.createElement('p');
newChild.textContent = 'Hello, MutationObserver!';
exampleDiv.appendChild(newChild);
