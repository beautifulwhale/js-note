/**
 * 原始值包装类型 (Boolean, Number, String) 是 JavaScript 提供的三种特殊对象类型，用于包装原始值。
 * 这些包装对象允许我们像操作对象一样操作原始值。
 */

// 1. Boolean 包装类型
const boolPrimitive = true; // 原始值
const boolObject = new Boolean(true); // 包装对象

console.log(typeof boolPrimitive); // "boolean"
console.log(typeof boolObject); // "object"
console.log(boolPrimitive == boolObject); // true
console.log(boolPrimitive === boolObject); // false

// 2. Number 包装类型
const numPrimitive = 42; // 原始值
const numObject = new Number(42); // 包装对象

console.log(typeof numPrimitive); // "number"
console.log(typeof numObject); // "object"
console.log(numPrimitive == numObject); // true
console.log(numPrimitive === numObject); // false

// 3. String 包装类型
const strPrimitive = "hello"; // 原始值
const strObject = new String("hello"); // 包装对象

console.log(typeof strPrimitive); // "string"
console.log(typeof strObject); // "object"
console.log(strPrimitive == strObject); // true
console.log(strPrimitive === strObject); // false

/**
 * 注意事项:
 * 1. 原始值包装类型在需要时会自动创建和销毁包装对象。
 * 2. 尽量避免显式创建包装对象，因为这会导致不必要的性能开销和潜在的错误。
 */
