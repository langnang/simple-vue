import { mergeOptions } from "../util/options";

/**
 * 初始化全局方法
 */
export function initGlobalAPI(Vue) {
  // 全局混入
  Vue.mixin = function (mixin) {
    // 对象的合并
    this.options = mergeOptions(this.options || {}, mixin);
    return this;
  };
}
