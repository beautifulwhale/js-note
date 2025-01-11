/**
 * FormData 完整教程
 */

// 初始化函数：运行所有示例
const initExamples = () => {
    console.log("=== 运行所有表单验证示例 ===");

    console.log("\n1. 验证表单示例：");
    validateForm();

    console.log("\n2. checkValidity 示例：");
    checkValidityExample();

    console.log("\n3. willValidate 属性示例：");
    willValidateExample();

    console.log("\n4. validationMessage 示例：");
    validationMessageExample();

    console.log("\n5. 自定义验证示例：");
    setCustomValidityExample();

    console.log("\n6. validity 属性示例：");
    validityExample();

    console.log("\n7. novalidate 示例：");
    novalidateExample();

    console.log("\n8. 实际应用示例：");
    practicalExample();
};

// 页面加载完成后运行示例
window.addEventListener("DOMContentLoaded", initExamples);

// 1. 表单概述
// FormData 接口提供了一种表示表单数据的键值对的构造方式
// 其主要用于发送表单数据，可以与 XMLHttpRequest、fetch 等 API 配合使用

// 2. FormData 对象的基本使用
// 2.1 创建 FormData 对象
const formData1 = new FormData(); // 创建空的 FormData 对象

// 创建一个表单元素用于演示
const demoForm = document.createElement("form");
const input = document.createElement("input");
input.name = "username";
input.value = "john";
demoForm.appendChild(input);
document.body.appendChild(demoForm);
const formData2 = new FormData(demoForm); // 从表单元素创建 FormData 对象
console.log("formData2", formData2);

// 2.2 实例方法演示
// 添加数据
formData1.append("username", "john"); // 添加字段
formData1.append("files", new Blob(["content"]), "test.txt"); // 添加文件

// 获取数据
console.log(formData1.get("username")); // 获取指定字段的值
console.log(formData1.getAll("files")); // 获取指定字段的所有值

// 检查数据
console.log(formData1.has("username")); // 检查是否包含某个字段

// 删除数据
formData1.delete("username"); // 删除指定字段

// 设置数据（会覆盖已存在的值）
formData1.set("age", "25");

// 3. 表单的内置验证
// 3.1 自动校验示例
const validateForm = () => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "email";
    input.required = true;
    form.appendChild(input);
    document.body.appendChild(form);
    // 表单会自动进行 HTML5 验证
    console.log("form.checkValidity()", form.checkValidity()); // false (空的 email 输入)
};

// 3.2 checkValidity() 方法
const checkValidityExample = () => {
    const input = document.createElement("input");
    input.type = "email";
    input.value = "invalid-email";
    document.body.appendChild(input);
    console.log("input.checkValidity()", input.checkValidity()); // false
};

// 3.3 willValidate 属性
const willValidateExample = () => {
    const input1 = document.createElement("input");
    input1.type = "email";
    console.log("input1.willValidate", input1.willValidate); // true
    document.body.appendChild(input1);
    const input2 = document.createElement("input");
    input2.type = "hidden";
    console.log("input2.willValidate", input2.willValidate); // false
};

// 3.4 validationMessage 属性
const validationMessageExample = () => {
    const input = document.createElement("input");
    input.type = "email";
    input.value = "invalid-email";
    document.body.appendChild(input);
    input.checkValidity();
    console.log("input.validationMessage", input.validationMessage); // 浏览器默认的验证消息
};

// 3.5 自定义验证
const setCustomValidityExample = () => {
    const input = document.createElement("input");
    input.type = "text";
    document.body.appendChild(input);
    // 设置自定义验证消息
    input.addEventListener("input", (e) => {
        if (e.target.value.length < 6) {
            e.target.setCustomValidity("长度必须大于 6 个字符");
        } else {
            e.target.setCustomValidity(""); // 清除自定义验证消息
        }
    });
};

// 3.6 validity 属性
const validityExample = () => {
    const input = document.createElement("input");
    input.type = "email";
    input.value = "invalid-email";
    document.body.appendChild(input);
    const validity = input.validity;
    console.log({
        valueMissing: validity.valueMissing, // 是否为空
        typeMismatch: validity.typeMismatch, // 类型是否匹配
        patternMismatch: validity.patternMismatch, // 是否匹配 pattern
        tooLong: validity.tooLong, // 是否太长
        tooShort: validity.tooShort, // 是否太短
        rangeUnderflow: validity.rangeUnderflow, // 是否小于最小值
        rangeOverflow: validity.rangeOverflow, // 是否大于最大值
        stepMismatch: validity.stepMismatch, // 是否符合步进值
        badInput: validity.badInput, // 输入是否无效
        customError: validity.customError, // 是否有自定义错误
        valid: validity.valid, // 是否有效
    });
};

// 3.7 novalidate 属性
// 在 HTML 中可以通过给 form 添加 novalidate 属性来禁用表单验证
// <form novalidate>...</form>
const novalidateExample = () => {
    const form = document.createElement("form");
    form.noValidate = true; // 禁用表单验证
    document.body.appendChild(form);
};

// 4. enctype 属性说明
/**
 * 在使用 FormData 提交表单时，enctype 属性很重要，它决定了数据的编码方式
 * - application/x-www-form-urlencoded (默认值)
 * - multipart/form-data (当表单包含文件上传时必须使用此值)
 * - text/plain
 */

// 实际应用示例
const practicalExample = () => {
    // 创建一个实际的表单界面
    const formContainer = document.createElement("div");
    formContainer.className = "example-container";

    const form = document.createElement("form");
    form.id = "uploadForm";
    form.enctype = "multipart/form-data";

    // 用户名输入
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.name = "username";
    usernameInput.placeholder = "请输入用户名";
    usernameInput.value = "john";

    // 文件上传
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "avatar";
    fileInput.accept = "image/*";

    // 提交按钮
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "提交表单";

    // 结果显示区域
    const resultDiv = document.createElement("div");
    resultDiv.id = "uploadResult";
    resultDiv.style.marginTop = "10px";

    // 组装表单
    form.appendChild(usernameInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(fileInput);
    form.appendChild(document.createElement("br"));
    form.appendChild(submitButton);
    formContainer.appendChild(form);
    formContainer.appendChild(resultDiv);
    document.body.appendChild(formContainer);

    // 处理表单提交
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        resultDiv.textContent = "表单数据内容：";

        // 显示 FormData 内容
        const ul = document.createElement("ul");
        for (let [key, value] of formData.entries()) {
            const li = document.createElement("li");
            li.textContent = `${key}: ${
                value instanceof File ? `文件 - ${value.name}` : value
            }`;
            ul.appendChild(li);
        }
        resultDiv.appendChild(ul);

        // 注意：这里我们不实际发送请求，而是演示 FormData 的内容
        // 在实际项目中，你需要将下面的 URL 替换为真实的后端 API 地址
        /*
        try {
            const response = await fetch('https://your-api-endpoint/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            resultDiv.textContent = '上传成功：' + JSON.stringify(data);
        } catch (error) {
            resultDiv.textContent = '上传失败：' + error.message;
        }
        */
    });
};
