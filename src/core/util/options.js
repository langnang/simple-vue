export const HOOKS = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestory", "destoryed"];

// 策略模式
let strats = {};
// 遍历生命周期
HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

function mergeHook(parentVal, childVal) {
  console.log("🚀 ~ file: src\\core\\util\\options.js:11 ~ mergeHook ~ 合并生命周期钩子 ~ arguments", { parentVal, childVal });
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
export function mergeOptions(parent = {}, child) {
  console.groupCollapsed("🚀 ~ file: src\\core\\util\\options.js:35 ~ mergeOptions ~ 合并 options ~ arguments", { parent, child });
  const options = {};
  for (let key in parent) {
    mergeField(key);
  }
  for (let key in child) {
    mergeField(key);
  }

  function mergeField(key) {
    // console.log('mergeField', arguments)
    // 根据 key 策略模式
    if (strats[key]) {
      console.log("🚀 ~ file: src\\core\\util\\options.js:40 ~ mergeField ~ 检测到用户配置中存在生命周期钩子 ~ key", key);
      options[key] = strats[key](parent[key], child[key]);
    } else {
      options[key] = child[key];
    }
  }
  console.groupEnd();
  return options;
}
