function myTypeof(value) {
    const type = Object.prototype.toString.call(value);

    switch (type) {
        case '[object Null]':
            return 'null';
        case '[object Array]':
            return 'array';
        case '[object Date]':
            return 'date';
        case '[object Object]':
            return 'object';
        case '[object String]':
            return 'string';
        case '[object Number]':
            return 'number';
        case '[object Boolean]':
            return 'boolean';
        case '[object Undefined]':
            return 'undefined';
        case '[object Function]':
            return 'function';
        default:
            return 'unknown';
    }
}

// 测试
console.log(myTypeof(42)); // "number"
console.log(myTypeof('Hello')); // "string"
console.log(myTypeof(true)); // "boolean"
console.log(myTypeof(undefined)); // "undefined"
console.log(myTypeof(null)); // "null"
console.log(myTypeof({})); // "object"
console.log(myTypeof([])); // "array"
console.log(myTypeof(new Date())); // "date"
console.log(myTypeof(function() {})); // "function"
