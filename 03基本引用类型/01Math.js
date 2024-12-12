/**
 * Math对象提供了数学计算相关的属性和方法
 */

// 1. Math的常用属性
console.log(Math.PI); // 圆周率 3.141592653589793
console.log(Math.E); // 自然对数的底数 2.718281828459045
console.log(Math.LN2); // 2的自然对数 0.6931471805599453
console.log(Math.LN10); // 10的自然对数 2.302585092994046

// 2. Math的常用方法

// 2.1 取整相关
console.log(Math.ceil(4.3)); // 向上取整 5
console.log(Math.floor(4.7)); // 向下取整 4
console.log(Math.round(4.5)); // 四舍五入 5
console.log(Math.trunc(4.7)); // 去除小数部分 4

// 2.2 随机数
console.log(Math.random()); // 返回0-1之间的随机数

// 生成指定范围的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(1, 10)); // 1-10之间的随机整数

// 2.3 最值
console.log(Math.max(1, 5, 3, 9, 2)); // 9
console.log(Math.min(1, 5, 3, 9, 2)); // 1

// 数组中找最值
const numbers = [1, 5, 3, 9, 2];
console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers)); // 1

// 2.4 幂运算
console.log(Math.pow(2, 3)); // 2的3次方 8
console.log(Math.sqrt(16)); // 平方根 4
console.log(Math.cbrt(27)); // 立方根 3

// 2.5 三角函数
console.log(Math.sin(Math.PI / 2)); // 1
console.log(Math.cos(Math.PI)); // -1
console.log(Math.tan(Math.PI / 4)); // 1

// 2.6 绝对值
console.log(Math.abs(-5)); // 5

// 3. 实际应用场景

// 3.1 计算圆的面积和周长
function calculateCircle(radius) {
    return {
        area: Math.PI * Math.pow(radius, 2),
        perimeter: 2 * Math.PI * radius,
    };
}
console.log(calculateCircle(5));

// 3.2 生成随机颜色
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
console.log(getRandomColor()); // 例如 "#ff0f34"

// 3.3 数值精确到指定位数
function roundTo(num, decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
console.log(roundTo(3.1415926, 2)); // 3.14

// 3.4 计算两点之间的距离
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
console.log(getDistance(0, 0, 3, 4)); // 5

// 3.5 生成随机密码
function generatePassword(length = 8) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
}
console.log(generatePassword()); // 例如 "Kj9p2mN4"
