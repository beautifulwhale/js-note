// 数据库名称和版本
const DB_NAME = "MyDatabase";
const DB_VERSION = 2;

// IDBDatabase 对象 - 数据库对象
let db;

// 初始化数据库
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // 数据库升级事件
        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // 创建用户表（如果不存在）
            if (!db.objectStoreNames.contains("users")) {
                const userStore = db.createObjectStore("users", {
                    keyPath: "id",
                    autoIncrement: true,
                });

                // 创建用户表索引
                userStore.createIndex("nameIndex", "name", { unique: false });
                userStore.createIndex("emailIndex", "email", { unique: true });
            }

            // 创建爱好表（如果不存在）
            if (!db.objectStoreNames.contains("hobbies")) {
                const hobbyStore = db.createObjectStore("hobbies", {
                    keyPath: "id",
                    autoIncrement: true,
                });

                // 创建爱好表索引
                hobbyStore.createIndex("nameIndex", "name", { unique: false });
                hobbyStore.createIndex("userIdIndex", "userId", {
                    unique: false,
                });
                hobbyStore.createIndex("categoryIndex", "category", {
                    unique: false,
                });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log("数据库连接成功");
            resolve(db);
        };

        request.onerror = (event) => {
            console.error("数据库错误：", event.target.error);
            reject(event.target.error);
        };
    });
}

// 添加用户 - 使用 IDBTransaction 对象
function addUser(user) {
    return new Promise((resolve, reject) => {
        // 创建事务
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");

        // IDBRequest 对象 - 添加数据
        const request = store.add(user);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 获取用户
function getUser(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 使用索引查询 - IDBIndex 对象
function queryByEmail(email) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        const index = store.index("emailIndex");
        const request = index.get(email);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 使用游标遍历 - IDBCursor 对象
function getAllUsers() {
    return new Promise((resolve, reject) => {
        const users = [];
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        const request = store.openCursor();

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                users.push(cursor.value);
                cursor.continue();
            } else {
                resolve(users);
            }
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 使用主键范围 - IDBKeyRange 对象
function getUsersInRange(lowerBound, upperBound) {
    return new Promise((resolve, reject) => {
        const users = [];
        const transaction = db.transaction(["users"], "readonly");
        const store = transaction.objectStore("users");
        const keyRange = IDBKeyRange.bound(lowerBound, upperBound);
        const request = store.openCursor(keyRange);

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                users.push(cursor.value);
                cursor.continue();
            } else {
                resolve(users);
            }
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 更新用户
function updateUser(user) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        const request = store.put(user);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 删除用户
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["users"], "readwrite");
        const store = transaction.objectStore("users");
        const request = store.delete(id);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 添加爱好
function addHobby(hobby) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["hobbies"], "readwrite");
        const store = transaction.objectStore("hobbies");
        const request = store.add(hobby);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 获取用户的所有爱好
function getUserHobbies(userId) {
    return new Promise((resolve, reject) => {
        const hobbies = [];
        const transaction = db.transaction(["hobbies"], "readonly");
        const store = transaction.objectStore("hobbies");
        const index = store.index("userIdIndex");
        // 使用索引查询, IDBKeyRange作用是设置查询范围
        const request = index.openCursor(IDBKeyRange.only(userId));

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                hobbies.push(cursor.value);
                cursor.continue();
            } else {
                resolve(hobbies);
            }
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 更新爱好
function updateHobby(hobby) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["hobbies"], "readwrite");
        const store = transaction.objectStore("hobbies");
        const request = store.put(hobby);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 删除爱好
function deleteHobby(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["hobbies"], "readwrite");
        const store = transaction.objectStore("hobbies");
        const request = store.delete(id);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 按类别查询爱好
function getHobbiesByCategory(category) {
    return new Promise((resolve, reject) => {
        const hobbies = [];
        const transaction = db.transaction(["hobbies"], "readonly");
        const store = transaction.objectStore("hobbies");
        const index = store.index("categoryIndex");
        const request = index.openCursor(IDBKeyRange.only(category));

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                hobbies.push(cursor.value);
                cursor.continue();
            } else {
                resolve(hobbies);
            }
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

// 初始化数据库并添加事件监听
document.addEventListener("DOMContentLoaded", async () => {
    try {
        await initDB();

        // 添加用户按钮事件
        document
            .getElementById("addUser")
            .addEventListener("click", async () => {
                try {
                    const user = {
                        name: "John Doe",
                        email: `john${Date.now()}@example.com`,
                        age: 30,
                    };
                    const id = await addUser(user);
                    document.getElementById(
                        "result"
                    ).textContent = `用户添加成功，ID: ${id}`;
                } catch (error) {
                    console.error("添加用户失败：", error);
                }
            });

        // 获取用户按钮事件
        document
            .getElementById("getUser")
            .addEventListener("click", async () => {
                try {
                    const user = await getUser(1);
                    document.getElementById("result").textContent = user
                        ? `获取到用户：${JSON.stringify(user)}`
                        : "未找到用户";
                } catch (error) {
                    console.error("获取用户失败：", error);
                }
            });

        // 通过索引查询按钮事件
        document
            .getElementById("queryByIndex")
            .addEventListener("click", async () => {
                try {
                    const users = await getAllUsers();
                    if (users.length > 0) {
                        const firstUserEmail = users[0].email;
                        const user = await queryByEmail(firstUserEmail);
                        document.getElementById(
                            "result"
                        ).textContent = `通过邮箱查询到用户：${JSON.stringify(
                            user
                        )}`;
                    } else {
                        document.getElementById("result").textContent =
                            "数据库中没有用户";
                    }
                } catch (error) {
                    console.error("查询失败：", error);
                }
            });

        // 使用游标按钮事件
        document
            .getElementById("useCursor")
            .addEventListener("click", async () => {
                try {
                    const users = await getAllUsers();
                    document.getElementById(
                        "result"
                    ).textContent = `所有用户：${JSON.stringify(users)}`;
                } catch (error) {
                    console.error("获取所有用户失败：", error);
                }
            });

        // 更新用户按钮事件
        document
            .getElementById("updateUser")
            .addEventListener("click", async () => {
                try {
                    const users = await getAllUsers();
                    if (users.length > 0) {
                        const user = users[0];
                        user.name = "更新的名字";
                        await updateUser(user);
                        document.getElementById(
                            "result"
                        ).textContent = `用户更新成功：${JSON.stringify(user)}`;
                    } else {
                        document.getElementById("result").textContent =
                            "没有可更新的用户";
                    }
                } catch (error) {
                    console.error("更新用户失败：", error);
                }
            });

        // 删除用户按钮事件
        document
            .getElementById("deleteUser")
            .addEventListener("click", async () => {
                try {
                    const users = await getAllUsers();
                    if (users.length > 0) {
                        await deleteUser(users[0].id);
                        document.getElementById("result").textContent =
                            "用户删除成功";
                    } else {
                        document.getElementById("result").textContent =
                            "没有可删除的用户";
                    }
                } catch (error) {
                    console.error("删除用户失败：", error);
                }
            });

        // 添加爱好按钮事件
        document
            .getElementById("addHobby")
            .addEventListener("click", async () => {
                try {
                    const users = await getAllUsers();
                    if (users.length > 0) {
                        const hobby = {
                            name: "读书",
                            category: "文化",
                            userId: users[0].id,
                            level: "专业",
                            frequency: "每天",
                        };
                        const id = await addHobby(hobby);
                        document.getElementById(
                            "result"
                        ).textContent = `爱好添加成功，ID: ${id}`;
                    } else {
                        document.getElementById("result").textContent =
                            "请先添加用户";
                    }
                } catch (error) {
                    console.error("添加爱好失败：", error);
                }
            });

        // 查询用户爱好按钮事件
        document
            .getElementById("getUserHobbies")
            .addEventListener("click", async () => {
                try {
                    const users = await getAllUsers();
                    if (users.length > 0) {
                        const hobbies = await getUserHobbies(users[0].id);
                        document.getElementById(
                            "result"
                        ).textContent = `用户爱好：${JSON.stringify(hobbies)}`;
                    } else {
                        document.getElementById("result").textContent =
                            "请先添加用户";
                    }
                } catch (error) {
                    console.error("获取用户爱好失败：", error);
                }
            });

        // 按类别查询爱好按钮事件
        document
            .getElementById("queryHobbiesByCategory")
            .addEventListener("click", async () => {
                try {
                    const hobbies = await getHobbiesByCategory("文化");
                    document.getElementById(
                        "result"
                    ).textContent = `文化类爱好：${JSON.stringify(hobbies)}`;
                } catch (error) {
                    console.error("查询爱好失败：", error);
                }
            });
    } catch (error) {
        console.error("初始化数据库失败：", error);
    }
});
