// 原型继承
function Super (name) {
    this.name = name
    this.color = ['red', 'blue']
}

function Sub (age) {
    this.age = age
}

var _super = new Super('hello')

// 直接覆盖原型对象
Sub.prototype = _super
var instance = new Sub(20)

console.log(instance.name)
console.log(instance.color)
console.log(instance.age)

// 改变被继承的对象 继承的对象就会同时改变
_super.color = ['green']

console.log(instance.name)
console.log(instance.color)
console.log(instance.age)