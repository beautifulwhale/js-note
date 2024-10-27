// 继承
class Polgon {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getWidth() {
        return this.width;
    }
}

class Square extends Polgon {
    constructor(length) {
        super(length, length);
        this.name = "Square";
    }

    get area() {
        return this.width * this.height;
    }
}

const sq = new Square(5);
console.log("sq", sq, sq.area);

// 继承内置对象
class MyDate extends Date {
    get year() {
        return this.getFullYear();
    }
}
const myDate = new MyDate();
console.log("year", myDate.year);

// 继承普通对象
const Animal = {
    say() {
        console.log("this is a Animal", this.name);
    },
    jump() {
        console.log("I can jump", this.name);
    },
};

class Dog {
    constructor(name) {
        this.name = name;
    }
}

Object.setPrototypeOf(Dog.prototype, Animal);
const d = new Dog("jack");
d.say();
console.log("dog", d);
