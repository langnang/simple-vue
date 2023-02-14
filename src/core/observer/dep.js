let id = 0;
/**
 * 依赖收集
 */
export default class Dep {
  //
  static target;
  // 唯一标识
  id = id++;
  // 用数组存储订阅者(Watcher 实例) subs 是 subscribes 订阅者的意思
  subs = [];

  constructor() {}

  // 添加依赖，收集 Watcher
  depend() {
    // this.subs.push(Dep.target);
    Dep.target.addDep(this);
  }

  addSub(watcher) {
    // 将监听的目标添加进 subs 数组
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
// 清除 Watcher
export function popTarget() {
  Dep.target = null;
}
