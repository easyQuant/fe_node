// 原型对象 原型链 与 继承 prototype __proto__ extend

// ============================ 理论基础 ============================

// 引用类型 对象 数组 函数 都有 __proto__ 隐式原型
// 函数都具有 prototype 显式原型
// 引用类型的 __proto__ 指向 构造函数的 显式原型 prototype

// 生成一个构造函数 A
// var A = function () {}

// 构造函数A的显式原型对象
console.log(A.prototype.__proto__ === Object.prototype) // A { constructor: function () {}, __proto__: Object.prototype } 
console.log(A.__proto__ === Function.prototype) // Functuon.prototype
console.log(A.prototype.__proto__.constructor === Object)
console.log(A.__proto__.constructor === Function) // Functuon.prototype

console.log(Array.__proto__ === Function.prototype)
console.log(Boolean.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Function.__proto__ === Function.prototype)
console.log({}.__proto__ === Object.prototype) // {} 是 Object的实例


// ============================ 继承类型 ============================

// TODO: 参考资料 https://segmentfault.com/a/1190000011389965

// 原型继承
// extends/prototype.js

// 构造函数继承
// extends/constructor.js

// 继承组合继承
// extends/merge.js

// 寄生组合式继承
// extends/parasitic.js

// ============================ 简单习题 ============================

function A () {
	this.name = 'a'
	this.color = ['green', 'yellow']
}

function B () {

}

// 原型对象继承
B.prototype = new A()

var b1 = new B()
var b2 = new B()

b1.name = 'change'
b1.color.push('black')

console.log('b1', b1)
console.log('b2', b2)

console.log('b1.__proto__', b1.__proto__)
console.log('b2.__proto__', b2.__proto__) 

console.log(b1.name) // change
console.log(b2.name) // a

console.log(b1.color) // ['green', 'yellow', 'black']
console.log(b2.color) // ['green', 'yellow', 'black']

// 简单解析 
// b1.name = 'change' // 直接在b1实例上赋值

// b1.color.push('black') // 从b1上寻找不到对象 去原型寻找 所以b2同时发生变化


function Foo () {

}

function Bar () {
	return {
		method: function () {}
	}
}

// Foo.prototype = new Bar()

var f = new Foo()

// 返回的是一个object
console.log(`Foo.prototype instanceof Object ${Foo.prototype instanceof Object}`) // true
console.log(`Foo.prototype instanceof Function ${Foo.prototype instanceof Function}`) // false
console.log(`Foo.prototype instanceof Bar ${Foo.prototype instanceof Bar}`) // false
console.log(`Bar.prototype instanceof Object ${Bar.prototype instanceof Object}`) // true
console.log(`Bar instanceof Function ${Bar instanceof Function}`) // true

// 简单测试下 __proto__ 的关系
console.log(Foo.__proto__) // Function
console.log(Foo.__proto__.__proto__) // Function.__proto__ => Object.prototype
console.log(Foo.__proto__.__proto__.__proto__) // Function.__proto__ => Object.prototype => null

console.log('####################################')

console.log(f.__proto__) // Foo.prototype
console.log(Foo.__proto__) // Function.prototype
console.log(Foo.prototype.__proto__) // Object.prototype
console.log(Function.prototype.__proto__) // Object.prototype
console.log(Object.prototype.__proto__) // null
