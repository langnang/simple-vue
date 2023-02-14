// 重写数组
// 1. 获取原来的数组方法
const arrayProto = Array.prototype;

// 2. 继承原来的数组方法
export const arrayMethods = Object.create(arrayProto);

// 3. 需要劫持的数组方法
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

methodsToPatch.forEach((item) => {
  arrayMethods[item] = function (...args) {
    let result = arrayProto[item].apply(this, args);
    // 数组追加元素的情况下
    let inserted;
    switch (item) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.splice(2);
        break;
      default:
        break;
    }
    let ob = this.__ob__;
    if (inserted) {
      ob.observeArray(inserted); // 对添加的对象进行劫持
    }
    ob.dep.notify();
    return result;
  };
});
