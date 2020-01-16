// 几种排序算法

// 冒泡排序
// 每次都把较大的数放到下一个下标 这样每轮循环之后 最后一个肯定是最大的
function bubbleSort(list) {
    var size = list.length
    var temp
    var count = 0

    for (var i = 0;i < size;i++) {
        var flag = false
        
        for (var j = 0;j < size - 1 - i;j++) {
            count = count + 1

            // 前者比后面的大
            if (list[j] > list[j+1]) {

                // 保存前面
                temp = list[j]
                list[j] = list[j+1]
                list[j+1] = temp
                flag = true
            }
        }

        // 如果没有排序过
        // 说明结束了 后面的不需要循环了
        if (flag == false) {
            break
        }
    }

    console.info(count)
    return list
}

console.info(bubbleSort([3, 4, 1, 2, 6, 7]))

// 选择排序
function querySort(list) {
    var minIndex = 0
    var size = list.length

    for (var i = 0;i < size;i++) {

        // 设置当前下标为最小值下标
        minIndex = i

        for (var j = i + 1;j < size;j++) {

            // 谁比 minIndex 小 谁就变为 minIndex
            if (list[j] < list[minIndex]) {
                minIndex = j
            }
        }

        // 现在获得了最小的 index 准备替换

        // 保存当前下标
        temp = list[i]

        // 替换当前下标数据和最小值下标的数据
        list[i] = list[minIndex]
        list[minIndex] = temp
    }

    return list
}

console.info(querySort([3, 4, 1, 2, 6, 7]))

// 插入排序
function insertSort(list) {
    console.info(`init list ${list}`)
    var size = list.length

    for (var i = 0;i < size;i++) {

        // 获取当前下标的数据
        var temp = list[i]

        for (var j = 0;j < i;j++) {

            // 如果当前下标数据小于排序好的列表内的值
            if (temp < list[j]) {

                // console.info(`list ${list}`)
                // console.info(`j ${j}`)

                // 删除当前下标的值
                list.splice(i, 1)
                list.splice(j, 0, temp)
                break
            }
        }
    }

    return list
}

console.info(insertSort([3, 5, 2, 6, -1, 4, 7, 17, 8]))