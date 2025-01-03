// 鼠标事件
// 1. click: 当用户点击元素时触发
document.addEventListener("click", (event) => {
  console.log("点击事件:", event);
  console.log("点击坐标:", event.clientX, event.clientY); // 相对于视口的坐标
  console.log("点击按钮:", event.button); // 0-左键, 1-中键, 2-右键
});

// 2. dblclick: 当用户双击元素时触发
document.addEventListener("dblclick", (event) => {
  console.log("双击事件:", event);
});

// 3. mousedown/mouseup: 按下/释放鼠标按钮时触发
document.addEventListener("mousedown", (event) => {
  console.log("鼠标按下:", event);
});

document.addEventListener("mouseup", (event) => {
  console.log("鼠标释放:", event);
});

// 4. mousemove: 鼠标在元素内移动时触发
document.addEventListener("mousemove", (event) => {
  // console.log("鼠标移动:", event.clientX, event.clientY);
});

// 5. mouseenter/mouseleave: 鼠标进入/离开元素时触发(不冒泡)
document.addEventListener("mouseenter", (event) => {
  // console.log("鼠标进入:", event);
});

document.addEventListener("mouseleave", (event) => {
  // console.log("鼠标离开:", event);
});

// 6. mouseover/mouseout: 鼠标移入/移出元素时触发(冒泡)
document.addEventListener("mouseover", (event) => {
  // console.log("鼠标移入:", event);
});

document.addEventListener("mouseout", (event) => {
  // console.log("鼠标移出:", event);
});

// 键盘事件
// 1. keydown: 按下键盘按键时触发
document.addEventListener("keydown", (event) => {
  console.log("按键按下:", event);
  console.log("按键码:", event.keyCode); // 已废弃
  console.log("按键:", event.key); // 按键的值
  console.log("是否按下Ctrl键:", event.ctrlKey);
  console.log("是否按下Alt键:", event.altKey);
  console.log("是否按下Shift键:", event.shiftKey);
});

// 2. keyup: 释放键盘按键时触发
document.addEventListener("keyup", (event) => {
  console.log("按键释放:", event);
});

// 3. keypress: 按下有值的键时触发(已废弃)
document.addEventListener("keypress", (event) => {
  console.log("按键输入:", event);
});

// 4. input: 输入内容时触发(推荐使用)
document.addEventListener("input", (event) => {
  console.log("输入内容:", event.target.value);
});

// 5. compositionstart/compositionend: 输入法编辑器开始/结束输入时触发
document.addEventListener("compositionstart", (event) => {
  console.log("输入法编辑开始:", event);
});

document.addEventListener("compositionend", (event) => {
  console.log("输入法编辑结束:", event);
});

// 进度事件
// 1. loadstart: 开始加载时触发
document.addEventListener("loadstart", (event) => {
  console.log("开始加载:", event);
});

// 2. progress: 正在加载时触发
document.addEventListener("progress", (event) => {
  console.log("加载进度:", event);
  console.log("已加载:", event.loaded);
  console.log("总大小:", event.total);
  console.log("是否可计算进度:", event.lengthComputable);
});

// 3. load: 加载完成时触发
document.addEventListener("load", (event) => {
  console.log("加载完成:", event);
});

// 4. loadend: 加载结束时触发(无论成功或失败)
document.addEventListener("loadend", (event) => {
  console.log("加载结束:", event);
});

// 5. abort: 加载中断时触发
document.addEventListener("abort", (event) => {
  console.log("加载中断:", event);
});

// 6. error: 加载出错时触发
document.addEventListener("error", (event) => {
  console.log("加载出错:", event);
});

// 示例:监听图片加载进度
const img = new Image();
img.src = "data:image/jpeg;base64,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";
document.body.appendChild(img);

img.addEventListener("loadstart", () => console.log("图片开始加载"));
img.addEventListener("progress", (e) => {
  if(e.lengthComputable) {
    const percent = (e.loaded / e.total * 100).toFixed(2);
    console.log(`图片加载进度: ${percent}%`);
  }
});
img.addEventListener("load", () => console.log("图片加载完成"));
img.addEventListener("error", () => console.log("图片加载失败"));

// 表单事件
const form = document.getElementById("myForm");

form.addEventListener("focus", (event) => {
  console.log("元素获得焦点:", event.target.name);
}, true);

form.addEventListener("blur", (event) => {
  console.log("元素失去焦点:", event.target.name);
}, true);

form.addEventListener("change", (event) => {
  console.log("元素值改变:", event.target.name, "新值:", event.target.value);
});

form.addEventListener("input", (event) => {
  console.log("输入内容:", event.target.name, "当前值:", event.target.value);
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // 阻止表单的默认提交行为
  console.log("表单提交:", new FormData(form));
});

// 拖拽事件
const draggable = document.getElementById("draggable");

draggable.addEventListener("dragstart", (event) => {
  console.log("拖动开始:", event);
});

draggable.addEventListener("drag", (event) => {
  console.log("拖动中:", event);
});

draggable.addEventListener("dragend", (event) => {
  console.log("拖动结束:", event);
});

draggable.addEventListener("dragenter", (event) => {
  console.log("进入放置目标:", event);
});

draggable.addEventListener("dragover", (event) => {
  event.preventDefault(); // 阻止默认行为以允许drop
  console.log("在放置目标上移动:", event);
});

draggable.addEventListener("dragleave", (event) => {
  console.log("离开放置目标:", event);
});

draggable.addEventListener("drop", (event) => {
  event.preventDefault();
  console.log("放置:", event);
});



