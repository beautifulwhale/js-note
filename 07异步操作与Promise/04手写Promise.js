class MyPromise {
    constructor(executable) {
        this.initValue();
        this.initBind();

        try {
            executable(this.reslove, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }
    initValue() {
        this.PromiseState = "pedding";
        this.PromiseResult = "";
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
    }
    initBind() {
        this.reslove = this.reslove.bind(this);
        this.reject = this.reject.bind(this);
    }
    reslove(value) {
        if (this.PromiseState !== "pedding") return;
        this.PromiseState = "fulfilled";
        this.PromiseResult = value;
        while (this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(this.PromiseResult);
        }
    }
    reject(reason) {
        if (this.PromiseState !== "pedding") return;
        this.PromiseState = "rejected";
        this.PromiseResult = reason;
        while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.PromiseResult);
        }
    }

    then(onFulfilled, onRejected) {
        const thenPromise = new MyPromise((resolve, reject) => {
            const reslovePromise = (cb) => {
                try {
                    const p = cb(this.PromiseResult);
                    if (p === thenPromise) {
                        throw new Error("不能返回自身");
                    }

                    if (p instanceof MyPromise) {
                        p.then(resolve, reject);
                    } else {
                        resolve(p);
                    }
                } catch (error) {
                    reject(error);
                    throw new Error(error);
                }
            };

            if (this.PromiseState === "fulfilled") {
                // onFulfilled(this.PromiseResult);
                reslovePromise(onFulfilled.bind(this));
            } else if (this.PromiseState === "rejected") {
                // onRejected(this.PromiseResult);
                reslovePromise(onRejected.bind(this));
            } else if (this.PromiseState === "pedding") {
                this.onFulfilledCallbacks.push(onFulfilled.bind(this));
                this.onRejectedCallbacks.push(onRejected.bind(this));
                // this.onFulfilledCallbacks.push(
                //     reslovePromise.bind(this, onFulfilled)
                // );
                // this.onRejectedCallbacks.push(
                //     reslovePromise.bind(this, onRejected)
                // );
            }
        });

        return thenPromise;
    }

    static all(promises) {
        const res = [];
        let count = 0;

        return new MyPromise((resolve, reject) => {
            const addValue = (i, p) => {
                res[i] = p;
                count++;
                if (count === promises.length) {
                    resolve(res);
                }
            };
            promises.forEach((p, i) => {
                if (p instanceof MyPromise) {
                    p.then(
                        (val) => {
                            addValue(i, val);
                        },
                        (err) => {
                            reject(err);
                        }
                    );
                } else {
                    addValue(i, p);
                }
            });
        });
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((promise) => {
                if (promise instanceof MyPromise) {
                    promise.then(
                        (val) => {
                            resolve(val);
                        },
                        (err) => {
                            reject(err);
                        }
                    );
                } else {
                    resolve(promise);
                }
            });
        });
    }

    static allSettled(promises) {
        return new MyPromise((resolve, reject) => {
            const res = [];
            let count = 0;

            const addValue = (i, p) => {
                res[i] = p;
                count++;
                if (count === promises.length) {
                    resolve(res);
                }
            };
            promises.forEach((p, i) => {
                if (p instanceof MyPromise) {
                    p.then(
                        (val) => addValue(i, val),
                        (err) => addValue(i, err)
                    );
                } else {
                    addValue(i, p);
                }
            });
        });
    }

    static any(promises) {
        return new MyPromise((resolve, reject) => {
            const res = [];
            let count = 0;

            const addValue = (i, p) => {
                res[i] = p;
                count++;
                if (count === promises.length) {
                    reject(res);
                }
            };
            promises.forEach((p, i) => {
                if (p instanceof MyPromise) {
                    p.then(
                        (val) => addValue(i, val),
                        (err) => addValue(i, err)
                    );
                } else {
                    addValue(i, p);
                }
            });
        });
    }
}

// const p = new MyPromise((resolve, reject) => {
//     // resolve(123);
//     // reject("error");
//     // throw "this is a error";
// });

// console.log("p", p);

// 马上输出 ”成功“
// const p1 = new Promise((resolve, reject) => {
//     resolve("成功");
// }).then(
//     (res) => console.log(res),
//     (err) => console.log(err)
// );

// 1秒后输出 ”失败“
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("OK");
//         // reject("失败");
//     }, 1000);
// }).then(
//     (res) => console.log(res),
//     (err) => console.log(err)
// );

// 链式调用 输出 200
// const p3 = new Promise((resolve, reject) => {
//     resolve(100);
// })
//     .then(
//         (res) => 2 * res,
//         (err) => console.log(err)
//     )
//     .then(
//         (res) => console.log(res),
//         (err) => console.log(err)
//     );

// // 链式调用 输出300
// const p4 = new Promise((resolve, reject) => {
//     resolve(100);
// })
//     .then(
//         (res) => new Promise((resolve, reject) => resolve(3 * res)),
//         (err) => console.log(err)
//     )
//     .then(
//         (res) => console.log(res),
//         (err) => console.log(err)
//     );

// const test3 = new Promise((resolve, reject) => {
//     // resolve(100); // 输出 状态：成功 值： 200
//     // reject(100) // 输出 状态：成功 值：300
// })
//     .then(
//         (res) => 2 * res,
//         (err) => 3 * err
//     )
//     .then(
//         (res) => console.log("成功", res),
//         (err) => console.log("失败", err)
//     );

// const test4 = new Promise((resolve, reject) => {
//     resolve(100); // 输出 状态：失败 值：200
//     // reject(100) // 输出 状态：成功 值：300
//     // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
// })
//     .then(
//         (res) => new Promise((resolve, reject) => reject(2 * res)),
//         (err) => new Promise((resolve, reject) => resolve(3 * err))
//     )
//     .then(
//         (res) => console.log("成功", res),
//         (err) => console.log("失败", err)
//     );

const p = new MyPromise((resolve, reject) => {
    resolve(123);
    // reject("error");
    // throw "this is a error";
});

const p1 = new MyPromise((resolve, reject) => {
    // resolve(456);
    reject("error iii");
    // throw "this is a error";
});

MyPromise.all([p, p1]).then(
    (res) => {
        console.log("res", res);
    },
    (err) => {
        console.log("err", err);
    }
);
