(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? (module.exports = factory()) : typeof define === "function" && define.amd ? define(factory) : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), (global.Vue = factory()));
})(this, function () {
  "use strict";

  /**start::src/core/instance/index.js */
  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue);
  stateMixin(Vue);
  /**end::src/core/instance/index.js */

  /**start::src/core/instance/init.js */
  /**
   * 添加初始化方法至 Vue 原型
   */
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = options;
      initState(vm);
    };
  }
  /**end::src/core/instance/init.js */

  /**start::src/core/instance/state.js */
  /**
   * 添加数据方法至 Vue 原型
   */
  function stateMixin(Vue) {}
  /**
   * 初始化状态
   */
  function initState(vm) {
    const opts = vm.$options;
    if (opts.data) initDate(vm);
  }
  function initDate(vm) {
    let data = vm.$options.data;
    // data 存在两种数据类型
    // (1). object 来源于根实例
    // (2). function 来源于组件
    // 判断 data 数据类型
    // 如果是 function，就执行该方法，并将其this指针指向至当前实例
    data = vm._data = typeof data === "function" ? data.call(vm) : data;
    // 劫持数据
    observe(data);
  }
  /**end::src/core/instance/state.js */

  /**start::src/core/observer/index.js */
  /**
   * 通用数据劫持方法
   */
  function observe(value) {
    // console.log("🚀 ~ file: vue.js:74 ~ observe ~ value", value);
    // 当递归劫持深层对象时，需设置终止条件
    if (typeof value !== "object" || value == null) {
      return;
    }
    return new Observer(value);
  }
  /**
   * 对象数据劫持类
   * 该类只支持劫持object,array数据类型
   */
  class Observer {
    constructor(value) {
      // console.log("🚀 ~ file: vue.js:79 ~ Observer ~ constructor ~ value", value);
      // 给 data 定义一个属性
      Object.defineProperty(value, "__ob__", {
        enumerable: false, // 不可枚举
        value: this, // this 指向 observe
        configurable: true, // 控制属性描述符是否能改变
      });
      // 对象
      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }
    /**
     * 数组劫持
     */
    observeArray(items) {
      for (let i = 0; i < items.length; i++) {
        observe(items[i]);
      }
    }
    /**
     * 对象劫持
     * 遍历对象，对对象的每个属性进行劫持
     */
    walk(obj) {
      for (let key in obj) {
        defineReactive(obj, key, obj[key]);
      }
    }
  }
  /**
   * 默认定义劫持方法
   * 劫持对象中的其中一个属性
   */
  function defineReactive(data, key, value) {
    // console.log("🚀 ~ file: vue.js:117 ~ defineReactive ~ defineReactive", arguments);
    observe(value);
    Object.defineProperty(data, key, {
      get() {
        // console.log(`🚀 ~ file: vue.js:97 ~ get[${key}] ~ get`, get);
        return value;
      },
      set(newVal) {
        // 为避免死循环，设置终止条件
        if (newVal === value) return;
        console.log(`🚀 ~ file: vue.js:123 ~ set[${key}] ~ newVal`, newVal);
        observe(newVal);
        // 更新数据
        value = newVal;
      },
    });
  }
  /**end::src/core/observer/index.js */

  /**start::src\core\observer\array.js */
  /**
   * 使用重写数组方法来劫持数组
   */
  const arrayMethods = Object.create(Array.prototype);

  ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach((item) => {
    arrayMethods[item] = function (...args) {
      let result = Array.prototype[item].apply(this, args);
      console.log("🚀 ~ file: vue.js:120 ~ result", result);
      // 数组追加元素的情况下
      let inserted;
      switch (item) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.splice(2);
          break;
        default:
          break;
      }
      let ob = this.__ob__;
      if (inserted) {
        ob.observeArray(inserted); // 对添加的对象进行劫持
      }
      return result;
    };
  });
  /**end::src\core\observer\array.js */
  return Vue;
});
