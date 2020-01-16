// 闭包

// 简述闭包原理
// TODO: 参考资料 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures
// js的函数可以产生闭包
// 闭包由函数和创建函数的词法作用域共同组成 词法作用域包含创建该函数的所有局部变量

function foo () {

	// 创建闭包函数的词法作用域

	// 词法作用域包含的局部变量
	var count = 1

	// 闭包函数自身
	var result = function () {
		console.log(count)
	}
	return result
}

var f = foo()
f() // 1

// 验证各种坑
// TODO: 参考资料 https://www.jianshu.com/p/26c81fde22fb
function outer() {
	var result = [];

	for (var i = 0; i < 10; i++) {
		result[i] = function () {
			console.info(i)
		}
	}
	return result
}

// 运行过程如下
function outer() {
	var result = [];

	for (var i = 0; i < 10; i++) {
		result[i] = function () {
			console.info(i)
		}
	}

	// 执行结果
	// result[0] = function () { console.info(i) }
	// result[1] = function () { console.info(i) }
	// i = 9
	// console.info(i) 访问的i是循环后的i
	return result
}

// 使用如下代码修改
function outer() {
	var result = [];

	for (var i = 0; i < 10; i++) {
		result[i] = (function (i) {

			// var i = 0, 1, 2
			return function () {

				// 使用的是生成当前函数的词法作用域
				console.info(i)
			}
		}(i))
	}
	return result
}

// 简单习题
// TODO: 参考资料 https://www.jianshu.com/p/7ff589e78964
function fun(n, o) {
	console.log(o)

	// n = 0 => 1 => 2
	// o = undefined => 0 => 1
	return {
		fun: function (m) {

			// m = 1
			// n = 0
			return fun(m,n)
		}
	};
}

var a = fun(0) // undefined
a.fun(1) // 0
a.fun(2) // 0
a.fun(3) // 0

var b = fun(0).fun(1).fun(2).fun(3)

fun(0).fun(1).fun(2)
// undefined
// 0
// 

var c = fun(0).fun(1);
c.fun(2)
c.fun(3)
// undefined
// 0
// 1
// 1