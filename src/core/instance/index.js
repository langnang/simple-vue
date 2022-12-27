import {initMixin} from "./init";

function Vue(options) {
  // new Vue 的时候就执行到了这个 _init 函数
  // 该函数基于 initMixin 混入
  this._init(options);
}

// 混入初始化方法
initMixin(Vue);

export default Vue;
