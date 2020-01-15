// 作用域 / 闭包原理 / this
// 直接上代码

// ============================ 基础小菜 ============================
a = 1 
console.log(a) // 1

function func1 () {

    // 函数 func1内寻找不到var a 于是上一层寻找a
    console.log(`func1 a : ${a}`)
}

function func2 () {
    var a = 2

    // 函数 func2内寻找到了 var a 于是直接赋值
    console.log(`func2 a : ${a}`)
}

function func3 (a) {

    // 函数 func3内寻找到了参数a
    // 执行时转化为 var a; a = arguemnts[0]
    console.log(`func3 a : ${a}`)
}

function func4 (a) {

    // 函数 func3内寻找到了参数a
    // 执行时转化为 var a; a = arguemnts[0]
    console.log(`func4 a : ${a}`)
}

function func5 (a) {

    // 函数 func3内寻找到了参数a
    // 执行时转化为 var a; a = arguemnts[0]
    console.log(`func5 a : ${a}`)
	
    return function (a) {
        console.log(`func5 returns a : ${a}`)
    }
}

func1()
func2()
func3(3)
func4()
func5(5)()

// ============================ 稍微难点 ============================
// 增加了this的问题

x = 1;
var obj = {
	x: 2,
	dbl: function () {
		this.x *= 2;
		x *= 2;
		console.log(x);
		console.log(this.x);
	}
};

obj.dbl() // 打印什么

// 简单分析
// obj.dbl() // this => obj
// console.log(x) // 1 * 2 => 2
// console.log(this.x) // 2 * 2 => 4

var func = obj.dbl // this => window 因为在window声明
func() 

// 分析指向
// this.x *= 2 => 2 * 2 => 4;
// x *= 2 => 4 * 2 => 8
// console.log(x) // 8
// console.log(this.x) // 8

var funcBind = obj.dbl.bind(obj) // this 的改变 obj => window => obj bind优先级最高
funcBind()

// 分析指向
// this.x * 2 => 4 * 2 == 8
// x * 2 => 8 * 2 = 16
console.log(x) // 16
console.log(this.x) // 8

// ============================ 晋级难度 ============================

var number = 5;

var obj = {
	number: 3,

	fn: (function() {
		var number;
		this.number *= 2;
		number = number * 2;
		number = 3;
		return function() {
			var num = this.number;
			this.number *= 2;
			console.log('num',num);
			number *= 3;
			console.log('number',number,this.number)
		}
	}())
}

// 自执行函数 this 指向 window 
// window.number => 10
// fn number => 3

var fn1 = obj.fn // this => window
fn1.call(null) // this => window

// 分析指向
// num = window.number(10)
// console.log('num',num); 10

// number = fn number(3) * 3 => 9
// this.number = window.number(10) * 2 => 20
// console.log('number',number,this.number) 9 20

obj.fn() // this => obj

// 分析指向
// num = obj.number(3)
// console.log('num',num); 3

// number = fn number(9) * 3 => 27
// this.number = obj.number(3) * 2 => 6
// console.log('number',number,this.number) 27 6

console.log(window.number)

// 分析指向
// window.number = window.number(20)