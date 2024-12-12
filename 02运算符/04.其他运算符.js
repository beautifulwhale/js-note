// 1. void 运算符
// void 运算符对给定的表达式进行求值,然后返回 undefined
console.log(void 0); // undefined
console.log(void(2 + 3)); // undefined
console.log(void "hello"); // undefined

// void 运算符的使用场景:
// 1.1 获取 undefined 的安全方式(因为 undefined 可能被重新赋值)
let undefined = 1; // undefined 被重新赋值
console.log(undefined); // 1
console.log(void 0); // undefined (安全获取)

// 1.2 在立即执行函数中阻止返回值
const result = void function(){ return 123; }(); 
console.log(result); // undefined

// 1.3 在箭头函数中避免返回值
const button = {
    click: () => void console.log("clicked") // 避免返回 console.log 的结果
};

// 2. 逗号运算符
// 逗号运算符从左到右计算每个操作数,并返回最后一个操作数的值
let x = (1, 2, 3);
console.log(x); // 3

// 2.1 在复杂表达式中使用
let a, b;
for(a = 1, b = 10; a < 5; a++, b++) {
    console.log(a, b);
}

// 2.2 在返回语句中使用
function test() {
    return (console.log("执行操作"), true);
}
console.log(test()); // 先打印"执行操作",然后返回 true

// 3. 运算符优先级
// 从高到低排列一些常见运算符的优先级
console.log("\n运算符优先级示例:");
// 3.1 圆括号 () 优先级最高
console.log((2 + 3) * 4); // 20

// 3.2 一元运算符
console.log(!true && true); // false (! 优先级高于 &&)
// console.log(-2 ** 2); // 语法错误 (** 优先级高于一元-)
console.log((-2) ** 2); // 4 (使用括号确保正确运算)

// 3.3 算术运算符
console.log(2 + 3 * 4); // 14 (* 优先级高于 +)
console.log(10 - 5 + 3); // 8 (从左到右计算)

// 3.4 比较运算符
console.log(5 > 3 && 2 < 4); // true (比较运算符优先级高于逻辑运算符)

// 3.5 逻辑运算符
console.log(true && false || true); // true (&& 优先级高于 ||)

// 3.6 赋值运算符优先级最低
let y = 1, z = 2;
y = z = 3;
console.log(y, z); // 3 3

// 优先级速查表(部分):
/*
1. () 圆括号
2. ! ~ ++ -- typeof void delete 一元运算符
3. ** 指数
4. * / % 乘除模
5. + - 加减
6. < <= > >= 比较
7. == === != !== 相等
8. && 逻辑与
9. || 逻辑或
10. ?: 条件运算符
11. = += -= *= 等赋值运算符
12. , 逗号运算符
*/
