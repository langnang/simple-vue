import { nextTick } from "../util/next-tick.js";

let queue = [];
let has = {};
let waiting = false;

function flushWatcher() {
  console.log("🚀 ~ file: scheduler.js:8 ~ flushWatcher ~ flushWatcher", {
    queue,
    has,
    waiting,
  });
  // 遍历执行队列中的watcher
  queue.forEach((item) => {
    item.run();
  });
  // 重置变量
  queue = [];
  has = {};
  waiting = false;
}

export function queueWatcher(watcher) {
  let id = watcher.id; // 每个组件都是同一个watcher
  if (has[id] == null) {
    // 列队处理
    queue.push(watcher);
    has[id] = true;
    // 防抖：用户触发多次，只执行一次
    if (!waiting) {
      // 异步执行
      // setTimeout(() => {
      //   queue.forEach(item => item.run());
      //   queue = [];
      //   has = {};
      //   waiting = false;
      // })
      nextTick(flushWatcher); // nextTick 相当于定时器
    }
    waiting = true;
  }
}
