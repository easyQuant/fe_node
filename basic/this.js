// this的指向问题
// 分为4种
// 1. 默认指向
function a () {
    console.info(`a this ${this}`)
}

a() // window

// 2. 对象字面量
var b = {
    name: 'b',
    getName: function () {
        console.info(`b this ${this}`)
        return this.name
    }
}

// 直接使用b.getName 调用 this指向 b 
b.getName()

// b.getName 指向 window.getName
var getName = b.getName

// 此时this指向window
getName()

// 3. 构造函数
// 构造函数的this默认指向自身
function C () {
    console.info(`C this ${this}`)
}

// this 指向 C
c = new C()

// 4. 使用 call, apply, bind 改变this指向

// 设置为null时 this指向window
a.call(null) // this => window

a.apply(null, [])

// 返回改变this后的函数 同时不可被修改
a.bind(null)

// 具体应用
var a = 'hello'
console.info(Array.prototype.join.call(a, '-'))

var list = [1,2,3,4,5,6]

// Math不能 new Math() 所以max是静态方法 
console.info(Math.max.apply(Math, list))