// Fetch API 基础使用
// 1. 基本GET请求 - 获取用户列表
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => console.log("用户列表:", data))
    .catch((error) => console.error("Error:", error));

// 2. 完整的配置选项
const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "same-origin",
    cache: "no-cache",
    redirect: "follow",
    referrerPolicy: "no-referrer",
};
// fetch配置项说明
const fetchOptions = {
    // 请求方法
    method: "GET", // GET, POST, PUT, DELETE等

    // 请求头
    headers: {
        "Content-Type": "application/json",
    },

    // 请求体
    body: JSON.stringify({
        name: "John",
        age: 30,
    }), // 字符串、FormData、Blob、BufferSource等

    // 跨域模式
    mode: "cors", // cors, no-cors, same-origin

    // 是否发送凭据(cookies)
    credentials: "same-origin", // omit, same-origin, include

    // 缓存模式
    cache: "no-cache", // default, no-store, reload, no-cache, force-cache, only-if-cached

    // 重定向处理
    redirect: "follow", // follow, error, manual

    // 引用策略
    referrerPolicy: "no-referrer", // no-referrer, origin, same-origin等

    // 完整性校验
    integrity: "sha256-xxx", // 资源的 hash 值

    // 请求信号,用于取消请求
    signal: new AbortController().signal,

    // 请求优先级
    priority: "auto", // high, low, auto
};

// 3. GET请求示例 - 获取列表
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((data) => console.log("列表:", data));

// 4. 处理响应 - 获取文章详情
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
        // 检查响应状态
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 响应属性示例
        console.log("Status:", response.status);
        console.log("Status Text:", response.statusText);
        console.log("Headers:", response.headers);
        console.log("Is ok?", response.ok);
        console.log("Content type:", response.headers.get("content-type"));

        return response.json();
    })
    .then((data) => console.log("文章详情:", data));

// 5. 使用 async/await - 获取评论列表
async function fetchComments() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1/comments"
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("评论列表:", data);
    } catch (error) {
        console.error("Error:", error);
    }
}

// 6. 请求中止 - 获取相册列表
const controller = new AbortController();
const signal = controller.signal;

fetch("https://jsonplaceholder.typicode.com/albums", { signal })
    .then((response) => response.json())
    .then((data) => console.log("相册列表:", data))
    .catch((err) => {
        if (err.name === "AbortError") {
            console.log("请求已被中止");
        } else {
            console.error("Error:", err);
        }
    });

// 3秒后中止请求
setTimeout(() => controller.abort(), 10);

// 7. POST请求示例 - 创建新文章
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        title: "新文章标题",
        body: "新文章内容",
        userId: 1,
    }),
})
    .then((response) => response.json())
    .then((data) => console.log("创建的文章:", data));

// 8. PUT请求示例 - 更新文章
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: 1,
        title: "更新后的标题",
        body: "更新后的内容",
        userId: 1,
    }),
})
    .then((response) => response.json())
    .then((data) => console.log("更新的文章:", data));

// 9. DELETE请求示例 - 删除文章
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
})
    .then((response) => {
        if (response.ok) {
            console.log("文章删除成功");
        }
    })
    .catch((error) => console.error("删除失败:", error));

// 调用示例函数
fetchComments();
