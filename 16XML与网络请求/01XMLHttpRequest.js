/**
 * XMLHttpRequest 详解
 *
 * 1. 构造函数
 * - new XMLHttpRequest()：创建一个新的XMLHttpRequest实例
 *
 * 2. 属性
 * - readyState：表示请求状态（0-未初始化，1-open调用，2-send调用，3-接收响应体，4-完成）
 * - status：HTTP状态码（200, 404, 500等）
 * - statusText：HTTP状态描述
 * - responseType：响应类型（text, json, blob, arraybuffer等）
 * - response：响应内容
 * - responseText：响应文本
 * - timeout：超时时间（毫秒）
 * - withCredentials：是否携带跨域cookie
 *
 * 3. 方法
 * - open(method, url, async)：初始化请求
 * - send(data)：发送请求
 * - setRequestHeader(header, value)：设置请求头
 * - abort()：中断请求
 * - getAllResponseHeaders()：获取所有响应头
 * - getResponseHeader(name)：获取指定响应头
 *
 * 4. 事件
 * - onreadystatechange：请求状态变化
 * - onload：请求成功完成
 * - onerror：请求错误
 * - ontimeout：请求超时
 * - onabort：请求中断
 * - onprogress：下载进度
 * - onloadstart：请求开始
 * - onloadend：请求结束
 */

// GET请求示例
function makeGetRequest() {
    const xhr = new XMLHttpRequest();

    // 监听状态变化
    xhr.onreadystatechange = function () {
        console.log("ReadyState:", xhr.readyState);
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("响应成功:", xhr.responseType, xhr.response);
        }
    };

    // 监听加载完成
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("请求成功");
            console.log("响应头:", xhr.getAllResponseHeaders());
            console.log("响应体:", xhr.response);
        } else {
            console.log("请求失败:", xhr.status, xhr.statusText);
        }
    };

    // 监听错误
    xhr.onerror = function () {
        console.log("请求错误");
    };

    // 监听进度
    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log("下载进度:", percentComplete.toFixed(2) + "%");
        }
    };

    // 设置超时
    xhr.timeout = 5000;
    xhr.ontimeout = function () {
        console.log("请求超时");
    };

    // 发起请求
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

// POST请求示例
function makePostRequest() {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log("POST请求成功:", xhr.response);
        }
    };

    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");

    const data = {
        title: "XMLHttpRequest测试",
        body: "这是一个POST请求测试",
        userId: 1,
    };

    xhr.send(JSON.stringify(data));
}

// 文件上传示例
function uploadFile(file) {
    const xhr = new XMLHttpRequest(); 
    const formData = new FormData();

    formData.append("file", file);

    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log("上传进度:", percentComplete.toFixed(2) + "%");
        }
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("文件上传成功");
        }
    };

    xhr.open("POST", "https://httpbin.org/post", true);
    xhr.send(formData);
}

// 测试请求
console.log("开始测试GET请求...");
makeGetRequest();

console.log("开始测试POST请求...");
makePostRequest();
