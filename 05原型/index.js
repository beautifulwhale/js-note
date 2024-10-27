var anotherObj = {
    a: 1,
};

var obj = Object.create(anotherObj);

console.log(anotherObj.a);
console.log(obj.a, "obj", obj);
console.log(anotherObj.hasOwnProperty("a"));
console.log(obj.hasOwnProperty("a"));

obj.a++; // 属性屏蔽, 第一次通过原型链访问到原型的a, 紧接着把2赋值给obj本身
console.log(obj.hasOwnProperty("a"));
console.log("obj1", obj);

function Foo(name) {
    this.name = name;
}

// Foo.prototype.getName = function () {
//     return this.name;
// };

const _p = {};
Object.defineProperty(_p, "constructor", {
    value: Foo,
    writable: true,
    enumerable: false,
    configurable: true,
});
Foo.prototype = _p;

var f = new Foo("jack");
console.log("Foo prototype", Foo.prototype, "f", f);

console.log(Foo.prototype.constructor === Foo);
console.log(f.constructor === Foo);


