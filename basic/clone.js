// 对象深浅copy
// TODO: 参考资料 https://segmentfault.com/a/1190000011403163

// 对象浅拷贝
var clone = function (data) {
    var result = Array.isArray(data) ? [] : {}

    for (var key in data) {
        result[key] = data[key]
    }
    
    return result
}

// 对象深拷贝
var deepClone = function (data) {
    var result

    // 判断是否是引用类型
    // 如果是引用类型直接返回
    // 否则判断是不是数组 生成基本对象
    if (typeof data !== 'object') {
        result = data
        return result
    } else {

        if (Array.isArray(data)) {
            result = []
        } else {
            result = {}
        }
    }

    // 迭代对象/数组
    for (var key in data) {

        // 判断key值是否是基本数据类型
        // 如果是则直接赋值 否则递归
        if (typeof data[key] === 'object') {
            result[key] = data[key]
        } else {
            result[key] = deepClone(data[key])
        }
    }

    return result
}
