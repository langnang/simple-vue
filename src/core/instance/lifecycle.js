import { patch } from "../vdom/patch";
import Watcher from "../observer/watcher";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}

export function mountComponent(vm, el) {
  console.group("🚀 ~ file: lifecycle.js:12 ~ mountComponent ~ 模板渲染 ~ arguments", { vm, el });
  callHook(vm, "beforeMount");
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
  console.groupEnd();
}

/**
 * 调用生命周期
 */
export function callHook(vm, hook) {
  console.log("🚀 ~ file: lifecycle.js:31 ~ callHook ~ 调用生命周期 ~ arguments", { vm, hook });
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm);
    }
  }
}
