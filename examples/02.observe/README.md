# Observe - 数据劫持

Vue2 中使用的是[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，以保证能够侦测到 data 中所有数据的变化，实现后续的响应式功能

## 回顾

- [数据代理](./../01.proxy/README.md)

## 对象数据劫持

使用 `Object.defineProperty()`，以侦测 data 对象数据变化

## 对象数据深度劫持

递归劫持方法，并设置终止条件

## 数组数据劫持

对能够修改原始数组的方法进行重写，以监听到数据修改

## 总结

- 对象劫持：使用 `Object.defineProperty()` 来劫持对象数据
  - 深度劫持：递归劫持方法
- 数组劫持：使用重写数组方法来劫持数组数据
