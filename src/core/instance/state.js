import { observe } from "../observer/index.js";
import Watcher from "../observer/watcher.js";

/**
 * 初始化状态，props，methods，data，computed，watch
 */
export function initState(vm) {
  console.group("🚀 ~ file: state.js:8 ~ initState ~ 初始化状态 ~ arguments", {
    vm,
  });
  const opts = vm.$options;
  if (opts.data) {
    initDate(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.props) {
  }
  if (opts.props) {
  }
  if (opts.methods) {
  }
  console.groupEnd();
}

/**
 * 初始化数据
 */
function initDate(vm) {
  console.groupCollapsed(
    "🚀 ~ file: state.js:21 ~ initDate ~ 初始化数据 ~ arguments",
    { vm }
  );
  let data = vm.$options.data; // 1. 对象 2. 函数
  // 由于组件化返回的是 function
  // 因此需要判断 data 的类型
  // 如果是 function，直接执行以获取对应数据
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {}; // 注意：this 指向
  // 遍历data，将data上的所有属性代理到实例上
  console.groupCollapsed(
    "🚀 ~ file: state.js:21 ~ initDate ~ for proxy ~ 数据代理 ~ arguments",
    { vm, data }
  );
  for (let key in data) {
    proxy(vm, "_data", key);
  }
  console.groupEnd();
  // 对data数据进行劫持
  console.groupCollapsed(
    "🚀 ~ file: state.js:21 ~ initDate ~ observe ~ 数据劫持 ~ arguments",
    { vm, data }
  );
  observe(data);
  console.groupEnd();
  console.groupEnd();
}

// #region proxy
export function proxy(vm, sourceKey, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourceKey][key];
    },
    set(newVal) {
      vm[sourceKey][key] = newVal;
    },
  });
}
// #endregion proxy

/**
 * 初始化 options.watch
 */
function initWatch(vm) {
  console.log("🚀 ~ file: state.js:56 ~ initWatch ~ arguments", { vm });
  // console.log('initWatch.vm', vm);
  // 获取watch
  let watch = vm.$options.watch;
  // console.log('initWatch.watch', watch)
  // 遍历
  for (let key in watch) {
    // 获取属性对应的值
    let handler = watch[key]; // 数组、对象、字符串、函数
    if (Array.isArray(handler)) {
      // 数组
      handler.forEach((item) => {
        createWatcher(vm, key, item);
      });
    } else {
      // 对象、字符串、函数
      createWatcher(vm, key, handler);
    }
  }
}

// 格式化处理 watch 配置
function createWatcher(vm, expOrFn, handler, options) {
  // console.log('createWatcher', arguments);
  // 处理 handler
  if (typeof handler === "object") {
    options = handler; // 用户的配置
    handler = handler.handler; // 函数
  }
  if (typeof handler === "string") {
    handler = vm[handler]; // 将实例的方法作为handler
  }
  // 其它是函数
  return vm.$watch(expOrFn, handler, options);
}

export function stateMixin(Vue) {
  Vue.prototype.$watch = function (expOrFn, cb, options = {}) {
    console.log("🚀 ~ file: state.js:94 ~ stateMixin ~ $watch ~ arguments", {
      expOrFn,
      cb,
      options,
    });
    // console.log('Vue.prototype.$watch', arguments);
    const vm = this;
    // 判断标识：用于判断来源于用户配置的watch
    options.user = true;
    // console.log('Vue.prototype.$watch[vm.a]', vm.a);
    // console.log('Vue.prototype.$watch[vm.a.b]', vm.a.b);
    // 实现 $watch 方法，就是 new Watcher()
    let watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm);
    }
  };
}
