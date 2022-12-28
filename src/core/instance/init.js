import {initState} from "./state";
import {compileToFunction} from "../../compiler/index";
import {mountComponent} from "./lifecycle";

/**
 * 混入初始化方法至 Vue 原型
 */
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    vm.$options = options;

    // 初始化状态
    initState(vm);

    // 渲染模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    // console.log(el);
    let vm = this;
    el = document.querySelector(el);// 获取元素
    let options = vm.$options;
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        el = el.outerHTML;
        // 转换为 ast 语法树
        let render = compileToFunction(el);
        console.log(render);
        options.render = render;
      }
    }
    // 挂载组件
    mountComponent(vm, el);
  }
}
