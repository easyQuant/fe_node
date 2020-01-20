// 手撸一个Vue响应式对象
function Vue (options) {
    this._init(options)
}

// 初始化
Vue.prototype._init = function (options) {
    this.$options = options
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods

    // 保存data的参数 与 指令的观察者列表
    this._binding = {}

    // 转化对象 增加观察者
    this._observe(this.$data)
}

// 实现对象的观察
Vue.prototype._observe = function (obj) {
    var value 
    var _this = this

    for (var key in obj) {
        
        if (obj.hasOwnProperty(key)) {
            value = obj[key]

            // 创建绑定关系
            // 初始化订阅列表
            _this.binding[key] = {
                _directives: []
            }

            if (typeof value === 'object') {
                this._observe(value)
            }

            var binding = _this.binding[key]

            Object.defineProperty(_this.$data, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return value
                },
                set: function (newValue) {

                    // 如果新的value不等于旧的value
                    // 则赋值
                    if (value != newValue) {
                        value = newValue

                        // 遍历绑定关系内的订阅列表
                        binding._directives.forEach(function (item) {
                            item.update()
                        })
                    }
                }
            })
        }
    }
}

// 编译模版
Vue.prototype._complie = function (root) {
    
    var nodes = root.children
    var _this = this

    for (var i = 0;i < nodes.length;i++) {

        var node = nodes[i]

        // 递归执行
        if (node.children.length) {
            _this._complie(node)
        }

        // 如果是event 则执行viewmodel的methods
        if (node.hasAttribute('v-click')) {
            node.onclick = (function () {

                // 获取绑定的方法名
                var attrVal = nodes[i].getAttribute('v-click')

                // 实际执行的是当前绑定的函数
                return _this.$methods[attrVal].bind(_this.$data)
            }())
        }

        // 如果为model 
        // 创建一个事件 推动观察者执行
        // 创建一个 Watcher 订阅观察者的执行 更新当前 dom 的 value 的值
        if (node.hasAttribute('v-model') && (tagName === 'INPUT' || tagName === 'TEXTAREA')) {

            // 绑定输入事件
            node.addEventListener('input', (function(key) {
                var attrVal = node.getAttribute('v-model')

                _this._binding._directives.push(
                    new Watcher(
                        'input',
                        node,
                        _this,
                        attrVal,
                        'value'
                    )
                )

                return function () {

                    // 输入内容 触发 vm.data.set函数
                    _this.$data[attrVal] = nodes[key].value
                }
            }))(i)
        }

        // 创建一个 Watcher 订阅观察者的行为 更新当前 dom 的 innerHTML 的值
        if (node.hasAttribute('v-bind')) {

            // 添加要订阅的data的名称
            var attrVal = node.getAttribute('v-bind')

            _this._binding[attrVal]._directives.push(
                new Watcher(
                    'text',
                    node,
                    _this,
                    attrVal,
                    'innerHTML'
                )
            )
        }
    }
}

// 用来订阅对象的变化
function Watcher (name, el, vm, data_key, attr) {
    this.name = name
    this.el = el
    this.vm = vm
    this.data_key = data_key
    this.attr = attr
}

// 更新dom中的值
Watcher.prototype._update = function () {

    // dom中的值更新为data对应的数据
    this.el[this.attr] = vm.data[data_key]
}