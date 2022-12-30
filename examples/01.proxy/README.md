# Proxy - 数据代理

Vue2 中使用的是[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，将用户配置的数据（`options.data`）代理到实例上

## 回顾

## 数据初始化

用户配置的 `options.data` 数据格式只存在两种情况：

1. `object`: 出现在根实例上，
2. `function`: 出现在组件实例上，并执行该方法，将返回的数据装载到组件实例上
   - 由于组件复用性和对象数据的指针传递，若不使用该数据格式（`function`），会造成十分混乱的情况
   - 注意：执行该方法时需注意 this 指针指向，使用 `data.call(vm)` 将指针指向当前 Vue 实例

```js
function initData(vm) {
  // ...
  let data = vm.$options.data;
  data = typeof data === "function" ? data.call(vm) : data;
  // ...
}
```

## 数据代理

Vue2 中使用的是[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，将用户配置的数据（`options.data`）代理到实例上

```js
function initData(vm) {
  // ...
  let data = vm.$options.data;
  // ... 数据初始化 ...
  vm._data = data;
  // ...
  for (let key in data) {
    proxy(vm, "_data", key);
  }
}
function proxy(vm, sourceKey, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourceKey][key];
    },
    set(newVal) {
      vm[sourceKey][key] = newVal;
    },
  });
}
```

## 总结

- 数据初始化：判断数据格式，若为 `function` 需执行并将 this 指向至实例
- 数据代理：使用 `Object.definePrototype()` 代理数据至实力上
