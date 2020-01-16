// 垃圾回收
// TODO:
// 参考资料 1 垃圾回收分类 https://www.jianshu.com/p/e2089aaf2028
// 参考资料 2 标记清除详解 https://segmentfault.com/a/1190000018605776?utm_source=tag-newest

// 垃圾回收分为2种机制
// 1. 引用计数
var _str = 'value'
var a = _str // count + 1
var b = _str // count + 1
delete a // count - 1
delete b // count - 1
// count 计数为0 被gc掉

// 2. 标记清除
// 执行函数时 (进入函数词法作用域)
// 给所有变量增加标记: 进入环境

// 函数执行完毕后 (离开函数词法作用域)
// 给所有变量增加标记: 离开环境
// 闭包函数相关的作用域不会被标记为离开环境
// 所以造成内存占用 从而泄漏