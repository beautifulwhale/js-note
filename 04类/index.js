// 公有、私有、静态属性
class Person {
    name;
    #age;
    static hobby;
    static stop() {
        console.log("static stop called");
        return "stop next jacket";
    }
    static enhanceStop() {
        console.log(`enhancement stop called, ${Person.stop()}`);
    }
    constructor(name, age, hobby = "sing") {
        this.name = name;
        this.#age = age;
        Person.hobby = hobby;
        Person.stop();
        Person.enhanceStop();
    }

    say() {
        console.log("say", this.name);
    }

    getAge() {
        return this.#age;
    }
}

class Student extends Person {
    constructor(name, age) {
        super(name, age);
    }
    static enhanceStudent() {
        console.log(`enhanceStudent called, ${super.stop()}`); // static 属性可以睡着父类继承,并通过super调用
    }
}

const p = new Person("lisa", 12, "sing");
console.log("constructor", p.constructor);

console.log("p", p.name, p.getAge());
console.log("hobby", Person.hobby);

p.say();

const s = new Student("xiaohong", 18);
Student.enhanceStudent();
