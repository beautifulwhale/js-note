function Foo(name) {
    this.name = name;
}

Foo.prototype.getName = function () {
    return this.name;
};

function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}

// 把Bar prototype 设置为 Foo prototype, 以便于进行“继承”

// 方式一: Object.create
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.constructor = Bar; // 若需要,可修改构造器
// 方式二: Object.setPrototypeOf
// Object.setPrototypeOf(Bar.prototype, Foo.prototype);

Bar.prototype.getLabel = function () {
    return this.label;
};

const b = new Bar("foo", "bar");
console.log("b", b);

// console.log("constructor", b.constructor === Bar);

// console.log(b.getName());
// console.log(b.getLabel());

console.log("is", b instanceof Bar, Foo.prototype.isPrototypeOf(b));
