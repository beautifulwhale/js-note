// EventTarget 接口是一个可以添加事件监听器的对象，并且可以分派事件。以下是 EventTarget 接口上的三个主要函数及其相关的入参。

// 1. addEventListener(type, listener, options)
// 用于向 EventTarget 添加事件监听器。
// - type: 一个字符串，表示事件类型，例如 "click"、"mouseover" 等。
// - listener: 当指定类型的事件触发时被调用的函数。
// - options: 一个可选参数，指定有关 listener 属性的附加选项。可以是一个布尔值，或者是一个指定多个选项的对象。
//   - capture: 一个布尔值，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
//   - once: 一个布尔值，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
//   - passive: 一个布尔值，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

document.addEventListener(
    "click",
    (event) => {
        console.log("Document was clicked", event);
    },
    { capture: false, once: true, passive: true }
);

// 2. removeEventListener(type, listener, options)
// 用于从 EventTarget 移除事件监听器。
// - type: 一个字符串，表示事件类型。
// - listener: 要移除的事件监听器函数。
// - options: 一个可选参数，指定有关 listener 属性的附加选项。可以是一个布尔值，或者是一个指定多个选项的对象。
//   - capture: 一个布尔值，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。

const handleClick = (event) => {
    console.log("Element was clicked", event);
};

const element = document.querySelector(".box");
element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);

// 3. dispatchEvent(event)
// 用于在 EventTarget 上分派一个事件。
// - event: 一个 Event 对象，表示要分派的事件。

const customEvent = new Event("build");
element.dispatchEvent(customEvent);

// 事件传播与事件代理

// 事件传播
// 事件传播分为三个阶段：捕获阶段、目标阶段和冒泡阶段。
// 1. 捕获阶段：事件从根节点向目标节点传播。
// 2. 目标阶段：事件到达目标节点。
// 3. 冒泡阶段：事件从目标节点向根节点传播。

// 示例：事件传播
document.addEventListener(
    "click",
    () => {
        console.log("Document 捕获阶段");
    },
    true
);

document.addEventListener(
    "click",
    () => {
        console.log("Document 冒泡阶段");
    },
    false
);

const container = document.querySelector(".container");
container.addEventListener(
    "click",
    () => {
        console.log("Container 捕获阶段");
    },
    true
);

container.addEventListener(
    "click",
    () => {
        console.log("Container 冒泡阶段");
    },
    false
);

const box = document.querySelector(".box");
box.addEventListener(
    "click",
    () => {
        console.log("Box 捕获阶段");
    },
    true
);

box.addEventListener(
    "click",
    () => {
        console.log("Box 冒泡阶段");
    },
    false
);

// 事件代理
// 事件代理是指将事件监听器添加到父元素，而不是每个子元素。利用事件冒泡机制，当子元素触发事件时，事件会冒泡到父元素，由父元素上的事件监听器处理。

// 示例：事件代理
const list = document.querySelector(".list");
list.addEventListener("click", (event) => {
    if (event.target && event.target.nodeName === "LI") {
        console.log("List item clicked:", event.target.textContent);
    }
});

// 创建列表项
const listItem1 = document.createElement("li");
listItem1.textContent = "Item 1";
list.appendChild(listItem1);

const listItem2 = document.createElement("li");
listItem2.textContent = "Item 2";
list.appendChild(listItem2);

const listItem3 = document.createElement("li");
listItem3.textContent = "Item 3";
list.appendChild(listItem3);

// Event接口表示事件的状态。它是所有事件的基类，提供了许多属性和方法来描述事件的详细信息。

// 为了更好地展示Event接口的属性和方法，我们将通过点击事件来查看这些属性和方法的值。
const box_1 = document.querySelector(".box_1");
box_1.addEventListener("click", (event) => {
    console.log("Event接口的属性：", event);

    // 1. type: 返回一个字符串，表示事件的类型。
    console.log("1. type:", event.type);

    // 2. target: 返回事件的目标，即触发事件的元素。
    console.log("2. target:", event.target);

    // 3. currentTarget: 返回当前正在处理事件的元素。
    console.log("3. currentTarget:", event.currentTarget);

    // 4. eventPhase: 返回一个数值，表示事件流的当前阶段（捕获、目标或冒泡）。
    console.log("4. eventPhase:", event.eventPhase);

    // 5. bubbles: 返回一个布尔值，表示事件是否冒泡。
    console.log("5. bubbles:", event.bubbles);

    // 6. cancelable: 返回一个布尔值，表示事件是否可以取消。
    console.log("6. cancelable:", event.cancelable);

    // 7. defaultPrevented: 返回一个布尔值，表示是否调用了preventDefault()方法。
    console.log("7. defaultPrevented:", event.defaultPrevented);

    // 8. composed: 返回一个布尔值，表示事件是否会在影子DOM根节点之外触发侦听器。
    console.log("8. composed:", event.composed);

    // 9. isTrusted: 返回一个布尔值，表示事件是否是由用户操作产生的。
    console.log("9. isTrusted:", event.isTrusted);

    // 10. timeStamp: 返回一个数值，表示事件创建的时间戳。
    console.log("10. timeStamp:", event.timeStamp);

    console.log("Event接口的方法：");

    // 1. preventDefault(): 取消事件的默认动作。
    event.preventDefault();
    console.log(
        "1. preventDefault() called, defaultPrevented:",
        event.defaultPrevented
    );

    // 2. stopPropagation(): 阻止事件的进一步传播。
    event.stopPropagation();
    console.log("2. stopPropagation() called");

    // 3. stopImmediatePropagation(): 阻止事件的进一步传播，并阻止当前事件目标上的其他事件监听器被调用。
    event.stopImmediatePropagation();
    console.log("3. stopImmediatePropagation() called");

    // 4. composedPath(): 返回事件的路径（由事件的目标节点到根节点的节点列表）。
    console.log("4. composedPath():", event.composedPath());
});
