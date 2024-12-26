/**
 * ES6的class详解
 *
 * 1. 类的由来
 * 在ES6之前，JavaScript通过构造函数和原型链来实现面向对象编程。ES6引入了class关键字，使得定义类和继承更加直观和简洁。
 */

// ES5的构造函数和原型链
function PersonES5(name, age) {
    this.name = name;
    this.age = age;
}

PersonES5.prototype.greet = function () {
    console.log(
        `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
};

var personES5 = new PersonES5("John", 30);
personES5.greet();

// ES6的class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}

const person = new Person("John", 30);
person.greet();

/**
 * 2. 构造器
 * 构造器是类的特殊方法，用于创建和初始化类的实例对象。一个类只能有一个名为constructor的构造器。
 */

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

const animal = new Animal("Dog");
animal.speak();

/**
 * 3. 类的实例
 * 类的实例是通过new关键字创建的。实例对象拥有类中定义的属性和方法。
 */

const anotherPerson = new Person("Jane", 25);
anotherPerson.greet();

/**
 * 4. 实例属性的写法
 * 实例属性可以在构造器中定义，也可以在类的外部通过实例对象直接添加。
 */

// 在构造器中定义实例属性
class Car {
    // 实例属性写法
    brand;
    model = "Corolla";
    year = 2024;
    constructor(brand) {
        this.brand = brand;
    }
}

const car = new Car("Toyota");
console.log(car.brand); // Toyota

// 在类的外部通过实例对象直接添加属性
car.model = "Corolla";
console.log(car.model); // Corolla

/**
 * 5. class表达式
 * 类表达式是定义类的一种方式，可以是命名的或匿名的。
 */

// 匿名类表达式
const MyClass = class {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello, ${this.name}`);
    }
};

const myInstance = new MyClass("Anonymous");
myInstance.greet(); // Hello, Anonymous

// 命名类表达式
const AnotherClass = class NamedClass {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello, ${this.name}`);
    }
};

const anotherInstance = new AnotherClass("Named");
anotherInstance.greet(); // Hello, Named

/**
 * 6. class的静态属性与方法
 * 静态属性和方法是定义在类本身上的，而不是实例对象上。使用static关键字定义。
 */

class MathUtil {
    static PI = 3.14159;

    static add(a, b) {
        return a + b;
    }
}

console.log(MathUtil.PI); // 3.14159
console.log(MathUtil.add(2, 3)); // 5

/**
 * 7. class的私有属性与方法
 * 私有属性和方法在类外部无法访问，使用#前缀定义。
 */

class PrivateExample {
    #privateField = "I am private";

    #privateMethod() {
        console.log(this.#privateField);
    }

    publicMethod() {
        this.#privateMethod();
    }
}

const privateExample = new PrivateExample();
privateExample.publicMethod(); // I am private
// console.log(privateExample.#privateField); // SyntaxError: Private field '#privateField' must be declared in an enclosing class

/**
 * 8. class静态私有属性方法
 * 静态私有属性和方法使用static和#前缀同时定义。
 */

class StaticPrivateExample {
    static #privateStaticField = "I am private static";

    static #privateStaticMethod() {
        console.log(this.#privateStaticField);
    }

    static publicStaticMethod() {
        this.#privateStaticMethod();
    }
}

StaticPrivateExample.publicStaticMethod(); // I am private static

/**
 * 9. 静态块的介绍
 * 静态块用于在类定义时执行静态属性初始化代码。可以在类中定义多个静态块。
 */

class StaticBlockExample {
    static staticField;

    static {
        this.staticField = "Initialized in static block";
        console.log("Static block executed");
    }
}

console.log(StaticBlockExample.staticField); // Initialized in static block

/**
 * 10. new.target属性
 * new.target属性在构造函数或类的构造器中被调用时，指向被new命令调用的构造函数或类。
 */

class Base {
    constructor() {
        if (new.target === Base) {
            throw new Error("Base class cannot be instantiated directly.");
        }
    }
}

class Derived extends Base {
    constructor() {
        super();
        console.log("Derived class instantiated");
    }
}

// const baseInstance = new Base(); // Error: Base class cannot be instantiated directly.
const derivedInstance = new Derived(); // Derived class instantiated

/**
 * 11. this指向问题
 * 在JavaScript中，this的指向在不同的上下文中会有所不同。我们来讨论一下在实例方法、静态方法、私有方法和构造器方法中的this指向问题。
 */

class ThisExample {
    constructor(name) {
        this.name = name;
        console.log("构造器中的this指向:", this); // ThisExample实例
    }

    instanceMethod() {
        console.log("实例方法中的this指向:", this); // ThisExample实例
    }

    static staticMethod() {
        console.log("静态方法中的this指向:", this); // ThisExample类
        this.#privateStaticMethod();
    }

    static #privateStaticMethod() {
        console.log("静态私有方法中的this指向:", this); // ThisExample类
    }

    #privateMethod() {
        console.log("私有方法中的this指向:", this); // ThisExample实例
    }

    callPrivateMethod() {
        this.#privateMethod();
    }
}

const example = new ThisExample("示例");
example.instanceMethod(); // 实例方法中的this指向: ThisExample实例
ThisExample.staticMethod(); // 静态方法中的this指向: ThisExample类
example.callPrivateMethod(); // 私有方法中的this指向: ThisExample实例

/**
 * 总结：
 * 1. 在构造器方法中，this指向新创建的实例对象。
 * 2. 在实例方法中，this指向调用该方法的实例对象。
 * 3. 在静态方法中，this指向类本身。
 * 4. 在私有方法中，this指向调用该方法的实例对象。
 * 5. 在静态私有方法中，this指向类本身。
 */
