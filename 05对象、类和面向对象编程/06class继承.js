/**
 * class的继承
 *
 * 1. 基本概念
 * 在ES6中，class可以通过extends关键字实现继承。子类可以继承父类的属性和方法，并且可以在子类中重写父类的方法。
 */

class Parent1 {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

class Child1 extends Parent1 {
    constructor(name, age) {
        super(name); // 调用父类的构造器
        this.age = age;
    }

    greet() {
        super.greet(); // 调用父类的方法
        console.log(`I am ${this.age} years old`);
    }
}

const child1 = new Child1("John", 10);
child1.greet(); // 输出: Hello, my name is John \n I am 10 years old

/**
 * 2. extends继承的内部实现
 * 当一个类继承另一个类时，JavaScript引擎会在内部进行一些处理，以确保子类能够正确继承父类的属性和方法。
 * 主要步骤如下：
 *
 * 1. 创建子类的原型对象，并将其原型链指向父类的原型对象。
 * 2. 在子类的构造函数中调用super()，以确保父类的构造函数被正确调用。
 * 3. 子类可以通过super关键字调用父类的方法。
 */

// 模拟extends的内部实现
function _inherits(subClass, superClass) {
    // 设置子类的原型对象为父类的实例
    subClass.prototype = Object.create(superClass.prototype);
    // 设置子类的构造函数
    subClass.prototype.constructor = subClass;
    // 设置子类的静态属性和方法
    Object.setPrototypeOf(subClass, superClass);
}

// 模拟super的内部实现
function _createSuper(Derived) {
    return function () {
        let Super = Object.getPrototypeOf(Derived);
        return Super.apply(this, arguments);
    };
}

// 模拟class继承
function ParentClass1(name) {
    this.name = name;
}

ParentClass1.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}`);
};

function ChildClass1(name, age) {
    ParentClass1.call(this, name); // 调用父类的构造函数
    this.age = age;
}

_inherits(ChildClass1, ParentClass1);

ChildClass1.prototype.greet = function () {
    ParentClass1.prototype.greet.call(this); // 调用父类的方法
    console.log(`I am ${this.age} years old`);
};

const childInstance1 = new ChildClass1("Jane", 12);
childInstance1.greet(); // 输出: Hello, my name is Jane \n I am 12 years old

/**
 * 3. 静态属性与方法的继承
 * 当子类继承父类��，子类会继承父类的静态属性和方法。静态属性和方法是定义在类本身上的，而不是实例对象上。
 * 子类可以直接通过类名访问继承的静态属性和方法。
 *
 * 示例：
 */

class Parent {
    static staticProperty = "I am a static property";
    static staticMethod() {
        console.log("I am a static method");
    }
}

class Child extends Parent {}

console.log(Child.staticProperty); // 输出: I am a static property
Child.staticMethod(); // 输出: I am a static method

/**
 * 4. 私有属性与方法的继承
 * 私有属性和方法在类外部无法访问，使用#前缀定义。子类无法直接继承父类的私有属性和方法。
 * 私有属性和方法只能在定义它们的类内部访问，子类无法访问父类的私有属性和方法。
 *
 * 示例：
 */

class ParentWithPrivate {
    #privateProperty = "I am a private property";
    #privateMethod() {
        console.log("I am a private method");
    }

    accessPrivate() {
        console.log(this.#privateProperty);
        this.#privateMethod();
    }
}

class ChildWithPrivate extends ParentWithPrivate {
    // 子类无法直接访问父类的私有属性和方法
    tryAccessPrivate() {
        // console.log(this.#privateProperty); // 语法错误
        // this.#privateMethod(); // 语法错误
    }
}

const instance = new ChildWithPrivate();
instance.accessPrivate(); // 输出: I am a private property \n I am a private method
instance.tryAccessPrivate(); // 无输出，无法访问父类的私有属性和方法

/**
 * 实质：
 * 1. 静态属性和方法是定义在类本身上的，而不是实例对象上。子类可以继承并访问父类的静态属性和方法。并且子类的属性与方法是浅拷贝父类的属性与方法。
 * 2. 私有属性和方法使用#前缀定义，只能在定义它们的类内部访问，子类无法继承和访问父类的私有属性和方法。
 */

/**
 * 5. super关键字
 * super关键字用于访问和调用父类的属性和方法。它可以在子类的构造器、实例方法、静态方法中使用。
 *
 * 原理：
 * super关键字本质上是对父类的引用。在子类中使用super可以调用父类的构造函数、方法和访问父类的属性。
 *
 * 在子类构造器中调用super的原因：
 * 在子类的构造器中，必须先调用super()，然后才能使用this关键字。这是因为子类的实例对象在创建时，必须先完成父类的初始化，才能进行子类的初始化。
 * 如果不调用super()，JavaScript引擎会抛出错误。
 *
 * super作为函数调用和对象的区别：
 * 1. super()作为函数调用时，用于调用父类的构造函数。
 * 2. super作为对象时，用于访问父类的属性和方法。
 *
 * super在不同方法中的this指向：
 * 1. 在子类的构造器中，super()调用父类的构造函数，this指向子类的实例对象。
 * 2. 在子类的实例方法中，super.method()调用父类的方法，this指向子类的实例对象。
 * 3. 在子类的静态方法中，super.method()调用父类的静态方法，this指向子类本身。
 *
 * 示例：
 */

class Parent2 {
    hobby = "coding";
    static age = 18;
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }

    static staticGreet() {
        console.log("Hello from Parent");
    }
}

class Child2 extends Parent2 {
    constructor(name, age) {
        super(name); // 调用父类的构造函数
        console.log("this.hobby", this.hobby);
        this.age = age;
    }

    greet() {
        super.greet(); // 调用父类的实例方法
        console.log(`I am ${this.age} years old`);
    }

    static staticGreet() {
        super.staticGreet(); // 调用父类的静态方法
        console.log("super.hobby", super.hobby, "super.age", super.age);
        console.log("Hello from Child");
    }
}

const child_instance2 = new Child2("John", 30);
child_instance2.greet(); // 输出: Hello, my name is John \n I am 30 years old
Child2.staticGreet(); // 输出: Hello from Parent \n Hello from Child

/**
 * 补充：
 * 1. super关键字不仅可以在构造器中使用，还可以在实例方法和静态方法中使用。
 * 2. 在子类的实例方法中，super.method()调用父类的方法，this指向子类的实例对象。
 * 3. 在子类的静态方法中，super.method()调用父类的静态方法，this指向子类本身。
 * 4. super关键字不能在子类的私有方法中使用，因为私有方法只能在定义它们的类内部访问。
 */

/**
 * 6. 类的__proto__和prototype属性
 *
 * 1. __proto__属性
 * __proto__是每个对象都有的一个内部属性，它指向该对象的原型。通过__proto__属性，我们可以访问和操作对象的原型链。
 * 在类的继承中，子类的__proto__属性指向父类本身，而子类实例的__proto__属性指向子类的原型对象。
 *
 * 示例：
 */
class Parent3 {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

class Child3 extends Parent3 {
    constructor(name, age) {
        super(name);
        this.age = age;
    }

    greet() {
        super.greet();
        console.log(`I am ${this.age} years old`);
    }
}

const child_instance3 = new Child3("John", 20);
console.log(Child3.__proto__ === Parent3); // true
console.log(child_instance3.__proto__ === Child3.prototype); // true

/**
 * 2. prototype属性
 * prototype是函数对象的一个属性，它指向一个对象，这个对象包含了通过该函数创建的实例共享的属性和方法。
 * 在类的继承中，子类的prototype属性指向一个对象，这个对象继承了父类的prototype对象。
 *
 * 示例：
 */
console.log(Child3.prototype.__proto__ === Parent3.prototype); // true

/**
 * 7. mixin实现类似多继承的效果
 *
 * 在JavaScript中，类只能继承一个父类，这被称为单继承。然而，我们可以通过mixin来实现类似多继承的效果。
 * mixin是一种设计模式，它允许我们将多个类的功能组合到一个类中。
 *
 * 示例：
 */

// 定义一个mixin函数，用于将多个源对象的属性和方法混入目标对象
function mixin(...mixins) {
    class Mix {
        constructor() {
            for (let mixin of mixins) {
                copyProperties(this, new mixin()); // 拷贝实例属性
            }
        }
    }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

// 定义两个独立的类
class CanEat {
    eat() {
        console.log(`${this.name} is eating`);
    }
}

class CanWalk {
    walk() {
        console.log(`${this.name} is walking`);
    }
}

// 定义一个新的类，并使用mixin函数将CanEat和CanWalk的功能混入其中
class Person extends mixin(CanEat, CanWalk) {
    constructor(name) {
        super();
        this.name = name;
    }
}


const person = new Person("John");
person.eat(); // John is eating
person.walk(); // John is walking

/**
 * 通过mixin，我们可以将多个类的功能组合到一个类中，从而实现类似多继承的效果。
 */
