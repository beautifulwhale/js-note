/**
 * Web Storage 介绍
 *
 * localStorage和sessionStorage都是Web Storage API的一部分
 * 它们提供了在浏览器中存储键值对数据的方法
 */

// 1. localStorage基本使用
// 数据会永久保存在浏览器中，除非手动清除
console.log("--- localStorage示例 ---");

// 存储数据
localStorage.setItem("username", "zhangsan");
localStorage.setItem("age", "25");

// 获取数据
console.log(localStorage.getItem("username")); // 'zhangsan'

// 删除特定数据
localStorage.removeItem("age");

// 获取所有键
console.log(localStorage.key(0)); // 'username'

// 获取存储项数量
console.log(localStorage.length); // 1

// 清除所有数据
localStorage.clear();

// 2. sessionStorage基本使用
// 数据只在当前会话期间有效，关闭标签页就会清除
console.log("\n--- sessionStorage示例 ---");

// 存储数据
sessionStorage.setItem("tempData", "some value");
sessionStorage.setItem("cartItems", JSON.stringify([1, 2, 3]));

// 获取数据
const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
console.log(cartItems); // [1, 2, 3]

// 3. Storage事件监听
// 注意：Storage事件只在其他页面修改存储数据时触发
window.addEventListener("storage", (e) => {
    console.log("Storage changed:", {
        key: e.key,
        oldValue: e.oldValue,
        newValue: e.newValue,
        url: e.url,
    });
});

/**
 * localStorage和sessionStorage的主要区别：
 *
 * 1. 数据生命周期
 *    - localStorage: 永久性存储，除非手动删除
 *    - sessionStorage: 仅在当前会话期间有效，关闭标签页就清除
 *
 * 2. 作用域
 *    - localStorage: 同源的所有标签页和窗口共享数据
 *    - sessionStorage: 仅限于当前标签页
 *
 * 3. 存储容量
 *    - 通常both约为5-10MB（具体取决于浏览器）
 *
 * 4. 应用场景
 *    localStorage适用于：
 *    - 用户偏好设置
 *    - 主题配置
 *    - 长期缓存的数据
 *    - 用户登录状态
 *
 *    sessionStorage适用于：
 *    - 表单数据临时保存
 *    - 购物车临时数据
 *    - 一次性会话数据
 *    - 标签页独立的数据
 */

// 5. 实际使用示例

// 示例1：保存用户主题偏好
const saveThemePreference = (theme) => {
    localStorage.setItem("theme", theme);
};

const getThemePreference = () => {
    return localStorage.getItem("theme") || "light"; // 默认light主题
};

// 示例2：购物车临时存储
const addToCart = (item) => {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    cart.push(item);
    sessionStorage.setItem("cart", JSON.stringify(cart));
};

const getCart = () => {
    return JSON.parse(sessionStorage.getItem("cart") || "[]");
};

// 示例3：表单数据自动保存
const saveFormData = (formData) => {
    sessionStorage.setItem("formBackup", JSON.stringify(formData));
};

const getFormBackup = () => {
    const backup = sessionStorage.getItem("formBackup");
    return backup ? JSON.parse(backup) : null;
};

// 使用示例
saveThemePreference("dark");
addToCart({ id: 1, name: "product1", price: 99 });
saveFormData({ name: "zhang", email: "test@example.com" });
