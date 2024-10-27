// polyfill ES5
// if (!Object.create) {
//     Object.create = function (o) {
//         function F() {}
//         F.prototype = o;
//         return new F();
//     };
// }

var foo = {
    something: function () {
        console.log("Tell me something good...");
    },
};
var bar = Object.create(foo);

bar.something(); // 直接委托到foo

bar.doSomething = function () {
    this.something(); // 内部委托
};

bar.doSomething();
