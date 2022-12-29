import {arrayMethods} from "./array";
import Dep from "./dep";

export function observe(value) {

  // 判断
  if (typeof value != "object" || value == null) {
    return;
  }
  // 对象通过劫持类
  return new Observer(value);
}

/**
 * 劫持数据
 * 基于 Object.defineProperty 劫持对象
 * 缺点：只能劫持对象中的一个属性
 * 基于重写数组的方法来劫持数组
 */
class Observer {
  value;
  // 给所有的对象类型添加一个dep
  dep = new Dep();

  constructor(value) {
    this.value = value;
    // 给 data 定义一个属性
    Object.defineProperty(value, "__ob__", {
      enumerable: false,// 不可枚举
      value: this,// this 指向 observe
      configurable: true,
    })
    // 给所有的对象类型添加一个dep
    // this.dep = new Dep();
    // 若为数组，则重写数组方法
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods; // 将重写后的数组方法，替换至数组的原型链上
      // 处理数组对象
      this.observeArray(value);
    } else {
      this.walk(value); // 遍历
    }
  }

  /**
   * 遍历对象，对对象的每个属性进行劫持
   */
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  /**
   * 遍历数组对象，以便于劫持
   */
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}

/**
 * 劫持对象中的其中一个属性
 */
function defineReactive(data, key, value) {
  let childDep = observe(value); // 对子类进行深度代理
  let dep = new Dep();// 给每个属性添加一个dep
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        // 添加依赖
        dep.depend();
        if (childDep && childDep.dep) {
          // 数组收集依赖
          childDep.dep.depend();
        }
      }
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      observe(newVal); // 代理更新后的数据
      value = newVal;
      // notify 切忌 val=newValue 之后，不然在 callback 回调中一直是旧值
      dep.notify();
    },
  });
}
