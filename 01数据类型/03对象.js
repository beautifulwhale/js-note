/**
 * JavaScript 对象基础知识点和常用操作示例
 */

// 1. 对象的创建方式
// 1.1 对象字面量
const obj1 = {
    name: "张三",
    age: 18,
};

// 1.2 构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}
const personObj = new Person("李四", 20);

// 1.3 Object.create()
const personObj2 = Object.create(personObj, {
    name: {
        value: "王五",
        writable: true,
        enumerable: true,
        configurable: true,
    },
});
console.log("personObj2", personObj2, personObj2.__proto__);

// 1.4 ES6 class
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}
const obj4 = new Student("赵六", "一年级");

// 2. 属性操作
const person1 = {
    name: "张三",
};

// 2.1 属性的增删改查
person1.age = 18; // 添加属性
person1["address"] = "北京"; // 使用中括号语法
delete person1.age; // 删除属性
console.log(person1.name); // 访问属性

// 2.2 属性描述符
Object.defineProperty(person1, "gender", {
    value: "男",
    writable: false, // 是否可写
    enumerable: true, // 是否可枚举
    configurable: false, // 是否可配置(删除/修改描述符)
});
console.log("person1--", person1);
person1.gender = "女";
console.log("person1--", person1);

// 2.3 存取器属性
let _age = 18;
Object.defineProperty(person1, "age", {
    get() {
        return _age;
    },
    set(value) {
        if (value >= 0) {
            _age = value;
        }
    },
});
// 2.4 存取器属性的另一种写法
const person2 = {
    _age: 18,
    get age() {
        return this._age;
    },
    set age(value) {
        if (value >= 0) {
            this._age = value;
        }
    },
};
console.log(person2.age); // 18
person2.age = 20;
console.log(person2.age); // 20

// 3. 对象的继承方式
// 3.1 原型链继承
function Animal(name) {
    this.name = name;
}
Animal.prototype.getName = function () {
    return this.name;
};

function Dog(name) {
    this.name = name;
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

// 创建实例
const dog1 = new Dog("Buddy");
console.log(dog1.getName()); // 输出: "Buddy"

// 优点: 简单易用
// 缺点: 所有实例共享父类的引用属性

// 3.2 构造函数继承
function Dog(name) {
    Animal.call(this, name);
}

// 创建实例
const dog2 = new Dog("Max");
console.log(dog2.name); // 输出: "Max"

// 优点: 可以向父类传参，不会共享父类的引用属性
// 缺点: 无法继承父类原型上的方法

// 3.3 组合继承
function Dog(name) {
    Animal.call(this, name);
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

// 创建实例
const dog3 = new Dog("Charlie");
console.log(dog3.getName()); // 输出: "Charlie"

// 优点: 结合了原型链和构造函数的优点
// 缺点: 调用了两次父类构造函数

// 3.4 原型式继承
function createObject(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

const animal = {
    name: "Animal",
    getName: function () {
        return this.name;
    },
};

const dog4 = createObject(animal);
dog4.name = "Rocky";
console.log(dog4.getName()); // 输出: "Rocky"

// 优点: 简单易用
// 缺点: 所有实例共享父类的引用属性

// 3.5 寄生式继承
function createDog(o) {
    const clone = Object.create(o);
    clone.bark = function () {
        console.log("Woof!");
    };
    return clone;
}

const dog5 = createDog(animal);
dog5.name = "Bella";
console.log(dog5.getName()); // 输出: "Bella"
dog5.bark(); // 输出: "Woof!"

// 优点: 可以在继承的同时添加新方法
// 缺点: 无法做到函数复用

// 3.6 寄生组合式继承
function inheritPrototype(subType, superType) {
    const prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function Dog(name) {
    Animal.call(this, name);
}
inheritPrototype(Dog, Animal);

// 创建实例
const dog6 = new Dog("Daisy");
console.log(dog6.getName()); // 输出: "Daisy"

// 优点: 解决了组合继承的效率问题
// 缺点: 实现较为复杂

// 3.7 class继承
class Animal2 {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Dog2 extends Animal2 {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
}

// 创建实例
const dog7 = new Dog2("Luna", "Labrador");
console.log(dog7.getName()); // 输出: "Luna"
console.log(dog7.breed); // 输出: "Labrador"

// 优点: 语法简洁，易于理解
// 缺点: 语法糖，底层仍然是基于原型链的继承

// 3.8 混入方式继承
const mixins = {
    eat() {
        console.log("eating");
    },
};
Object.assign(Dog.prototype, mixins);

// 创建实例
const dog8 = new Dog("Milo");
dog8.eat(); // 输出: "eating"

// 优点: 可以将多个对象的功能合并到一个对象中
// 缺点: 可能导致命名冲突

// 4. 对象的遍历方式
const obj = {
    name: "张三",
    age: 18,
    city: "北京",
};

// 4.1 for...in (包含原型链属性)
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key, obj[key]);
    }
}

// 4.2 Object.keys() (仅自身可枚举属性)
Object.keys(obj).forEach((key) => {
    console.log(key, obj[key]);
});

// 4.3 Object.entries() (键值对数组)
for (let [key, value] of Object.entries(obj)) {
    console.log(key, value);
}

// 4.4 Object.getOwnPropertyNames() (包含不可枚举属性)
Object.getOwnPropertyNames(obj).forEach((key) => {
    console.log(key, obj[key]);
});

// 4.5 Object.getOwnPropertySymbols() (Symbol属性)
const sym = Symbol("foo");
obj[sym] = "bar";
Object.getOwnPropertySymbols(obj).forEach((sym) => {
    console.log(sym, obj[sym]);
});
// 5. 对象的常用方法

// 5.1 Object.assign() - 对象合并
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
const result = Object.assign(target, source1, source2);
console.log(result); // { a: 1, b: 2, c: 3 }

// 5.2 Object.create() - 创建新对象并指定原型
const person = {
    sayHello() {
        console.log("Hello!");
    },
};
const student = Object.create(person);
student.grade = "一年级";
student.sayHello(); // 继承了person的方法

// 5.3 Object.defineProperty() - 定义/修改属性
const obj2_new = {};
Object.defineProperty(obj2_new, "name", {
    value: "张三",
    writable: false, // 不可修改
    enumerable: true, // 可枚举
    configurable: false, // 不可删除
});

// 5.4 Object.freeze() - 冻结对象(不能添加/删除/修改属性)
const frozen = { prop: 42 };
Object.freeze(frozen);
frozen.prop = 33; // 严格模式下会报错
console.log(frozen.prop); // 42

// 5.5 Object.seal() - 密封对象(可以修改现有属性)
const sealed = { prop: 42 };
Object.seal(sealed);
sealed.prop = 33; // 可以修改
sealed.newProp = 123; // 不能添加新属性
console.log(sealed);

// 5.6 Object.is() - 判断两个值是否相同
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
console.log(Object.is(5, 5)); // true

// 5.7 hasOwnProperty() - 检查自有属性
const obj3_new = { prop: "exists" };
console.log(obj3_new.hasOwnProperty("prop")); // true
console.log(obj3_new.hasOwnProperty("toString")); // false

// 5.8 Object.preventExtensions() - 防止添加新属性
const nonExtensible = { prop: 42 };
Object.preventExtensions(nonExtensible);
nonExtensible.newProp = 123; // 严格模式下会报错
console.log(nonExtensible);

// 5.8.1 Object的锁定方法的局限性
// 1. 只能锁定对象的第一层属性
const obj = {
    name: "张三",
    info: {
        age: 18,
        address: "北京",
    },
};

Object.freeze(obj);
obj.name = "李四"; // 无法修改
obj.info.age = 20; // 可以修改!因为freeze只锁定第一层

// 2. 对于引用类型属性,只是锁定了引用,而不是值
const arr = [1, 2, 3];
const frozenObj = {
    data: arr,
};

Object.freeze(frozenObj);
frozenObj.data = [4, 5, 6]; // 无法修改引用
frozenObj.data.push(4); // 但可以修改数组内容!

// 解决方案:递归冻结
function deepFreeze(obj) {
    Object.keys(obj).forEach((prop) => {
        if (typeof obj[prop] === "object" && obj[prop] !== null) {
            deepFreeze(obj[prop]);
        }
    });
    return Object.freeze(obj);
}

const deepFrozenObj = {
    name: "张三",
    info: {
        age: 18,
        hobbies: ["读书", "运动"],
    },
};

deepFreeze(deepFrozenObj);
deepFrozenObj.info.age = 20; // 无法修改
deepFrozenObj.info.hobbies.push("音乐"); // 也无法修改

// 5.9 使用场景示例
// 深拷贝对象
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    const clone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}

// 对象属性监听
function observeObject(obj, callback) {
    return new Proxy(obj, {
        set(target, property, value) {
            callback(property, value);
            target[property] = value;
            return true;
        },
    });
}

// 使用示例
const user = observeObject({}, (prop, value) => {
    console.log(`属性 ${prop} 被设置为 ${value}`);
});
user.name = "李四"; // 输出: 属性 name 被设置为 李四
