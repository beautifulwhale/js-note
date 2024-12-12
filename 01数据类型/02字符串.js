/**
 * JavaScript 字符串基础知识点和常用API示例
 */

// 1. 字符串的创建方式
const str1 = "Hello"; // 单引号
const str2 = "World"; // 双引号
const str3 = `Hello ${str2}`; // 模板字符串,支持变量插值和多行文本

// 2. 常用字符串属性和方法
const text = "JavaScript String Methods";

// 2.1 length属性
console.log(text.length); // 23

// 2.2 位置和查找
console.log(text.indexOf("String")); // 11
console.log(text.lastIndexOf("t")); // 18
console.log(text.includes("Script")); // true
console.log(text.startsWith("Java")); // true
console.log(text.endsWith("Methods")); // true

// 2.3 截取字符串
console.log(text.slice(0, 10)); // "JavaScript"
console.log(text.substring(11, 17)); // "String"
console.log(text.substr(11, 6)); // "String" (不推荐使用)

// 2.4 大小写转换
console.log(text.toLowerCase()); // "javascript string methods"
console.log(text.toUpperCase()); // "JAVASCRIPT STRING METHODS"

// 2.5 去除空格
const spaceText = "  trim example  ";
console.log(spaceText.trim()); // "trim example"
console.log(spaceText.trimStart()); // "trim example  "
console.log(spaceText.trimEnd()); // "  trim example"

// 2.6 替换
console.log(text.replace("String", "Text")); // "JavaScript Text Methods"
console.log(text.replaceAll("t", "T")); // "JavaScripT STring MeThods"

// 2.7 分割和连接
console.log(text.split(" ")); // ["JavaScript", "String", "Methods"]
console.log(["Hello", "World"].join(" ")); // "Hello World"

// 2.8 字符串填充
console.log("5".padStart(3, "0")); // "005"
console.log("5".padEnd(3, "0")); // "500"

// 3. Base64 编码解码
const str = "Hello, 世界!";
// 编码
const encoded = btoa(unescape(encodeURIComponent(str)));
console.log("Base64 编码:", encoded);

// 解码
const decoded = decodeURIComponent(escape(atob(encoded)));
console.log("Base64 解码:", decoded);

// 4. 实用的字符串处理函数示例
// 4.1 首字母大写
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
console.log(capitalize("javascript")); // "Javascript"

// 4.2 驼峰命名转换
function toCamelCase(str) {
    return str.toLowerCase().replace(/-(\w)/g, (_, c) => c.toUpperCase());
}
console.log(toCamelCase("background-color")); // "backgroundColor"

// 4.3 重复字符串
console.log("abc".repeat(3)); // "abcabcabc"

// 4.4 截断字符串
function truncate(str, maxLength) {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}
console.log(truncate("这是一段很长的文本", 5)); // "这是一段..."
