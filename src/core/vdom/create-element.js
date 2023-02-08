import { vnode } from "./vnode";

/**
 * 创建元素
 */
export function createElement(tag, data = {}, ...children) {
  return vnode(tag, data, data ? data.key : null, children);
}

/**
 * 添加属性
 */
export function updateRpors(vnode, oldRpors = {}) {
  oldRpors = oldRpors ? oldRpors : {}; // null 时未修正为{}
  // console.groupCollapsed("🚀 ~ file: create-element.js:44 ~ updateRpors ~ 更新元素样式属性 ~ arguments", { vnode, oldRpors });
  let newProps = vnode.data || {};
  let el = vnode.el;
  // 旧的有属性，新的没有属性
  if (Object.keys(oldRpors).length > 0) {
    // console.log("旧的有属性，新的没有属性");
    for (let key in oldRpors) {
      if (!newProps[key]) {
        // 删除属性
        el.removeAttribute(key);
      }
    }
  }

  let newStyle = newProps.style || {}; // 获取新的样式
  let oldStyle = oldRpors.style || {}; // 获取旧的样式
  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style = "";
    }
  }
  // 新的
  for (let key in newProps) {
    if (key === "style") {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === "class") {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
  // console.groupEnd();
}
