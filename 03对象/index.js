// 01 可计算的属性名称
var prefix = "foo";

var obj = {
    [prefix + "bar"]: "bar",
    [prefix + "baz"]: "baz",
};

console.log(obj);

// 02 数组
var arr = ["foo", "bar", "baz"];

arr.a = "a";
console.log("arr", arr);

arr["3"] = "nihao";
console.log("arr--", arr);

// 03 复制对象- 理清深浅拷贝问题.
