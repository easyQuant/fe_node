// 组合继承 原型 and 构造函数
function Super (name) {
    this.name = name
    this.colors = ['red', 'blue']
}

// 使用父对象的构造函数实现属性继承
function Sub (name, age) {

    // 构造Super上的name属性 同时Super改变不影响Sub的变化
    Super.call(this, name)
    this.age = age
}

// 父对象的原型对象上挂载函数
Super.prototype.sayName = function () {
    return this.name;
};

// 原型继承 此时原型对象的构造函数是Super
Sub.prototype = new Super()

var instance = new Sub('before name', 20)

// 改变构造函数的指向
Sub.prototype.constructor = Sub;

Sub.prototype.sayAge = function () {
    return this.age;
}

// console.log(instance.age)
// console.log(instance.name)
// console.log(instance.sayName())
console.log(Sub.prototype.constructor)
console.log(instance.sayAge())

// Sub.prototype.sayAge = function () {
//     return this.age;
// }