// 构造函数继承
function Super (name) {
    this.name = name
    this.colors = ['red', 'blue']
    this.sayName = function() {
        return this.name;
    }
}

function Sub (age) {

    // this. => Sub
    // Sub.name = 'Nicholas'
    // Sub.colors = ['red', 'blue']
    Super.call(this, 'Nicholas')
    this.age = age
}

var instance_1 = new Sub(21)
var instance_2 = new Sub(22)

instance_1.colors.push('green')

console.log(instance_1.colors)
console.log(instance_2.colors)

console.log(instance_1.sayName())