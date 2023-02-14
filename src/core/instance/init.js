import { initState } from "./state";
import { compileToFunction } from "../../compiler/index";
import { callHook, mountComponent } from "./lifecycle";
import { mergeOptions } from "../util/options";

/**
 * 混入初始化方法至 Vue 原型
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.groupCollapsed("🚀 ~ file: src\\core\\instance\\init.js:11 ~ initMixin ~ _init ~ 初始化实例参数 ~ arguments", { options });
    const vm = this;

    vm.$options = mergeOptions(Vue.options, options);

    callHook(vm, "beforeCreate");
    // 初始化状态
    initState(vm);
    callHook(vm, "created");

    // 渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
    // console.groupEnd();
  };

  Vue.prototype.$mount = function (el) {
    let vm = this;
    el = document.querySelector(el); // 获取元素
    vm.$el = el;
    let options = vm.$options;
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
        // 转换为 ast 语法树
        let render = compileToFunction(template);
        options.render = render;
      }
    }
    // 挂载组件
    mountComponent(vm, el);
    // return vm.$mount.call(this, el);
  };
}
