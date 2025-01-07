// Window 对象是 JavaScript 在浏览器环境中的全局对象，代表浏览器窗口

// 1. 窗口尺寸相关属性
console.log("窗口内部宽度:", window.innerWidth);
console.log("窗口内部高度:", window.innerHeight);
console.log("窗口外部宽度:", window.outerWidth);
console.log("窗口外部高度:", window.outerHeight);

// 2. 窗口位置相关属性和方法
console.log("窗口距离屏幕左边的位置:", window.screenX);
console.log("窗口距离屏幕顶部的位置:", window.screenY);

// 窗口移动方法
// window.moveTo(100, 100); // 移动窗口到指定坐标
// window.moveBy(10, 10);   // 相对当前位置移动窗口

// 3. 视口滚动相关方法
// window.scrollTo(0, 100);     // 滚动到指定位置
// window.scrollBy(0, 10);      // 相对当前位置滚动
// window.scroll({              // 平滑滚动
//     top: 100,
//     behavior: 'smooth'
// });

// 4. 窗口操作方法
const demoWindow = {
    open: () =>
        window.open(
            "https://www.example.com",
            "_blank",
            "width=500,height=500"
        ),
    close: () => window.close(),
    print: () => window.print(),
    stop: () => window.stop(),
};
// demoWindow.open();
// demoWindow.close();
// demoWindow.print();
// demoWindow.stop();
// 5. 定时器方法
const timerDemo = () => {
    // 设置超时调用
    const timeoutId = setTimeout(() => {
        console.log("3秒后执行");
    }, 3000);

    // 设置间隔调用
    const intervalId = setInterval(() => {
        console.log("每2秒执行一次");
    }, 2000);

    // 清除定时器
    // clearTimeout(timeoutId);
    // clearInterval(intervalId);
};

// 6. 对话框方法
const dialogDemo = () => {
    alert('这是一个警告框');
    const result = confirm('是否确认？');
    const input = prompt('请输入内容:', '默认值');
};
// dialogDemo();

// 7. location 对象（URL相关）
const locationInfo = {
    href: window.location.href, // 完整URL
    protocol: window.location.protocol, // 协议
    host: window.location.host, // 主机名和端口
    hostname: window.location.hostname, // 主机名
    port: window.location.port, // 端口
    pathname: window.location.pathname, // 路径
    search: window.location.search, // 查询字符串
    hash: window.location.hash, // 哈希值
};
console.log('locationInfo', locationInfo);

// location 方法
const locationMethods = {
    reload: () => window.location.reload(), // 重新加载页面
    assign: (url) => window.location.assign(url), // 加载新页面
    replace: (url) => window.location.replace(url), // 替换当前页面（不保存历史记录）
};
// locationMethods.reload();
// locationMethods.assign('https://www.baidu.com');
// locationMethods.replace('https://www.baidu.com');

// 8. history 对象（浏览历史相关）
const historyMethods = {
    back: () => window.history.back(), // 后退
    forward: () => window.history.forward(), // 前进
    go: (n) => window.history.go(n), // 前进或后退n步
    pushState: () => window.history.pushState({ page: 1 }, "", "?page=1"), // 添加历史记录
    replaceState: () => window.history.replaceState({ page: 1 }, "", "?page=1"), // 替换历史记录
};
// historyMethods.pushState();
// historyMethods.replaceState();

// 9. navigator 对象（浏览器信息）
const navigatorInfo = {
    userAgent: window.navigator.userAgent, // 浏览器用户代理字符串
    platform: window.navigator.platform, // 操作系统平台
    language: window.navigator.language, // 浏览器语言
    onLine: window.navigator.onLine, // 在线状态
    cookieEnabled: window.navigator.cookieEnabled, // Cookie 是否启用
};
console.log('navigatorInfo', navigatorInfo);

// 10. screen 对象（屏幕信息）
const screenInfo = {
    width: window.screen.width, // 屏幕宽度
    height: window.screen.height, // 屏幕高度
    availWidth: window.screen.availWidth, // 可用宽度
    availHeight: window.screen.availHeight, // 可用高度
    colorDepth: window.screen.colorDepth, // 颜色深度
    pixelDepth: window.screen.pixelDepth, // 像素深度
};
console.log('screenInfo', screenInfo);
// 11. localStorage 和 sessionStorage
const storageDemo = {
    // localStorage（永久存储）
    setLocalStorage: () => localStorage.setItem("key", "value"),
    getLocalStorage: () => localStorage.getItem("key"),
    removeLocalStorage: () => localStorage.removeItem("key"),
    clearLocalStorage: () => localStorage.clear(),

    // sessionStorage（会话存储）
    setSessionStorage: () => sessionStorage.setItem("key", "value"),
    getSessionStorage: () => sessionStorage.getItem("key"),
    removeSessionStorage: () => sessionStorage.removeItem("key"),
    clearSessionStorage: () => sessionStorage.clear(),
};

// 12. 事件监听相关
window.addEventListener("load", () => {
    console.log("页面完全加载完成");
});

window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM加载完成");
});

window.addEventListener("resize", () => {
    console.log("窗口大小改变");
});

window.addEventListener("scroll", () => {
    console.log("页面滚动");
});

window.addEventListener("online", () => {
    console.log("网络连接恢复");
});

window.addEventListener("offline", () => {
    console.log("网络连接断开");
});

// 将所有信息输出到页面
const output = document.getElementById("output");
output.innerHTML = `
    <h2>窗口信息</h2>
    <pre>${JSON.stringify(
        {
            window: {
                size: {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    outerWidth: window.outerWidth,
                    outerHeight: window.outerHeight,
                },
                position: {
                    screenX: window.screenX,
                    screenY: window.screenY,
                },
            },
            location: locationInfo,
            navigator: navigatorInfo,
            screen: screenInfo,
        },
        null,
        2
    )}</pre>
`;
