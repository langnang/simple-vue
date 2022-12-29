import {patch} from "../vdom/patch";
import Watcher from "../observer/watcher";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this;
    vm.$el = patch(vm.$el, vnode);
  }
}


export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount');
  const updateComponent = () => {
    vm._update(vm._render());
  }
  new Watcher(vm, updateComponent, () => {
    callHook(vm, 'updated')
  }, true)
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