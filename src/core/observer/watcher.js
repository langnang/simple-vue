import {popTarget, pushTarget} from "./dep";

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

  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.expression = expOrFn;
    this.cb = cb;
    this.options = options;
    // 判断
    if (typeof this.expression === 'function') {
      this.getter = this.expression;// 用来更新视图
    }
    // 更新视图
    this.get();
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
    pushTarget(this);// 给 Dep 添加 Watcher
    this.getter();// 渲染页面 vm._update(vm._render())
    popTarget();// 给 Dep 取消 Watcher
  }

  // 更新
  update() {
    // tips::不要每次更新后都调用 get 方法
    // 缓存
    // this.get();// 重写渲染页面
    queueWatcher(this);
  }

  run() {
    this.getter();
  }
}
let queue = [];
let has = {};
let waiting = false

function queueWatcher(watcher) {
  let id = watcher.id;// 每个组件都是同一个watcher
  if (has[id] == null) {
    // 列队处理
    queue.push(watcher);
    has[id] = true;
    // 防抖：用户触发多次，只执行一次
    if (!waiting) {
      // 异步执行
      setTimeout(() => {
        queue.forEach(item => item.run());
        queue = [];
        has = {};
        waiting = false;
      })
    }
    waiting = true;
  }
}

