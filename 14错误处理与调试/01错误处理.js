// 5. 全局错误处理
// 首先设置全局错误处理器
window.onerror = function (message, source, lineno, colno, error) {
    console.log("全局错误:", {
        message,
        source,
        lineno,
        colno,
        error,
    });
    return true; // 防止错误冒泡
};

// 处理未捕获的 Promise 错误
window.addEventListener("unhandledrejection", (event) => {
    console.error("未处理的Promise错误:", event.reason);
    event.preventDefault(); // 防止错误输出到控制台
});

// 测试全局错误 - 延迟执行以确保错误处理器已经设置
setTimeout(() => {
    // 1. 制造一个同步错误
    throw new Error("这是一个全局同步错误");
}, 1000);

setTimeout(() => {
    // 2. 制造一个未捕获的 Promise 错误
    Promise.reject(new Error("这是一个未捕获的Promise错误"));
}, 2000);

setTimeout(() => {
    // 3. 制造一个运行时错误
    nonExistentFunction();
}, 3000);

// 1. JavaScript 内置错误类型
console.log("=== JavaScript 内置错误类型 ===");

// SyntaxError - 语法错误
try {
    eval("if (true) {"); // 缺少闭合括号
} catch (error) {
    console.log("语法错误:", error.name, error.message);
}

// ReferenceError - 引用错误
try {
    console.log(undefinedVariable);
} catch (error) {
    console.log("引用错误:", error.name, error.message);
}

// TypeError - 类型错误
try {
    const num = 123;
    num.toUpperCase();
} catch (error) {
    console.log("类型错误:", error.name, error.message);
}

// RangeError - 范围错误
try {
    const arr = new Array(-1);
} catch (error) {
    console.log("范围错误:", error.name, error.message);
}

// 2. 自定义错误
console.log("\n=== 自定义错误 ===");

class BusinessError extends Error {
    constructor(message) {
        super(message);
        this.name = "BusinessError";
    }
}
// 使用自定义错误示例
try {
    // 当业务逻辑不满足要求时,抛出自定义错误
    const age = -5;
    if (age < 0) {
        throw new BusinessError("年龄不能为负数");
    }
} catch (error) {
    if (error instanceof BusinessError) {
        console.log("捕获到业务错误:", error.message);
    }
}

// 自定义错误可以携带更多信息
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field; // 记录是哪个字段验证失败
    }
}

try {
    const username = "";
    if (!username) {
        throw new ValidationError("用户名不能为空", "username");
    }
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`字段 ${error.field} 验证失败: ${error.message}`);
    }
}

// 3. 优雅的错误处理方式
console.log("\n=== 优雅的错误处理示例 ===");

// 3.1 异步函数错误处理
async function fetchUserData(userId) {
    try {
        if (typeof userId !== "number") {
            throw new BusinessError("用户ID必须是数字");
        }

        // 使用 JSONPlaceholder 提供的公开测试 API
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof BusinessError) {
            console.error("业务错误:", error.message);
        } else if (error.name === "TypeError") {
            console.error("网络请求错误:", error.message);
        } else {
            console.error("未知错误:", error);
        }
        // 可以选择重新抛出错误
        throw error;
    } finally {
        console.log("无论是否发生错误，这里都会执行");
    }
}

// 测试成功案例
console.log("测试成功案例 - 获取用户ID为1的数据");
fetchUserData(1)
    .then((data) => console.log("获取到的用户数据:", data))
    .catch((error) => console.error("请求失败:", error));

// 测试失败案例 - 使用不存在的用户ID
console.log("\n测试失败案例 - 获取不存在的用户ID 999");
fetchUserData(999)
    .then((data) => console.log("获取到的用户数据:", data))
    .catch((error) => console.error("请求失败:", error));

// 测试业务错误 - 传入非数字ID
console.log("\n测试业务错误 - 传入非数字ID");
fetchUserData("abc")
    .then((data) => console.log("获取到的用户数据:", data))
    .catch((error) => console.error("请求失败:", error));

// 3.2 错误处理最佳实践
function divide(a, b) {
    // 1. 参数验证
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("参数必须是数字");
    }

    // 2. 业务逻辑验证
    if (b === 0) {
        throw new BusinessError("除数不能为0");
    }

    return a / b;
}

// 使用示例
try {
    console.log(divide(10, 2)); // 正常情况
    console.log(divide(10, 0)); // 会抛出业务错误
} catch (error) {
    if (error instanceof BusinessError) {
        console.error("业务错误:", error.message);
    } else {
        console.error("其他错误:", error.message);
    }
}

// 4. Promise 错误处理
console.log("\n=== Promise 错误处理 ===");

const promise = new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
        reject(new Error("操作失败~~~~"));
    }, 1000);
});

// 方式1：使用 catch
promise
    .then((result) => console.log(result))
    .catch((error) => console.error("Promise错误:", error.message));

// 方式2：async/await 配合 try-catch
async function handlePromise() {
    try {
        await promise;
    } catch (error) {
        console.error("Async/Await错误:", error.message);
    }
}

handlePromise();
