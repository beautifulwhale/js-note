// Blob对象
console.log("=== Blob对象 ===");
// 1. Blob构造函数
const text = "Hello World";
const blob1 = new Blob([text], { type: "text/plain" });
console.log("Blob大小:", blob1.size, "字节");
console.log("Blob类型:", blob1.type);

// 2. Blob方法
// slice方法：截取blob的一部分
const blob2 = blob1.slice(0, 5, "text/plain");
console.log("截取的Blob大小:", blob2.size, "字节");

// 3. Blob转换为其他格式
// 转换为URL
const blobUrl = URL.createObjectURL(blob1);
console.log("Blob URL:", blobUrl);
// 使用完后释放
URL.revokeObjectURL(blobUrl);

// File对象（继承自Blob）
console.log("\n=== File对象 ===");
// 1. 创建File对象
const file = new File(["今天天气真好"], "test.txt", {
    type: "text/plain",
    lastModified: new Date().getTime(),
});
console.log("文件名:", file.name);
console.log("文件大小:", file.size, "字节");
console.log("文件类型:", file.type);
console.log("最后修改时间:", new Date(file.lastModified));

// FileReader对象
console.log("\n=== FileReader对象 ===");
const reader = new FileReader();

// 1. 读取文本
reader.onload = function (e) {
    console.log("读取到的文本:", e.target.result);
};
reader.onerror = function (e) {
    console.error("读取错误:", e.target.error);
};
reader.readAsText(file);

// 2. 读取为DataURL
const imageBlob = new Blob(["假装这是图片数据"], { type: "image/jpeg" });
const imageReader = new FileReader();
imageReader.onload = function (e) {
    console.log("DataURL:", e.target.result.slice(0, 50) + "...");
};
imageReader.readAsDataURL(imageBlob);

// 3. 综合示例：Blob、File和FileReader配合使用
// 创建一个包含JSON数据的Blob
const jsonData = { name: "张三", age: 25 };
const jsonBlob = new Blob([JSON.stringify(jsonData)], {
    type: "application/json",
});

// 将Blob转换为File
const jsonFile = new File([jsonBlob], "data.json", {
    type: "application/json",
    lastModified: Date.now(),
});

// 使用FileReader读取File内容
const jsonReader = new FileReader();
jsonReader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    console.log("解析后的JSON数据:", data);
};
jsonReader.readAsText(jsonFile);

// 实用示例：文件分片上传
const largeFile = new File(["大文件内容".repeat(1000)], "large.txt", {
    type: "text/plain",
});
const CHUNK_SIZE = 1024; // 1KB分片

function* createChunks(file, chunkSize) {
    let offset = 0;
    while (offset < file.size) {
        const chunk = file.slice(offset, offset + chunkSize);
        offset += chunkSize;
        yield chunk;
    }
}

// 演示分片
const chunks = [...createChunks(largeFile, CHUNK_SIZE)];
console.log(`文件大小: ${largeFile.size}字节，分成了${chunks.length}片`);
console.log("第一片大小:", chunks[0].size, "字节");
console.log("第二片大小:", chunks[1].size, "字节");
console.log("最后一片大小:", chunks[chunks.length - 1].size, "字节");
