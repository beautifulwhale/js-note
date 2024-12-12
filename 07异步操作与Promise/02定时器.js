/**
 * 定时器（Timer）
 *
 * 在JavaScript中，定时器是一种通过设定时间间隔来处理异步操作的方式，常用于周期性任务或延时任务。定时器主要有两个函数：setTimeout和setInterval，以及对应的清除定时器的函数：clearTimeout和clearInterval。
 */

// 1. setTimeout
// setTimeout函数用于在指定的时间间隔后执行一次回调函数。
setTimeout(() => {
    console.log("延时任务");
}, 1000);

// 2. setInterval
// setInterval函数用于每隔指定的时间间隔重复执行回调函数。
const intervalID = setInterval(() => {
    console.log("周期性任务");
}, 2000);

// 3. clearTimeout
// clearTimeout函数用于清除由setTimeout设置的定时器。
const timeoutID = setTimeout(() => {
    console.log("这条消息不会被打印");
}, 3000);
clearTimeout(timeoutID);

// 4. clearInterval
// clearInterval函数用于清除由setInterval设置的定时器。
setTimeout(() => {
    clearInterval(intervalID);
    console.log("清除周期性任务");
}, 10000);

/**
 * 内部运行机制：
 * 当调用setTimeout或setInterval时，JavaScript引擎会将回调函数和定时器信息添加到任务队列中。事件循环会不断检查主线程是否空闲，如果空闲则从任务队列中取出任务并执行。对于setTimeout，回调函数只会执行一次；对于setInterval，回调函数会在每个时间间隔执行一次，直到被clearInterval清除。
 */

/**
 * setInterval可能存在的问题及解决方案：
 * 使用setInterval时，如果回调函数的执行时间超过了时间间隔，可能会导致回调函数的执行堆积，造成性能问题。为了解决这个问题，可以使用递归的setTimeout来代替setInterval，这样可以确保每次回调函数执行完毕后再设置下一次的定时器。
 */
function recursiveTimeout() {
    setTimeout(() => {
        console.log("递归定时器任务");
        recursiveTimeout();
    }, 2000);
}
recursiveTimeout();

/**
 * 定时器的常见应用：
 * 1. 延时执行任务：使用setTimeout在指定时间后执行某个任务。
 * 2. 周期性任务：使用setInterval定期执行某个任务，如轮询数据、更新UI等。
 * 3. 防抖和节流：使用setTimeout实现防抖和节流功能，优化高频率事件的处理。
 * 4. 动画效果：使用setInterval或递归的setTimeout实现简单的动画效果。
 * 5. 倒计时：使用setInterval实现倒计时功能。
 */
// 1. 延时执行任务：使用setTimeout在指定时间后执行某个任务。
setTimeout(() => {
    console.log("延时执行任务：3秒后执行");
}, 3000);

// 2. 周期性任务：使用setInterval定期执行某个任务，如轮询数据、更新UI等。
const updateUI = setInterval(() => {
    console.log("周期性任务：每2秒更新一次UI");
}, 2000);

// 3. 防抖和节流：使用setTimeout实现防抖和节流功能，优化高频率事件的处理。
function debounce(func, delay) {
    let timeoutID;
    return function (...args) {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function throttle(func, interval) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}

const debouncedFunction = debounce(() => {
    console.log("防抖函数：输入结束后500毫秒执行");
}, 500);

const throttledFunction = throttle(() => {
    console.log("节流函数：每2秒执行一次");
}, 2000);

// 模拟高频率事件
document.addEventListener("scroll", debouncedFunction);
document.addEventListener("resize", throttledFunction);

// 4. 动画效果：使用setInterval或递归的setTimeout实现简单的动画效果。
let position = 0;
const box = document.getElementById("box");

function animate() {
    position += 1;
    box.style.left = position + "px";
    if (position < 100) {
        setTimeout(animate, 16);
    }
}
animate();

// 5. 倒计时：使用setInterval实现倒计时功能。
let countdown = 10;
const countdownElement = document.getElementById("countdown");

const countdownInterval = setInterval(() => {
    countdownElement.textContent = countdown;
    if (countdown === 0) {
        clearInterval(countdownInterval);
        console.log("倒计时结束");
    } else {
        countdown -= 1;
    }
}, 1000);
