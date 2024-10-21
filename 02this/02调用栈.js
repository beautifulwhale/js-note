/**
 * 调用栈: baz -> foo  可以通过debugger来查看
 */

function baz() {
    debugger;
    console.log("baz");
    foo();
}

function foo() {
    console.log("foo");
}

baz();
