import {initMixin} from "./init";
import {lifecycleMixin} from "./lifecycle";
import {renderMixin} from "./render";

function Vue(options) {
  // new Vue 的时候就执行到了这个 _init 函数
  // 该函数基于 initMixin 混入
  this._init(options);
}

// 添加初始化方法
initMixin(Vue);
// 添加生命周期方法
lifecycleMixin(Vue);
// 添加_render
renderMixin(Vue);

export default Vue;
