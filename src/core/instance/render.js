import {createElement} from "../vdom/create-element";
import {vnode} from "../vdom/vnode";
import {nextTick} from "../util/next-tick";

export function renderMixin(Vue) {
  /**
   * 标签
   */
  Vue.prototype._c = function () {
    return createElement(...arguments)
  }
  /**
   * 文本
   */
  Vue.prototype._v = function (text) {
    return createText(text)
  }
  /**
   * 变量
   */
  Vue.prototype._s = function (val) {
    return val == null ? "" : (typeof val === 'object') ? JSON.stringify(val) : val;
  }
  Vue.prototype._render = function () {
    let vm = this;
    let render = vm.$options.render;
    let vnode = render.call(this);
    return vnode;
  }
  
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  }
}

function createText(text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}