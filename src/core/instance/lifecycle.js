import {patch} from "../vdom/patch";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    console.log(vnode);
    let vm = this;
    vm.$el = patch(vm.$el, vnode);
  }
}


export function mountComponent(vm, el) {
  vm._update(vm._render());
}

