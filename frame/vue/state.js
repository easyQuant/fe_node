// TODO: 参考资料 
// https://www.jianshu.com/p/631bcfd1b8b5 
// https://segmentfault.com/a/1190000018236655
// https://cn.vuejs.org/v2/api/#data
// vue几种状态参数的区别
// vue computed method data watch的区别?

data 
// 是响应式的对象 通过更新属性不会改变 只有直接整个对象才会改变

computed
// 依赖data
// 会缓存计算结果 只有所依赖的data改变时才会返回新的计算结果
// 适合不频繁的性能消耗大的计算

watch 
// 是一个观察者对象
// 可以观察prop data computed
// 复杂数据类型不能直接观察 其具体数据的变化

methods
// this指向当前vue实例
// 不会缓存计算结果
// 适合频繁的计算