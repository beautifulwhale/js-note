// Canvas基础使用示例

// 1. 获取Canvas元素和上下文
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// 2. 设置Canvas尺寸
canvas.width = 800;
canvas.height = 600;

// 3. 基本形状绘制
function drawBasicShapes() {
    // 矩形
    ctx.fillStyle = "red"; // 设置填充颜色
    ctx.fillRect(50, 50, 100, 80); // 填充矩形

    ctx.strokeStyle = "blue"; // 设置描边颜色
    ctx.lineWidth = 2; // 设置线条宽度
    ctx.strokeRect(200, 50, 100, 80); // 描边矩形

    // 路径绘制
    ctx.beginPath(); // 开始路径
    ctx.moveTo(350, 50); // 移动到起点
    ctx.lineTo(450, 50); // 画直线
    ctx.lineTo(400, 130);
    ctx.closePath(); // 闭合路径
    ctx.fillStyle = "green";
    ctx.fill(); // 填充
    ctx.stroke(); // 描边

    // 圆形
    ctx.beginPath();
    ctx.arc(550, 90, 40, 0, Math.PI * 2); // 圆心x,y,半径,起始角度,结束角度
    ctx.fillStyle = "purple";
    ctx.fill();
}

// 4. 绘制文本
function drawText() {
    ctx.font = "30px Arial"; // 设置字体
    ctx.fillStyle = "black";
    ctx.fillText("Hello Canvas!", 50, 200); // 填充文本

    ctx.strokeStyle = "orange";
    ctx.strokeText("Stroke Text", 300, 200); // 描边文本
}

// 5. 渐变
function drawGradient() {
    // 线性渐变
    const gradient = ctx.createLinearGradient(50, 250, 250, 250);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "blue");

    ctx.fillStyle = gradient;
    ctx.fillRect(50, 250, 200, 100);

    // 径向渐变
    const radialGradient = ctx.createRadialGradient(400, 300, 10, 400, 300, 50);
    radialGradient.addColorStop(0, "yellow");
    radialGradient.addColorStop(1, "green");

    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(400, 300, 50, 0, Math.PI * 2);
    ctx.fill();
}

// 6. 图片绘制
function drawImage() {
    const img = new Image();
    img.src = "./test.jpg"; // 替换为实际图片路径
    img.onload = () => {
        ctx.drawImage(img, 50, 400, 200, 150); // x,y,宽度,高度
    };
}

// 7. 简单动画
function animate() {
    let x = 0;
    function draw() {
        ctx.clearRect(600, 250, 150, 150); // 清除指定区域
        ctx.beginPath();
        ctx.arc(650 + Math.sin(x) * 30, 300, 20, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        x += 0.05;
        requestAnimationFrame(draw);
    }
    draw();
}

// 8. 变换
function transform() {
    ctx.save(); // 保存当前状态

    ctx.translate(600, 400); // 平移
    ctx.rotate(Math.PI / 4); // 旋转45度
    ctx.scale(1.5, 1.5); // 缩放

    ctx.fillStyle = "blue";
    ctx.fillRect(-25, -25, 50, 50);

    ctx.restore(); // 恢复之前的状态
}

// 执行所有示例
function init() {
    drawBasicShapes();
    drawText();
    drawGradient();
    drawImage();
    animate();
    transform();
}

// 当页面加载完成后执行
window.addEventListener("load", init);
