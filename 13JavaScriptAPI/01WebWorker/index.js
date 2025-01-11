// 辅助函数：用于显示输出
function appendOutput(elementId, message) {
    const output = document.getElementById(elementId);
    const line = document.createElement("div");
    line.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

// 1. 基本 Worker
let basicWorker;
function testBasicWorker() {
    if (!basicWorker) {
        basicWorker = new Worker("./worker.js");
        basicWorker.onmessage = function (e) {
            appendOutput("basicOutput", e.data);
        };
    }
    basicWorker.postMessage({ type: "basic", data: "你好，Worker！" });
}

// 2. 轮询 Worker
let pollingWorker;
function startPolling() {
    if (!pollingWorker) {
        pollingWorker = new Worker("./polling-worker.js");
        pollingWorker.onmessage = function (e) {
            appendOutput("pollingOutput", JSON.stringify(e.data));
        };
    }
    pollingWorker.postMessage({ type: "startPolling", interval: 2000 });
}

function stopPolling() {
    if (pollingWorker) {
        pollingWorker.postMessage({ type: "stopPolling" });
        pollingWorker.terminate();
        pollingWorker = null;
        appendOutput("pollingOutput", "轮询已停止");
    }
}

// 3. Worker 池
const workerPool = [];
function testWorkerPool() {
    // 创建3个 worker
    for (let i = 0; i < 3; i++) {
        if (!workerPool[i]) {
            const worker = new Worker("./worker.js");
            worker.onmessage = function (e) {
                appendOutput("poolOutput", e.data);
            };
            workerPool[i] = worker;
        }
        workerPool[i].postMessage({ type: "pool", workerId: i });
    }
}

// 4. 共享 Worker
let sharedWorker;
function testSharedWorker() {
    if (!sharedWorker) {
        sharedWorker = new SharedWorker("./shared-worker.js");
        sharedWorker.port.start();
        sharedWorker.port.onmessage = function (e) {
            appendOutput("sharedOutput", e.data);
        };
    }
    sharedWorker.port.postMessage("来自页面的共享消息");
}

// 页面卸载时清理
window.onunload = function () {
    if (basicWorker) basicWorker.terminate();
    if (pollingWorker) pollingWorker.terminate();
    workerPool.forEach((worker) => worker.terminate());
};

// 添加全局错误处理
window.onerror = function (message, source, lineno, colno, error) {
    console.error("Global error:", { message, source, lineno, colno, error });
    alert(`Error: ${message}\nFile: ${source}\nLine: ${lineno}`);
};
