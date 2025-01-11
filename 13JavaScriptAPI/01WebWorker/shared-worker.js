const connections = new Set();

// 共享 worker 使用 connect 事件处理连接
self.onconnect = function (e) {
    const port = e.ports[0];
    connections.add(port);
    console.log("共享 worker 连接成功", port, connections);

    port.onmessage = function (e) {
        // 广播消息给所有连接
        connections.forEach((connection) => {
            connection.postMessage("广播消息: " + e.data);
        });
    };

    port.start();
};
