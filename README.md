<h1 align="center">@langnang/simple-vue</h1>

## 数据劫持

- 对象: 遍历对象，使用`Object.defineProperty()`=>[`defineReactive`](src/core/observer/index.js)劫持
  - 对嵌套数据进行深度代理
- 数组: 重写数组方法，劫持数据
- 数组对象：遍历数组
- 追加数组对象: 定义`Object.defineProperty()`来添加`__ob__`属性，对追加的元素进行劫持

## 数据代理

遍历data对象的属性，使用`Object.defineProperty()`对所有属性进行代理

## 初次渲染流程

1. 初始化数据
2. 将模板进行编译
3. 转换为`render()`
  - ast 语法树转换为字符串
  - 字符串转换为函数
4. 生成虚拟节点
5. 转换为真实DOM
6. 放到页面上

## 模板编译

- 使用对应的正则规则，提取模板中的标签、属性、文本等内容
- 使用数据结构<栈>，组合成树状结构数据

## 转换为`render()`