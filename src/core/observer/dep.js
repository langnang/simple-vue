let id = 0;
/**
 * 依赖收集
 */
export default class Dep {
  //
  static target;
  // 唯一标识
  id = id++;
  // 用数组存储订阅者(Watcher 实例)
  subs = [];

  constructor() {
    console.log("🚀 ~ file: dep.js:14 ~ Dep ~ constructor ~ constructor", {});
    // console.log(`Dep.constructor[${this.id}]`, this)
    // this.id = id++;
    // 用数组存储自己的订阅者   subs 是 subscribes 订阅者的意思
    // 这个数组里放的是 Watcher 的实例
    // this.subs = [];
  }

  // 收集 Watcher
  // 添加依赖
  depend() {
    // console.log(`Dep.depend[${this.id}]`, this, arguments)
    // 将监听的目标添加进 subs 数组
    // this.subs.push(Dep.target);
    Dep.target.addDep(this);
  }

  addSub(watcher) {
    // console.log(`Dep.addSub[${this.id}]`, this, arguments)
    this.subs.push(watcher);
  }

  // 更新 Watcher
  // 通知所有订阅者
  notify() {
    // 遍历
    for (let i = 0; i < this.subs.length; i++) {
      // 逐个更新
      this.subs[i].update();
    }
  }
}

// 添加 Watcher
export function pushTarget(watcher) {
  Dep.target = watcher;
}

export function popTarget() {
  Dep.target = null;
}
