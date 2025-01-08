/**
 * URL 对象
 * URL 接口用于解析、构造、规范化和编码 URLs
 * 它提供了一个简单的 API 来创建和解析 URLs
 */

// 1. 创建URL对象
const url1 = new URL(
    "https://example.com:8080/path/page?name=test&age=25#section"
);
console.log("url1", url1);
const url2 = new URL("/path/page", "https://example.com"); // 基础URL + 相对路径
console.log("url2", url2);

// 2. URL 对象的属性
console.log("--- URL 对象的属性 ---");
console.log("href:", url1.href); // 完整URL: https://example.com:8080/path/page?name=test&age=25#section
console.log("protocol:", url1.protocol); // 协议: https:
console.log("host:", url1.host); // 主机名与端口: example.com:8080
console.log("hostname:", url1.hostname); // 主机名: example.com
console.log("port:", url1.port); // 端口号: 8080
console.log("pathname:", url1.pathname); // 路径: /path/page
console.log("search:", url1.search); // 查询字符串: ?name=test&age=25
console.log("hash:", url1.hash); // 片段标识符: #section
console.log("origin:", url1.origin); // 源: https://example.com:8080

// 3. URL 对象的方法
console.log("--- URL 对象的方法 ---");
// toString() - 返回完整的URL字符串
console.log("toString():", url1.toString());
// toJSON() - 返回完整的URL字符串
console.log("toJSON():", url1.toJSON());
// 4. URL.createObjectURL() 和 URL.revokeObjectURL() 方法
// 创建一个 Blob 对象
const blob = new Blob(["Hello, world!"], { type: "text/plain" });

// 使用 URL.createObjectURL() 方法创建一个指向 Blob 对象的 URL
const objectUrl = URL.createObjectURL(blob);
console.log("objectUrl:", objectUrl);

// 使用 URL.revokeObjectURL() 方法释放这个 URL
URL.revokeObjectURL(objectUrl);
console.log("objectUrl 已被释放");

/**
 * URLSearchParams 对象
 * URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串
 */

// 1. 创建 URLSearchParams 对象的多种方式
console.log("--- URLSearchParams 的创建 ---");
// 从字符串创建
const params1 = new URLSearchParams("name=test&age=25");
// 从对象创建
const params2 = new URLSearchParams({
    name: "test",
    age: "25",
});
// 从 URL 对象的 search 属性创建
const params3 = new URLSearchParams(url1.search);

// 2. URLSearchParams 的方法
console.log("--- URLSearchParams 的方法 ---");

// append() - 追加参数
params1.append("hobby", "reading");
console.log("append后:", params1.toString());

// delete() - 删除参数
params1.delete("age");
console.log("delete后:", params1.toString());

// get() - 获取参数值
console.log("get name:", params1.get("name"));

// getAll() - 获取同名参数的所有值
params1.append("hobby", "swimming");
console.log("getAll hobby:", params1.getAll("hobby"));

// has() - 检查是否存在某个参数
console.log("has name:", params1.has("name"));
console.log("has age:", params1.has("age"));

// set() - 设置参数（会覆盖已存在的同名参数）
params1.set("name", "newTest");
console.log("set后:", params1.toString());

// sort() - 按键名排序
params1.sort();
console.log("sort后:", params1.toString());

/**
 * 实际使用场景示例
 */

// 场景1: 解析URL中的查询参数
function parseUrlParams(urlString) {
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

console.log(
    "解析URL参数:",
    parseUrlParams("https://example.com?name=test&age=25")
);

// 场景2: 构建带查询参数的URL
function buildUrl(baseUrl, params) {
    const url = new URL(baseUrl);
    const searchParams = new URLSearchParams(params);
    url.search = searchParams.toString();
    return url.toString();
}

console.log(
    "构建URL:",
    buildUrl("https://example.com", {
        name: "test",
        age: "25",
        hobby: ["reading", "swimming"],
    })
);

// 场景3: 动态修改URL参数
function updateUrlParam(url, key, value) {
    const urlObj = new URL(url);
    urlObj.searchParams.set(key, value);
    return urlObj.toString();
}

console.log(
    "更新URL参数:",
    updateUrlParam("https://example.com?name=test", "name", "newTest")
);
