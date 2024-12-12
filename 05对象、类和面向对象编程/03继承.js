/**
 * JavaScript中的继承
 *
 * 在JavaScript中，继承是通过原型链实现的。以下是几种常见的继承方式及其优缺点分析。
 */

// 1. 构造函数继承
function Parent1(name) {
    this.name = name;
}

function Child1(name, age) {
    Parent1.call(this, name); // 调用父类构造函数
    this.age = age;
}

const child1 = new Child1("Alice", 18);
console.log(child1.name); // Alice
console.log(child1.age); // 18

// 优点：可以向父类构造函数传参，解决了引用类型属性共享的问题。
// 缺点：只能继承父类的实例属性和方法，不能继承原型属性和方法。

// 2. 原型链继承
function Parent2() {
    this.name = "Bob";
}

Parent2.prototype.getName = function () {
    return this.name;
};

function Child2() {}

Child2.prototype = new Parent2();
Child2.prototype.constructor = Child2;

const child2 = new Child2();
console.log(child2.getName()); // Bob

// 优点：可以继承父类的实例属性和方法，也可以继承原型属性和方法。
// 缺点：无法向父类构造函数传参，所有实例共享父类实例的引用类型属性。

// 3. 组合式继承
function Parent3(name) {
    this.name = name;
}

Parent3.prototype.getName = function () {
    return this.name;
};

function Child3(name, age) {
    Parent3.call(this, name); // 第二次调用父类构造函数
    this.age = age;
}

Child3.prototype = new Parent3(); // 第一次调用父类构造函数
Child3.prototype.constructor = Child3;

const child3 = new Child3("Charlie", 20);
console.log(child3.name); // Charlie
console.log(child3.age); // 20
console.log(child3.getName()); // Charlie

// 优点：可以继承父类的实例属性和方法，也可以继承原型属性和方法，解决了构造函数继承和原型链继承的缺点。
// 缺点：父类构造函数会被调用两次，造成不必要的性能开销。

// 4. 寄生式继承
function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

const parent4 = {
    name: "David",
    getName: function () {
        return this.name;
    },
};

const child4 = createObj(parent4);
console.log(child4.getName()); // David

// 优点：可以继承父类的实例属性和方法。
// 缺点：无法实现函数复用，每次创建对象都会创建一遍方法。

// 5. 寄生组合式继承
function Parent5(name) {
    this.name = name;
}

Parent5.prototype.getName = function () {
    return this.name;
};

function Child5(name, age) {
    Parent5.call(this, name);
    this.age = age;
}

Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

const child5 = new Child5("Eve", 22);
console.log(child5.name); // Eve
console.log(child5.age); // 22
console.log(child5.getName()); // Eve

// 优点：可以继承父类的实例属性和方法，也可以继承原型属性和方法，解决了组合式继承的缺点。
// 缺点：实现较为复杂。

/**
 * 继承中的问题
 *
 * 1. JavaScript不支持多继承
 * JavaScript的对象只能有一个原型，因此不支持多继承。
 *
 * 变相实现多继承的方法：
 * - 混入（Mixin）：将多个对象的方法复制到一个对象上。
 *
 * 2. 父类构造函数会被调用两次
 * 在组合继承中，父类构造函数会被调用两次，造成不必要的性能开销。
 *
 * 解决方法：
 * - 使用寄生组合式继承：通过Object.create()来创建子类的原型对象，避免调用父类构造函数。
 *
 * 3. 原型链继承共享引用类型的问题
 * 在原型链继承中，子类实例共享父类实例的引用类型属性，修改一个实例的引用类型属性会影响其他实例。
 *
 * 解决方法：
 * - 在子类构造函数中调用父类构造函数，确保每个实例都有自己的引用类型属性。
 *
 * 4. 无法继承私有属性
 * JavaScript的继承机制无法继承父类的私有属性。
 *
 * 解决方法：
 * - 使用闭包或Symbol来实现私有属性，并提供访问器方法。
 */

function mixin(target, ...sources) {
    Object.assign(target.prototype, ...sources);
}

const canEat = {
    eat: function () {
        console.log("Eating");
    },
};

const canWalk = {
    walk: function () {
        console.log("Walking");
    },
};

function Person(name) {
    this.name = name;
}

mixin(Person, canEat, canWalk);

const person = new Person("Frank");
person.eat(); // Eating
person.walk(); // Walking

// 通过混入，可以实现对象的多重行为。
