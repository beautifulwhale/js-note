let pollingInterval;

self.onmessage = function (e) {
    const { type, interval } = e.data;

    if (type === "startPolling") {
        // 开始轮询
        pollingInterval = setInterval(() => {
            // 模拟 API 请求
            const mockData = {
                timestamp: new Date().toISOString(),
                value: Math.random(),
            };
            self.postMessage(mockData);
        }, interval);
    } else if (type === "stopPolling") {
        // 停止轮询
        clearInterval(pollingInterval);
        self.postMessage({ status: "polling stopped" });
    }
};

// 清理工作
self.onclose = function () {
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
};
