import {initState} from "./state";

/**
 * 混入初始化方法至 Vue 原型
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    vm.$options = options;

    // 初始化状态
    initState(vm);
  };
}
