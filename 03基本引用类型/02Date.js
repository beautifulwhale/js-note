/**
 * Date 对象用于处理日期和时间
 */

// 1. 创建日期对象
const now = new Date(); // 当前时间
const date1 = new Date("2023-12-25"); // 从字符串创建
const date2 = new Date(2023, 11, 25); // 年,月(0-11),日
const date3 = new Date(1703433600000); // 从时间戳创建

// 2. 获取日期/时间信息
console.log(now.getFullYear()); // 年份
console.log(now.getMonth()); // 月份(0-11)
console.log(now.getDate()); // 日(1-31)
console.log(now.getDay()); // 星期几(0-6,0表示星期日)
console.log(now.getHours()); // 小时(0-23)
console.log(now.getMinutes()); // 分钟(0-59)
console.log(now.getSeconds()); // 秒(0-59)
console.log(now.getMilliseconds()); // 毫秒(0-999)
console.log(now.getTime()); // 时间戳

// 3. 设置日期/时间
const date = new Date();
date.setFullYear(2024);
date.setMonth(0); // 一月
date.setDate(1);
date.setHours(12);
date.setMinutes(30);
date.setSeconds(0);

// 3.1 时间戳相关
// 时间戳是指从1970年1月1日00:00:00 UTC开始经过的毫秒数

// 获取当前时间戳的几种方式
console.log(Date.now()); // 最简单的方式
console.log(new Date().getTime()); // 通过Date对象获取
console.log(+new Date()); // 一元运算符方式

// 时间戳和日期的互相转换
const timestamp = Date.now();
const dateFromTimestamp = new Date(timestamp);
console.log(dateFromTimestamp);

// 时间戳的应用场景
// 1. 计算代码执行时间
const start = Date.now();
for (let i = 0; i < 1000000; i++) {}
const end = Date.now();
console.log(`代码执行时间: ${end - start}ms`);

// 2. 判断过期时间
const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24小时后过期
function isExpired() {
    return Date.now() > expirationTime;
}

// 3. 时间戳格式化为友好时间
function formatTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "刚刚";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
    return `${Math.floor(seconds / 86400)}天前`;
}

const oldTime = Date.now() - 3600 * 1000; // 1小时前
console.log(formatTimeAgo(oldTime)); // "1小时前"

// 4. 日期格式化
// 4.1 内置方法
console.log(now.toLocaleDateString()); // 2023/12/25
console.log(now.toLocaleTimeString()); // 14:30:00
console.log(now.toLocaleString()); // 2023/12/25 14:30:00
console.log(now.toISOString()); // 2023-12-25T06:30:00.000Z

// 4.2 自定义格式化
function formatDate(date, format) {
    const map = {
        yyyy: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, "0"),
        dd: String(date.getDate()).padStart(2, "0"),
        HH: String(date.getHours()).padStart(2, "0"),
        mm: String(date.getMinutes()).padStart(2, "0"),
        ss: String(date.getSeconds()).padStart(2, "0"),
    };

    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (matched) => map[matched]);
}

console.log(formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")); // 2023-12-25 14:30:00

// 5. 日期计算
// 5.1 计算两个日期之间的天数
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const diffTime = Math.abs(date2 - date1);
    return Math.floor(diffTime / oneDay);
}

const startDate = new Date("2023-01-01");
const endDate = new Date("2023-12-31");
console.log(daysBetween(startDate, endDate)); // 364

// 5.2 增加/减少天数
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

console.log(formatDate(addDays(new Date(), 7), "yyyy-MM-dd")); // 7天后的日期

// 6. 实际应用场景
// 6.1 倒计时功能
function countdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

// 6.2 年龄计算
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
}

console.log(calculateAge("1990-01-01")); // 33 (2023年)
