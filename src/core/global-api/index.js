import { mergeOptions } from "../util/options";

/**
 * 全局方法
 */
export function initGlobalAPI(Vue) {
  Vue.mixin = function (mixin) {
    // 对象的合并
    this.options = mergeOptions(this.options || {}, mixin);
    return this;
  };
}
