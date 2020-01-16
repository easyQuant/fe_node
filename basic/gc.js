// 垃圾回收
// TODO:
// 参考资料 1 垃圾回收分类 https://www.jianshu.com/p/e2089aaf2028
// 参考资料 2 标记清除详解 https://segmentfault.com/a/1190000018605776?utm_source=tag-newest

// 垃圾回收分为2种机制
// 1. 引用计数
// var _str = 'value'
// var a = _str // count + 1
// var b = _str // count + 1
// delete a // count - 1
// delete b // count - 1
// count 计数为0 被gc掉

// 2. 标记清除
// 执行函数时 (进入函数词法作用域)
// 给所有变量增加标记: 进入环境

// 函数执行完毕后 (离开函数词法作用域)
// 给所有变量增加标记: 离开环境
// 闭包函数相关的作用域不会被标记为离开环境
// 所以造成内存占用 从而泄漏

// 先来看简单对象
var user = {
    name: 'join'
}

admin = user
user = null // {name: 'join'} 从 global回收
console.info(admin) // 依旧从global 引用 {name: 'join'}
console.info(user) // 已经被清空引用
// { name: 'join' } 依旧被引用 无法被标记回收


// 复杂点的
var merge = function (a, b) {
    a.sub = b
    b.sub = a
    return {
        a: a,
        b: b
    }
}

var result = merge({
    name: 'a'
}, {
    name: 'b'
})

// result.a => { name: 'a', sub: b }
// result.b => { name: 'b', sub: a }

delete result.a // 此时的 { name: 'a', sub: b } 还被 result.b.sub 引用
delete result.b.sub // 此时的 { name: 'a', sub: b } 不在被 result.b.sub 引用 所以成为了孤岛对象 被回收

delete result // 直接清空result 下面的 { name: 'a', sub: b } 和 { name: 'b', sub: a } 都访问不到了 于是一并被回收