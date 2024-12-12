// 1. 逻辑与 (&&)
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false

// 短路特性
console.log(false && console.log("不会执行")); // false
console.log(true && "返回最后一个操作数"); // "返回最后一个操作数"

// 2. 逻辑或 (||)
console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false

// 短路特性
console.log(true || console.log("不会执行")); // true
console.log(false || "返回第一个真值"); // "返回第一个真值"

// 3. 逻辑非 (!)
console.log(!true); // false
console.log(!false); // true
console.log(!""); // true (空字符串转换为false)
console.log(!0); // true (0转换为false)
console.log(![]); // false (数组转换为true)
console.log(!{}); // false (对象转换为true)

// 4. 空值合并运算符 (??)
let value;
console.log("test:", value ?? "默认值"); // "默认值"
console.log(null ?? "默认值"); // "默认值"
console.log(undefined ?? "默认值"); // "默认值"
console.log(0 ?? "默认值"); // 0 (只处理null和undefined)

// 5. 可选链运算符 (?.)
const obj = {
    a: {
        b: {
            c: 123,
        },
    },
};
console.log(obj?.a?.b?.c); // 123
console.log(obj?.x?.y?.z); // undefined (不会报错)

// 6. 实际应用示例
function validateUser(user) {
    // 使用&&进行多条件判断
    if (user && user.age && user.age >= 18) {
        return "成年用户";
    }

    // 使用||设置默认值
    const name = user?.name || "匿名用户";

    // 使用??处理null/undefined情况
    const status = user?.status ?? "离线";

    return { name, status };
}

console.log(validateUser({ name: "张三", age: 20 })); // "成年用户"
console.log(validateUser({ age: 16 })); // { name: "匿名用户", status: "离线" }
