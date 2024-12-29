// ArrayBuffer, TypedArray 和 DataView 是 JavaScript 中用于处理二进制数据的对象。

// 1. ArrayBuffer:
// ArrayBuffer 是一个通用的、固定长度的原始二进制数据缓冲区。它不能直接操作数据，但可以通过视图（TypedArray 或 DataView）来操作。

// 常用属性:
// - byteLength: 返回 ArrayBuffer 的字节长度。

// 常用方法:
// - slice(begin, end): 返回一个新的 ArrayBuffer，包含从 begin 到 end（不包括 end）之间的字节。

// 使用示例:
const buffer = new ArrayBuffer(16); // 创建一个 16 字节的 ArrayBuffer
console.log(buffer.byteLength); // 输出: 16

// 2. TypedArray:
// TypedArray 是一组类型化数组的视图，用于操作 ArrayBuffer 中的二进制数据。常见的类型化数组包括 Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array 等。

// 常用属性:
// - buffer: 返回 TypedArray 所基于的 ArrayBuffer。
// - byteLength: 返回 TypedArray 的字节长度。
// - byteOffset: 返回 TypedArray 在 ArrayBuffer 中的偏移量。
// - length: 返回 TypedArray 中元素的个数。

// 常用方法:
// - set(array, offset, length): 从指定的数组复制值到 TypedArray。
// - subarray(begin, end): 返回一个新的 TypedArray，包含从 begin 到 end（不包括 end）之间的元素。

// 使用示例:
const int32View = new Int32Array(buffer);
int32View[0] = 42;
console.log(int32View[0]); // 输出: 42

// 3. DataView:
// DataView 是一个视图，允许在 ArrayBuffer 上以任意字节偏移读取和写入多种数值类型。

// 常用属性:
// - buffer: 返回 DataView 所基于的 ArrayBuffer。
// - byteLength: 返回 DataView 的字节长度。
// - byteOffset: 返回 DataView 在 ArrayBuffer 中的偏移量。

// 常用方法:
// - getInt8(byteOffset): 读取指定偏移量的 8 位有符号整数。
// - getUint8(byteOffset): 读取指定偏移量的 8 位无符号整数。
// - getInt16(byteOffset, littleEndian): 读取指定偏移量的 16 位有符号整数。
// - getUint16(byteOffset, littleEndian): 读取指定偏移量的 16 位无符号整数。
// - getInt32(byteOffset, littleEndian): 读取指定偏移量的 32 位有符号整数。
// - getUint32(byteOffset, littleEndian): 读取指定偏移量的 32 位无符号整数。
// - getFloat32(byteOffset, littleEndian): 读取指定偏移量的 32 位浮点数。
// - getFloat64(byteOffset, littleEndian): 读取指定偏移量的 64 位浮点数。
// - setInt8(byteOffset, value): 在指定偏移量写入 8 位有符号整数。
// - setUint8(byteOffset, value): 在指定偏移量写入 8 位无符号整数。
// - setInt16(byteOffset, value, littleEndian): 在指定偏移量写入 16 位有符号整数。
// - setUint16(byteOffset, value, littleEndian): 在指定偏移量写入 16 位无符号整数。
// - setInt32(byteOffset, value, littleEndian): 在指定偏移量写入 32 位有符号整数。
// - setUint32(byteOffset, value, littleEndian): 在指定偏移量写入 32 位无符号整数。
// - setFloat32(byteOffset, value, littleEndian): 在指定偏移量写入 32 位浮点数。
// - setFloat64(byteOffset, value, littleEndian): 在指定偏移量写入 64 位浮点数。

// 使用示例:
const view = new DataView(buffer);
view.setInt8(0, 127);
console.log(view.getInt8(0)); // 输出: 127

// 使用用途:
// - ArrayBuffer, TypedArray 和 DataView 常用于处理原始二进制数据，特别是在 WebGL、文件 I/O、网络通信等需要高效处理二进制数据的场景中。
// - 通过这些 API，可以方便地在 JavaScript 中处理各种数值类型的数据，并进行高效的读写操作。

// 4. SharedArrayBuffer 和 Atomics:
// SharedArrayBuffer 是一种共享内存的机制，允许多个线程（如 Web Workers）并发访问同一个内存区域。Atomics 是一组静态方法，用于在共享内存上进行原子操作，确保并发访问的正确性。

// SharedArrayBuffer 常用属性:
// - byteLength: 返回 SharedArrayBuffer 的字节长度。

// 使用示例:
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);
sharedArray[0] = 42;
console.log(sharedArray[0]); // 输出: 42

// Atomics 常用方法:
// - Atomics.load(typedArray, index): 从指定位置读取值。
// - Atomics.store(typedArray, index, value): 在指定位置存储值。
// - Atomics.add(typedArray, index, value): 将指定位置的值加上给定值，并返回旧值。
// - Atomics.sub(typedArray, index, value): 将指定位置的值减去给定值，并返回旧值。
// - Atomics.and(typedArray, index, value): 对指定位置的值与给定值进行按位与操作，并返回旧值。
// - Atomics.or(typedArray, index, value): 对指定位置的值与给定值进行按位或操作，并返回旧值。
// - Atomics.xor(typedArray, index, value): 对指定位置的值与给定值进行按位异或操作，并返回旧值。
// - Atomics.exchange(typedArray, index, value): 将指定位置的值替换为给定值，并返回旧值。
// - Atomics.compareExchange(typedArray, index, expectedValue, replacementValue): 如果指定位置的值等于预期值，则将其替换为新值，并返回旧值。
// - Atomics.wait(typedArray, index, value, timeout): 如果指定位置的值等于给定值，则阻塞线程，直到值发生变化或超时。
// - Atomics.notify(typedArray, index, count): 唤醒在指定位置等待的线程。

// 使用示例:
const sab = new SharedArrayBuffer(1024);
const int32 = new Int32Array(sab);
int32[0] = 0;

console.log(Atomics.load(int32, 0)); // 输出: 0
console.log(Atomics.add(int32, 0, 1)); // 输出: 0
console.log(Atomics.load(int32, 0)); // 输出: 1

// 使用用途:
// - SharedArrayBuffer 和 Atomics 常用于多线程编程，特别是在 Web Workers 中实现高效的并发操作。
// - 通过这些 API，可以在多个线程之间共享数据，并确保对共享数据的原子操作，避免数据竞争和不一致性。
// - 适用于需要高性能并发处理的场景，如实时数据处理、并行计算等。
