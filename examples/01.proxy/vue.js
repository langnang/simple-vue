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
    data = vm._data = typeof data === "function" ? data.call() : data;
    // 遍历data属性，并将所有属性代理至实例上
    for (let key in data) {
      proxy(vm, "_data", key);
    }
  }
  /**
   * 使用 Object.defineProperty 代理数据属性至实例上
   */
  function proxy(vm, sourceKey, key) {
    // console.log("proxy", arguments);
    // 深层代理
    Object.defineProperty(vm, key, {
      get() {
        // console.log("proxy::get", vm, sourceKey, key);
        return vm[sourceKey][key];
      },
      set(newVal) {
        // console.log("proxy::set", vm, sourceKey, key);
        vm[sourceKey][key] = newVal;
      },
    });
  }

  /**end::src/core/instance/state.js */
  return Vue;
});
