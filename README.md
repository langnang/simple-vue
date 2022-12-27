<h1 align="center">@langnang/simple-vue</h1>

## 数据劫持

- 对象: 遍历对象，使用`Object.defineProperty()`=>[`defineReactive`](src/core/observer/index.js)劫持
  - 对嵌套数据进行深度代理
- 数组: 重写数组方法，劫持数据
- 数组对象：遍历数组
- 追加数组对象: 定义`Object.defineProperty()`来添加`__ob__`属性，对追加的元素进行劫持

## 数据代理

遍历data对象的属性，使用`Object.defineProperty()`对所有属性进行代理