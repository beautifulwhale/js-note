/**
 * ES6 字符串扩展
 *
 * ES6 对字符串进行了多方面的扩展，使得字符串操作更加方便和强大。以下是一些主要的扩展内容：
 *
 * 1. 字符串遍历
 * 2. 模板字符串
 * 3. 标签模板
 * 4. 新增的字符串方法
 */

// 1. 字符串遍历
// ES6 引入了 for...of 循环，可以直接遍历字符串中的每一个字符。
const str1 = "hello";
for (const char of str1) {
    console.log(char); // 输出 h e l l o
}

// 2. 模板字符串
// 模板字符串使用反引号（`）包裹，可以在字符串中嵌入变量和表达式，语法更加简洁。
const name1 = "Alice";
const age1 = 25;
const city = "New York";
const message = `My name is ${name1}, I am ${age1} years old, and I live in ${city}.`;
console.log(message); // 输出 My name is Alice, I am 25 years old, and I live in New York.

// 3. 标签模板
// 标签模板是一种高级用法，可以对模板字符串进行定制处理。标签模板的语法是：标签函数名`模板字符串`。
// 标签模板的入参
// 标签模板的第一个参数是一个字符串数组，包含模板字符串中静态部分的内容。
// 后续的参数是模板字符串中嵌入的变量或表达式的值。
function exampleTag(strings, ...values) {
    console.log("strings:", strings);
    console.log("values:", values);
}

const name2 = "Bob";
const age2 = 30;
exampleTag`My name is ${name2}, and I am ${age2} years old.`;
// 输出：
// strings: ["My name is ", ", and I am ", " years old."]
// values: ["Bob", 30]

function tag(strings, ...values) {
    console.log(strings); // 输出 ["Hello ", " world ", "!"]
    console.log(values); // 输出 ["beautiful"]
    return strings[0] + values[0] + strings[1] + strings[2];
}
const result = tag`Hello ${"beautiful"} world${"!"}`;
console.log(result); // 输出 Hello beautiful world!

// 4. 新增的字符串方法

// 1. startsWith()
// 用于判断字符串是否以指定的子字符串开头，返回布尔值。
const str3 = "Hello, world!";
console.log(str3.startsWith("Hello")); // 输出 true
console.log(str3.startsWith("world", 7)); // 输出 true

// 2. endsWith()
// 用于判断字符串是否以指定的子字符串结尾，返回布尔值。
console.log(str3.endsWith("!")); // 输出 true
console.log(str3.endsWith("Hello", 5)); // 输出 true

// 3. includes()
// 用于判断字符串是否包含指定的子字符串，返回布尔值。
console.log(str3.includes("world")); // 输出 true
console.log(str3.includes("Hello", 6)); // 输出 false

// 4. repeat()
// 用于将字符串重复指定次数，返回一个新字符串。
const str4 = "abc";
console.log(str4.repeat(3)); // 输出 abcabcabc

// 5. padStart()
// 用于在字符串的开头填充指定的字符，直到达到指定的长度。
const str5 = "123";
console.log(str5.padStart(6, "0")); // 输出 000123

// 6. padEnd()
// 用于在字符串的末尾填充指定的字符，直到达到指定的长度。
console.log(str5.padEnd(6, "0")); // 输出 123000

// 7. trimStart() / trimEnd()
// 用于去除字符串开头或末尾的空白字符，返回一个新字符串。
const str6 = "   Hello, world!   ";
console.log(str6.trimStart()); // 输出 "Hello, world!   "
console.log(str6.trimEnd()); // 输出 "   Hello, world!"

// 8. trim()
// 用于去除字符串两端的空白字符，返回一个新字符串。
console.log(str6.trim()); // 输出 "Hello, world!"

// 9. matchAll()
// 用于返回一个包含所有匹配正则表达式的迭代器。
const str7 = "Hello, world! Hello, everyone!";
const matches = str7.matchAll(/Hello/g);
for (const match of matches) {
    console.log(match); // 输出 ["Hello", index: 0, input: "Hello, world! Hello, everyone!", groups: undefined]
}

// 10. replaceAll()
// 用于将字符串中所有匹配正则表达式的子字符串替换为指定字符串，返回一个新字符串。
const str8 = "Hello, world! Hello, everyone!";
const result2 = str8.replaceAll(/Hello/g, "Hi");
console.log(result2); // 输出 "Hi, world! Hi, everyone!"

// 11.normalize()
// 用于将字符串标准化，返回一个新字符串。
const str9 = "café";
console.log(str9.normalize()); // 输出 "café"

// 12.codePointAt()
// 用于返回字符串中指定位置的字符的 Unicode 码点。
const str10 = "Hello, world!";
console.log(str10.codePointAt(0)); // 输出 72

// 13.fromCodePoint()
// 用于将 Unicode 码点转换为字符串。
console.log(String.fromCodePoint(72, 101, 108, 108, 111)); // 输出 "Hello"

// 14.raw()
// 用于返回字符串的原始字面量形式。
const str11 = "Hello\nworld!";
console.log(str11.raw); // 输出 "Hello\\nworld!"

// 15.at()
// 用于返回字符串中指定位置的字符。
const str12 = "Hello, world!";
console.log(str12.at(0)); // 输出 "H"

// 16.match()
// 用于返回一个包含所有匹配正则表达式的迭代器。
const str13 = "Hello, world!";
const matches2 = str13.match(/Hello/g);
console.log(matches2); // 输出 ["Hello"]

// 17.search()
// 用于返回字符串中第一个匹配正则表达式的位置。
const str14 = "Hello, world!";
console.log(str14.search(/world/)); // 输出 7

/**
 * 结论：
 * ES6 新增的字符串方法极大地方便了字符串的操作，常用的方法包括 startsWith()、endsWith()、includes()、repeat()、padStart()、padEnd()、trimStart()、trimEnd()、trim()、matchAll()、replaceAll()、normalize()、codePointAt()、fromCodePoint()、raw()、at()、match()、search()。这些方法使得字符串的处理更加简洁和高效。
 */
