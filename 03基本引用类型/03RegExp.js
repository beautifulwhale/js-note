/**
 * 正则表达式 (RegExp) 是用于模式匹配的强大工具
 */

// 1. 创建正则表达式
const regex1 = /abc/; // 字面量方式
const regex2 = new RegExp("abc"); // 构造函数方式

// 2. 正则表达式的常用属性
console.log(regex1.source); // "abc" - 正则表达式的源文本
console.log(regex1.flags); // "" - 正则表达式的标志
console.log(regex1.global); // false - 是否全局匹配
console.log(regex1.ignoreCase); // false - 是否忽略大小写
console.log(regex1.multiline); // false - 是否多行匹配
console.log(regex1.lastIndex); // 0 - 下次匹配的起始位置

// 3. 正则表达式的常用方法
const str = "abc123abc";

// 3.1 test() - 测试字符串是否匹配正则表达式
console.log(regex1.test(str)); // true

// 3.2 exec() - 在字符串中执行匹配搜索，返回结果数组
console.log(regex1.exec(str)); // ["abc", index: 0, input: "abc123abc", groups: undefined]

// 4. String对象中使用正则表达式的方法
const str2 = "The quick brown fox jumps over the lazy dog.";

// 4.1 match() - 返回所有匹配的结果
const regex3 = /[A-Z]/g;
console.log(str2.match(regex3)); // ["T"]

// 4.2 search() - 搜索与正则表达式匹配的值并返回索引
console.log(str2.search(regex3)); // 0

// 4.3 replace() - 替换与正则表达式匹配的子串
const regex4 = /dog/;
console.log(str2.replace(regex4, "cat")); // "The quick brown fox jumps over the lazy cat."

// 4.4 split() - 使用正则表达式分割字符串
const regex5 = /\s/;
console.log(str2.split(regex5)); // ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."]

// 5. 实际应用场景
// 5.1 验证邮箱格式
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
console.log(validateEmail("test@example.com")); // true

// 5.2 提取URL中的域名
function extractDomain(url) {
    const domainRegex = /https?:\/\/(www\.)?([^\/]+)/;
    const match = url.match(domainRegex);
    return match ? match[2] : null;
}
console.log(extractDomain("https://www.example.com/path")); // "example.com"

// 5.3 替换文本中的敏感词
function censorText(text, words) {
    const regex = new RegExp(words.join("|"), "gi");
    return text.replace(regex, (match) => "*".repeat(match.length));
}
console.log(censorText("This is a bad word.", ["bad"])); // "This is a *** word."
