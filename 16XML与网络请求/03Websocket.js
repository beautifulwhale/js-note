/**
 * WebSocket 聊天室示例
 */

class WebSocketChat {
    constructor() {
        this.socket = null;
        this.heartbeatTimer = null;
        this.reconnectAttempts = 0;
        this.MAX_RECONNECT_ATTEMPTS = 3;
        this.HEARTBEAT_INTERVAL = 30000;

        // DOM 元素
        this.messageArea = document.getElementById("messageArea");
        this.messageInput = document.getElementById("messageInput");
        this.sendButton = document.getElementById("sendButton");
        this.connectButton = document.getElementById("connectButton");
        this.connectionStatus = document.getElementById("connectionStatus");

        // 绑定事件处理器
        this.connectButton.addEventListener("click", () =>
            this.toggleConnection()
        );
        this.sendButton.addEventListener("click", () => this.sendMessage());
        this.messageInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") this.sendMessage();
        });
    }

    // 连接到WebSocket服务器
    connect() {
        try {
            // 使用 Postman 提供的测试服务器
            this.socket = new WebSocket("wss://ws.postman-echo.com/raw");
            this.setupWebSocketListeners();
        } catch (error) {
            this.updateStatus("连接错误: " + error.message, false);
        }
    }

    // 设置WebSocket事件监听器
    setupWebSocketListeners() {
        this.socket.onopen = () => {
            this.updateStatus("已连接", true);
            this.enableInterface(true);
            this.startHeartbeat();
            this.reconnectAttempts = 0;
            this.addMessage("系统", "连接成功！", "status");
        };

        this.socket.onmessage = (event) => {
            if (event.data === "pong") return; // 忽略心跳响应
            this.addMessage("服务器", event.data, "received");
        };

        this.socket.onerror = (error) => {
            this.updateStatus("发生错误", false);
            this.addMessage("系统", "连接发生错误", "status");
        };

        this.socket.onclose = (event) => {
            this.updateStatus("已断开", false);
            this.enableInterface(false);
            this.stopHeartbeat();
            this.addMessage("系统", "连接已关闭", "status");

            if (
                event.code !== 1000 &&
                this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS
            ) {
                this.reconnect();
            }
        };
    }

    // 发送消息
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (
            message &&
            this.socket &&
            this.socket.readyState === WebSocket.OPEN
        ) {
            this.socket.send(message);
            this.addMessage("你", message, "sent");
            this.messageInput.value = "";
        }
    }

    // 添加消息到消息区域
    addMessage(sender, message, type) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${type}`;
        messageElement.textContent = `${sender}: ${message}`;
        this.messageArea.appendChild(messageElement);
        this.messageArea.scrollTop = this.messageArea.scrollHeight;
    }

    // 更新连接状态显示
    updateStatus(message, isConnected) {
        this.connectionStatus.textContent = message;
        this.connectionStatus.className = `connection-status ${
            isConnected ? "connected" : "disconnected"
        }`;
    }

    // 启用/禁用界面元素
    enableInterface(enabled) {
        this.messageInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        this.connectButton.textContent = enabled ? "断开" : "连接";
    }

    // 切换连接状态
    toggleConnection() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.close(1000, "用户主动断开");
        } else {
            this.connect();
        }
    }

    // 心跳机制
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send("ping");
            }
        }, this.HEARTBEAT_INTERVAL);
    }

    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    // 重连机制
    reconnect() {
        this.reconnectAttempts++;
        this.addMessage(
            "系统",
            `尝试重新连接 (${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`,
            "status"
        );
        setTimeout(() => this.connect(), 3000);
    }

    // 清理资源
    cleanup() {
        this.stopHeartbeat();
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

// 创建WebSocket聊天实例
const chat = new WebSocketChat();
