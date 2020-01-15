// 基本数据类型, 原生对象, 宿主对象

// 基本数据类型
// typeof null === 'object' js的bug 
// 底层转换为二进制代码时 null 会转化为 000000 前3位都为0 代表对象 所以 typeof null == 'object'
// string number boolean null undefined symbol

// 原生对象
// String Number Function Object Boolean Array Date RegExp Math Error

// 宿主对象
// Window Document Global (nodejs)




// ========================= 判断类型相关 =========================

// 判断是否是数组
// 其中 instanceof 不能判断出iframe内的Array构造的数组
// 优先级 isArray >> constructor.name >> instanceof
Array.isArray(arr)
arr.constructor.name === 'Array'
arr instanceof Array

// typeof 和 instanceof 的区别
// typeof 判断类型 返回基本数据类型的值
var a = true
typeof a === 'boolean' // true

// instanceof 判断是否属于某个构造函数
a instanceof Array // true

// 特殊对象
// NaN Infinity
// NaN 错误的数据 例如 0 / 0 1 / 'a' 
// 不等于任何值 包括NaN
// 判断方法 isNaN
// Infinity 超过float上限
// 判断方法 num === Infinity