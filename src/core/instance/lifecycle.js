import { patch } from "../vdom/patch";
import Watcher from "../observer/watcher";

/**
 * 混入生命周期
 * @param {Vue} Vue
 */
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}
// #region mountComponent
// import Watcher from "../observer/watcher";
/**
 * 挂载组件
 * @param {Vue} vm
 * @param {String} el
 */
export function mountComponent(vm, el) {
  callHook(vm, "beforeMount");
  // vm._update(vm._render());
  const updateComponent = () => {
    vm._update(vm._render());
  };
  new Watcher(
    vm,
    updateComponent,
    () => {
      callHook(vm, "updated");
    },
    true
  );
  callHook(vm, "mounted");
}
// #endregion mountComponent

/**
 * 调用生命周期
 * @param {Vue} vm
 * @param {String} hook 生命周期名称
 */
export function callHook(vm, hook) {
  // console.log("🚀 ~ file: lifecycle.js:31 ~ callHook ~ 调用生命周期 ~ arguments", { vm, hook });
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm);
    }
  }
}
