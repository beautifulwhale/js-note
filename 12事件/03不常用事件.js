// 1. 资源事件
// 1.1 beforeunload 事件
window.addEventListener('beforeunload', (event) => {
  // 在页面即将被卸载时触发
  event.preventDefault();
  event.returnValue = ''; // Chrome需要设置returnValue
});

// 1.2 unload 事件
window.addEventListener('unload', (event) => {
  // 页面卸载时触发
  console.log('页面已卸载');
});

// 1.3 load和error事件
const testImage = document.getElementById('testImage');
testImage.addEventListener('load', () => {
  console.log('图片加载成功');
});
testImage.addEventListener('error', () => {
  console.log('图片加载失败');
});

// 2. session历史事件
// 2.1 pageshow和pagehide事件
window.addEventListener('pageshow', (event) => {
  console.log('页面显示', event.persisted);
});
window.addEventListener('pagehide', (event) => {
  console.log('页面隐藏', event.persisted);
});

// 2.2 popstate事件
window.addEventListener('popstate', (event) => {
  console.log('历史记录变化', event.state);
});

// 2.3 hashchange事件
window.addEventListener('hashchange', (event) => {
  console.log('URL hash变化', event.newURL, event.oldURL);
});

// 添加历史记录按钮事件
document.getElementById('pushStateBtn').addEventListener('click', () => {
  history.pushState({ page: 1 }, '', '?page=1');
});

// 3. 网页状态事件
// 3.1 DOMContentLoaded事件
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM加载完成');
});

// 3.2 readystatechange事件
document.addEventListener('readystatechange', () => {
  console.log('文档加载状态:', document.readyState);
});

// 4. 窗口事件
// 4.1 scroll事件
window.addEventListener('scroll', () => {
  console.log('滚动位置:', window.scrollY);
});

// 4.2 resize事件
window.addEventListener('resize', () => {
  console.log('窗口大小:', window.innerWidth, window.innerHeight);
});

// 4.3 fullscreenchange和fullscreenerror事件
const fullscreenElement = document.getElementById('fullscreenElement');
const fullscreenBtn = document.getElementById('fullscreenBtn');

fullscreenBtn.addEventListener('click', () => {
  fullscreenElement.requestFullscreen().catch(err => {
    console.log('进入全屏失败:', err);
  });
});

document.addEventListener('fullscreenchange', () => {
  console.log('全屏状态变化:', document.fullscreenElement ? '进入全屏' : '退出全屏');
});

document.addEventListener('fullscreenerror', (event) => {
  console.log('全屏错误:', event);
});

// 5. 剪贴板事件
const clipboardTest = document.getElementById('clipboardTest');

clipboardTest.addEventListener('copy', (event) => {
  console.log('复制事件');
});

clipboardTest.addEventListener('cut', (event) => {
  console.log('剪切事件');
});

clipboardTest.addEventListener('paste', (event) => {
  console.log('粘贴事件');
});

// 6. 焦点事件
const focusTest = document.getElementById('focusTest');

focusTest.addEventListener('focus', () => {
  console.log('获得焦点');
});

focusTest.addEventListener('blur', () => {
  console.log('失去焦点');
});

focusTest.addEventListener('focusin', () => {
  console.log('即将获得焦点');
});

focusTest.addEventListener('focusout', () => {
  console.log('即将失去焦点');
});

// 7. CustomEvent接口
const customEventBtn = document.getElementById('customEventBtn');
const customEventTarget = document.getElementById('customEventTarget');

// 创建自定义事件
const myEvent = new CustomEvent('myCustomEvent', {
  detail: { message: '这是自定义事件的数据' }
});

// 添加自定义事件监听器
customEventTarget.addEventListener('myCustomEvent', (event) => {
  console.log('自定义事件触发:', event.detail.message);
});

// 触发自定义事件
customEventBtn.addEventListener('click', () => {
  customEventTarget.dispatchEvent(myEvent);
});
