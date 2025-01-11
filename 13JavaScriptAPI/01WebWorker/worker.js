// worker 上下文中使用 self 或 this 引用全局作用域
self.onmessage = function (e) {
    const { type, data } = e.data;

    switch (type) {
        case "basic":
            // 基本消息处理
            console.log("Worker 收到消息:", data);
            self.postMessage("Worker 已处理消息: " + data);
            break;

        case "pool":
            // worker 池处理
            const workerId = e.data.workerId;
            self.postMessage(`Worker ${workerId} 正在工作`);
            break;

        case "subworker":
            // 创建子 worker（需要浏览器支持）
            try {
                const subWorker = new Worker("./sub-worker.js");
                subWorker.onmessage = function (e) {
                    self.postMessage("从子 worker 收到: " + e.data);
                };
                subWorker.postMessage("Hello from parent worker!");
            } catch (err) {
                self.postMessage("创建子 worker 失败: " + err.message);
            }
            break;
    }
};

// 错误处理
self.onerror = function (error) {
    console.error("Worker 内部错误:", error);
    self.postMessage({ type: "error", error: error.message });
};
