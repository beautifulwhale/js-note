// Cookie 基础知识与操作示例

// 1. 设置Cookie的基本方法
document.cookie = "username=张三"; // 最基本的cookie设置

// 2. 设置Cookie时包含其他属性
document.cookie =
    "userType=admin; max-age=3600; path=/; secure; samesite=Strict";

// 3. Cookie的主要属性说明
const cookieDemo = {
    // name=value: Cookie的名称和值(必需)
    basic: "username=张三",

    // expires/max-age: Cookie的过期时间
    withExpires: `username=张三; expires=${new Date(2024, 0, 1).toUTCString()}`,
    withMaxAge: "username=张三; max-age=3600", // 3600秒后过期

    // path: Cookie的可用路径
    withPath: "username=张三; path=/admin", // 只在/admin路径下可用

    // domain: Cookie的域名范围
    withDomain: "username=张三; domain=.example.com", // 可在所有子域名下使用

    // secure: 只在HTTPS连接中传输
    withSecure: "username=张三; secure",

    // httpOnly: 禁止JavaScript访问
    withHttpOnly: "username=张三; httpOnly",

    // samesite: 跨站点请求控制
    withSameSite: "username=张三; samesite=Strict", // Strict/Lax/None
};

// 4. 实用的Cookie操作函数
const CookieUtil = {
    // 设置Cookie
    setCookie(name, value, options = {}) {
        // 将name和value编码为URL安全的格式
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        if (options.expires instanceof Date) {
            cookie += `; expires=${options.expires.toUTCString()}`;
        }

        if (options.maxAge) {
            cookie += `; max-age=${options.maxAge}`;
        }

        if (options.path) {
            cookie += `; path=${options.path}`;
        }

        if (options.domain) {
            cookie += `; domain=${options.domain}`;
        }

        if (options.secure) {
            cookie += "; secure";
        }

        if (options.httpOnly) {
            cookie += "; httpOnly";
        }

        if (options.sameSite) {
            cookie += `; samesite=${options.sameSite}`;
        }

        document.cookie = cookie;
    },

    // 获取Cookie
    getCookie(name) {
        const cookies = document.cookie.split("; ");
        const decodedName = encodeURIComponent(name);

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (cookieName === decodedName) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    },

    // 删除Cookie
    deleteCookie(name, options = {}) {
        options.expires = new Date(0); // 设置为过去的时间
        this.setCookie(name, "", options);
    },
};

// 5. 使用示例
// 设置Cookie
CookieUtil.setCookie("username", "张三", {
    maxAge: 3600,
    path: "/",
    sameSite: "Strict",
});

// 获取Cookie
console.log("当前用户:", CookieUtil.getCookie("username"));

// 删除Cookie
CookieUtil.deleteCookie("username", { path: "/" });

// 6. Cookie的限制说明
console.log(`
Cookie的主要限制：
1. 大小限制：每个Cookie通常限制在4KB左右
2. 数量限制：每个域名下的Cookie数量有限（通常为20-50个）
3. 安全性：明文存储，建议不存储敏感信息
4. 带宽影响：Cookie会随每个HTTP请求发送
`);
