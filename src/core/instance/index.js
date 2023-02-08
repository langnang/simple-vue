// src\core\instance\index.js
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import { initGlobalAPI } from "../global-api/index";
import { stateMixin } from "./state";
import { compileToFunction } from "./../../compiler/index";
import { patch, createElm } from "./../vdom/patch";

function Vue(options) {
  // console.group("🚀 ~ file: src\\core\\instance\\index.js:9 ~ Vue ~ 构造Vue实例 ~ arguments", { options });
  // new Vue 的时候就执行到了这个 _init 函数
  // 该函数基于 initMixin 混入
  this._init(options);
  // console.groupEnd();
}

// 添加初始化方法
initMixin(Vue);
// 添加数据方法
stateMixin(Vue);
// 添加生命周期方法
lifecycleMixin(Vue);
// 添加_render
renderMixin(Vue);
// 添加全局方法
initGlobalAPI(Vue);

// let vm01 = new Vue({ data: { name: "张三" } });
// let render01 = compileToFunction(`
// <ul>
//   <li key="a" style="background:orange;">{{name}}</li>
//   <li key="b" style="background:yellow;">B</li>
//   <li key="c" style="background:bule;">C</li>
//   <li key="d" style="background:green;">D</li>
//   <li key="e" style="background:glay;">E</li>
// </div>
// `);
// // <li key="b" style="background:yellow;">B</li>
// // <li key="c" style="background:bule;">C</li>
// // <li key="d" style="background:green;">D</li>
// let vnode01 = render01.call(vm01);
// console.log({ vm01, render01, vnode01 });
// document.body.appendChild(createElm(vnode01));

// let vm02 = new Vue({ data: { name: "李四" } });
// let render02 = compileToFunction(`
// <ul>
//   <li key="b" style="background:yellow;">B</li>
//   <li key="d" style="background:green;">DDD</li>
//   <li key="c" style="background:bule;">C</li>
//   <li key="f" style="background:glay;">F</li>
//   <li key="e" style="background:glay;">E</li>
//   <li key="a" style="background:orange;">{{name}}</li>
// </ul>
// `);
// // <li key="c" style="background:bule;">C</li>
// // <li key="b" style="background:yellow;">B</li>
// // <li key="a" style="background:red;">A</li>
// // <li key="d" style="background:green;">D</li>
// let vnode02 = render02.call(vm02);
// console.log({ vm02, render02, vnode02 });

// const btn = document.getElementById("btn");
// btn.onclick = () => {
//   patch(vnode01, vnode02);
// };
export default Vue;
