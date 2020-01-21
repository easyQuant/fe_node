// TODO: 参考资料 https://segmentfault.com/a/1190000018211084?utm_source=tag-newest
// vue vnode 比较方法 和子节点的diff方案

// 传入2个vnode
function patch (oldVnode, newVnode) {
    var elm
    var parent
    
    // 初步判断是否相似
    if (someVnode(oldVnode, newVnode)) {

        // 相似就打补丁
        patchVnode(oldVnode, newVnode)
    } else {

        // 直接覆盖

        // // 获取老节点的dom
        // elm = oldVnode.elm

        // // 获取老节点的父dom
        // parent = api.parentNode(elm)
    }
}

// 比较 key 和 tagName 是否一样
// 判断是否相似 [简单比较]
function someVnode (oldVnode, newVnode) {
    return oldVnode.key === newVnode.key && oldVnode.tag === newVnode.tag
}

// 修补新的 vNode 增删改
function patchVnode (oldVnode, newVnode) {

    // 新节点 引用旧节点的dom
    var elm = newVnode.elm = oldVnode.elm

    var oldCh = oldVnode.children
    var ch = oldVnode.children

    // 更新新节点的data属性 
    if (newVnode.data) {
        updateAttrs(oldVnode, newVnode)
    }

    // 对比子节点
    // 如果是文本节点 则不比较 子节点 只比较当前text
    if (oldVnode.text == undefined) {

        // 如果新旧vnode的子节点都存在
        // 如果老节点的子节点存在 新节点的子节点不存在 则循环删除子节点在dom上
        // 老节点的子节点不存在 新节点的子节点存在 则循环添加子节点到dom上
        if (isDef(oldCh) && isDef(ch)) {

            if (oldCh != ch ) {
                updateChildren(elm, old, ch)
            }
        }

        else if (isDef(oldCh) && !isDef(ch)) {
            
        }

        else if (!isDef(oldCh) && isDef(ch)) {

        }
    } else {
        
    }
}

// 判断子节点长度是否存在
function isDef (children) {
    return children !== 0
}

// 对比新旧node的data数据
// 更新dom上的attr属性
function updateAttrs (oldVnode, newVnode) {
    var key
    var old
    var cur
    var elm = newVnode.elm
    var oldAttrs = oldVnode.data.attr || {}
    var curAttrs = newVnode.data.attr || {}
    
    // 迭代新节点的data
    for (var key in curAttrs) {

        cur = curAttrs[key]
        old = oldAttrs[key]

        // 如果老节点不为null
        if (old !== null) {

            // 判断新节点是否有该属性
            // 如果没有则删除老节点dom的属性
            // 如果都有则更新
            if (cur === null) {
                elm.removeAttribute(key)
            } else {
                elm.setAttribute(key, cur)
            }
        }
    }

    // 删除dom上新节点没有的属性
    for (var key in oldAttrs) {

        // 如果新节点没有这个属性
        // 则从老dom上删除
        if (!(key in curAttrs)) {
            elm.removeAttribute(key)
        }
    }
}

// a b c d e f
// a e g h b f

// o0 == c0 a == a
// a b c d e f

// o-1 == c-1 f == f
// a b c d e f

// o1 == c-1 b == b
// a c d e b f

// o-1 == c1 e == e
// a e c d b f

// 不符合以上情况 则把新节点的当前头部的dom插入 e后面 curStartIndex++
// a e g h c d b f


// 如果curStartIndex > curEndIndex
// 说明有旧的dom节点 在新的vnode上不存在 删除
// 则删除旧差异节点的dom
// a e g h b f
// a e g h c d b f

// 如果oldStartIndex > curEndIndex
// 说明新的节点上有旧的差异的节点 补全
// 如果旧的开始节点 大于 结束节点 
// 则添加新的差异节点的dom
