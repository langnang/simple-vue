import { popTarget, pushTarget } from "./dep.js";
import { queueWatcher } from "./scheduler.js";

let id = 0;

/**
 * 通过这个类 Watcher 实现视图更新
 * 派发更新
 */
export default class Watcher {
  // Vue 实例
  vm;
  // 存储视图更新的方法
  expression;
  // 回调函数
  cb;
  options;
  // 唯一标识
  id = id++;
  // 用数组存储依赖Dep实例
  deps = [];
  // 去重后的依赖标识(id)
  depIds = new Set();
  // 更新视图的方法
  getter;
  /**
   *
   * @param {*} vm
   * @param {*} expOrFn
   * @param {*} cb 回调函数
   * @param {*} options
   */
  constructor(vm, expOrFn, cb, options = {}) {
    this.vm = vm;
    this.expression = expOrFn;
    this.cb = cb;
    this.options = options;
    this.user = !!options.user;
    // 判断
    if (typeof this.expression === "function") {
      this.getter = this.expression; // 用来更新视图
    } else {
      // console.log('Watcher.constructor', arguments)
      // console.log('Watcher.constructor[vm.a.b]', vm.a.b)
      this.getter = function () {
        // 属性
        let path = expOrFn.split(".");
        // console.log(vm.a.b);
        let obj = vm;
        // console.log(obj.a.b);
        // console.log(path, obj);
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]];
        }
        // console.log(obj);
        return obj;
      };
    }
    // 更新视图
    this.value = this.get(); // 保存 watch 初始值
  }

  addDep(dep) {
    // 1. 去重
    let id = dep.id;
    if (!this.depIds.has(id)) {
      this.deps.push(dep);
      this.depIds.add(id);
      dep.addSub(this);
    }
  }

  // 初次渲染
  get() {
    pushTarget(this); // 给 Dep 添加 Watcher
    const value = this.getter(); // 渲染页面 vm._update(vm._render())
    popTarget(); // 给 Dep 取消 Watcher

    return value;
  }

  // 更新
  update() {
    // tips::不要每次更新后都调用 get 方法
    // 缓存
    // this.get();// 重写渲染页面
    queueWatcher(this);
  }

  run() {
    const value = this.get(); // 新值
    const oldValue = this.value; // 旧值
    this.value = value;
    // 执行 watch 的 handler(cb)
    if (this.user) {
      this.cb.call(this.vm, value, oldValue);
    }
  }
}
