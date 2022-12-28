export const HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestory",
  "destoryed",
];

// 策略模式
let strats = {};
// 遍历生命周期
HOOKS.forEach(hook => {
  strats[hook] = mergeHook;
})

function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal];
    }
  } else {
    return parentVal;
  }
}

/**
 * 合并 options
 */
export function mergeOptions(parent, child) {
  const options = {};
  for (let key in parent) {
    mergeField(key);
  }
  for (let key in child) {
    mergeField(key);
  }

  function mergeField(key) {
    // 根据key 策略模式
    if (strats[key]) {
      options[key] = strats[key](parent[key], child[key]);
    } else {
      options[key] = child[key];
    }
  }
  return options;
}

