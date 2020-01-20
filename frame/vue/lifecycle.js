// vue生命周期
// TODO: 参考资料 https://segmentfault.com/a/1190000013579739

// vue 的生命周期是什么 包含那些函数
// vue实例从创建到销毁的过程就叫vue生命周期
// 初始化 => 初始化数据 => 编译模版 => 挂载dom => 渲染 更新 => 渲染 销毁

// 首先新建vue实例 new Vue()
// 开始初始化
// 然后开始执行生命周期函数

// 初始化 vue 实例

//     合并 options
//     初始化生命周期钩子函数
//     初始化组件事件通信

//     执行 beforeCreated 钩子函数 // 创建前

//     初始化状态 包含 data methods computed watch 
//         实现了model和view的双向绑定 
//             改变data 以及创建 observe 和 Watcher 
            
//     执行 created 钩子函数 // 创建中

//     准备渲染模版
//         是否有el 
//             是否有 template 
//                 编译 template
//             否则
//                 加载 el下的dom

//         否则
//             等待 $mount 执行编译模版 => 挂载操作

//     执行 beforeMount 钩子函数

//         使用 mv.$el 替换 el属性 

//     执行 mounted 钩子函数 // 挂载中
//         挂载完成

// data数据更新

// 执行 beforeUpdate 钩子函数

// 遍历watcher 并更新 更新vnode 重新渲染

// 执行 update 钩子函数

// 挂载完成
        

// 调用 vm.$destroy 

// 判断是否被销毁

// 未被销毁

//     执行 beforeDestroy 钩子函数

//     销毁wathcer 子组件 以及 子组件的watcher 

//     执行 destroyed 钩子

// activated // keep-alive 组件激时执行

// deactivated // keep-alive 组件停用时执行