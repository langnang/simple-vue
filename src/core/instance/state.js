import {observe} from "../observer/index";

/**
 * 初始化状态，props，methods，data，computed，watch
 */
export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initDate(vm);
  }
}

/**
 * 初始化数据
 */
function initDate(vm) {
  let data = vm.$options.data; // 1. 对象 2. 函数
  // 由于组件化返回的是 function
  // 因此需要判断 data 的类型
  // 如果是 function，直接执行以获取对应数据
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {}; // 注意：this 指向
  // 遍历data，将data上的所有属性代理到实例上
  for (let key in data) {
    proxy(vm, "_data", key)
  }
  // 对data数据进行劫持
  observe(data);
}

function proxy(vm, sourceKey, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourceKey][key];
    },
    set(newVal) {
      vm[sourceKey][key] = newVal;
    }
  })
}
