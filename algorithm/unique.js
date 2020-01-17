// 几种去重算法

// 哈希去重
function hashUnique (list) {
	var obj = {}
	var result = []
	
	for (var i = 0;i < list.length;i++) {

		// 对象里是不存在 则插入到数组
		if (!obj[list[i]]) {
			obj[list[i]] = true
			result.push(list[i])
		}
	}

	return result
}

console.info(hashUnique([3,1,23,3,2,1]))

// 排序去重
function sortUnique (list) {

	// 首先去重
	var list = list.sort()
	var result = [list[0]]

	// i = 1 不需要处理第一个数据
	for (var i = 1;i < list.length;i++) {

		// 和上一个比较 如果不相等 则插入
		if (list[i] !== list[i - 1]) {
			result.push(list[i])
		}
	}

	return result
}

console.info(sortUnique([3,1,23,3,2,1]))
