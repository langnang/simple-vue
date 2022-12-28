import {patch} from "../vdom/patch";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode);
  }
}


export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount');
  vm._update(vm._render());
  callHook(vm, 'mounted');
}


/**
 * 调用生命周期
 */
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm);
    }
  }
}