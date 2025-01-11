// 创建 Intersection Observer 实例
// IntersectionObserver 构造函数接收两个参数:
// 1. callback 函数 - 当被观察元素的可见性变化时调用
// 2. options 配置对象 - 用于自定义观察者的行为

// callback 函数接收 entries 数组参数:
// - entries: IntersectionObserverEntry 对象数组,包含每个被观察元素的信息
//   - entry.isIntersecting: 元素是否可见
//   - entry.intersectionRatio: 元素可见比例
//   - entry.target: 被观察的元素
//   - entry.time: 变化发生的时间戳
//   - entry.boundingClientRect: 目标元素的边界信息
//   - entry.rootBounds: 根元素的边界信息
//   - entry.intersectionRect: 目标元素与根元素相交的区域信息

// options 配置对象包含:
// - root: 根元素,默认为浏览器视口
// - rootMargin: 根元素外边距,类似 CSS margin
// - threshold: 触发回调的目标可见度阈值,取值 0-1

const observer = new IntersectionObserver(
    (entries) => {
        // entries 是 IntersectionObserverEntry 对象的数组
        entries.forEach((entry) => {
            // entry.isIntersecting 表示目标元素是否与根元素相交
            if (entry.isIntersecting) {
                // 当元素进入视口时，添加 visible 类
                entry.target.classList.add("visible");

                // 可选：如果只想触发一次，可以在元素可见后取消观察
                // observer.unobserve(entry.target);
            } else {
                // 当元素离开视口时，移除 visible 类
                entry.target.classList.remove("visible");
            }
        });
    },
    {
        // 配置选项
        root: null, // null 表示使用视口作为根元素
        rootMargin: "0px", // 根元素的边距
        threshold: 0.1, // 目标元素可见度达到 10% 时触发回调
    }
);

// 获取所有需要观察的元素
const boxes = document.querySelectorAll(".box");

// 开始观察每个元素
boxes.forEach((box) => {
    observer.observe(box);
});

// 示例：如何停止观察
// boxes.forEach(box => {
//     observer.unobserve(box);
// });

// 示例：如何完全停止观察所有元素
// observer.disconnect();

// 控制台输出更多信息，帮助理解
console.log("Intersection Observer 配置信息：", {
    root: "使用视口作为根元素",
    rootMargin: "0px",
    threshold: "10% 可见度触发",
    观察的元素数量: boxes.length,
});
