import { updateRpors } from "./create-element";

export function patch(oldVnode, newVnode) {
  console.groupCollapsed("🚀 ~ file: patch.js:5 ~ patch ~ 修补节点 ~ arguments", { oldVnode, newVnode });
  // 将 vnode 转换为真实 DOM
  // 第一次 oldVnode 是个真实 DOM
  if (oldVnode.nodeType === 1) {
    console.log("oldVnode 是个真实 DOM");
    // (1) 创建新DOM
    let el = createElm(newVnode);
    // (2) 替换
    let parentEl = oldVnode.parentNode;
    parentEl.insertBefore(el, oldVnode.nextSibling);
    parentEl.removeChild(oldVnode);
    console.groupEnd();
    return el;
  } else {
    // diff
    console.log("oldVnode 不是个真实 DOM");
    // 元素不一样
    if (oldVnode.tag !== newVnode.tag) {
      // console.log("新旧节点元素不一样", { oldVnodeTag: oldVnode.tag, newVnodeTag: newVnode.tag });
      oldVnode.el.parentNode.replaceChild(createElm(newVnode), oldVnode.el);
    }
    // 元素一样 text 属性不一样
    if (!oldVnode.tag) {
      // console.log("元素一样 text 属性不一样");
      if (oldVnode.text !== newVnode.text) {
        return (oldVnode.el.textContent = newVnode.text);
      }
    }

    let el = (newVnode.el = oldVnode.el);
    updateRpors(newVnode, oldVnode.data);
    // diff 子元素
    let oldChildren = oldVnode.children || [];
    let newChildren = newVnode.children || [];
    if (oldChildren.length > 0 && newChildren.length > 0) {
      // console.log("3. 新旧都有子元素", { newVnode, oldVnode, newChildren, oldChildren });
      // (3) 旧的有子元素 新的有子元素
      updateChild(oldChildren, newChildren, el);
    } else if (oldChildren.length > 0) {
      // (1) 旧的有子元素 新的没有子元素
      el.innerHTML = "";
    } else if (newChildren.length > 0) {
      // (2) 旧的没有子元素 新的有子元素
      for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i];
        // 添加到真实DOM
        el.appendChild(createElm(child));
      }
    }
    console.groupEnd();
  }
}

function updateChild(oldChildren, newChildren, parent) {
  console.group("🚀 ~ file: patch.js:107 ~ updateChild ~ diff更新子元素 ~ arguments", { oldChildren, newChildren, parent });
  // vue diff 算法
  // dom 中操作元素 常用的逻辑 尾部添加 头部添加 倒叙和正叙的方式
  // vue2 采用双指针的方法
  // (1). 创建双指针
  let [oldStartIndex, oldEndIndex] = [0, oldChildren.length - 1]; // 旧的开始/结尾索引
  let [oldStartVnode, oldEndVnode] = [oldChildren[oldStartIndex], oldChildren[oldEndIndex]]; // 旧的开始/结尾元素

  let [newStartIndex, newEndIndex] = [0, newChildren.length - 1]; // 新的开始/结尾索引
  let [newStartVnode, newEndVnode] = [newChildren[newStartIndex], newChildren[newEndIndex]]; // 新的开始/结尾元素

  // 创建旧元素的映射表
  function makeIndexByKey(children) {
    let map = {};
    children.forEach((item, index) => {
      // tips::没有key
      if (item.key) {
        map[item.key] = index;
      }
    });
    return map;
  }
  let keyMap = makeIndexByKey(oldChildren);
  // console.log("🚀 ~ file: patch.js:72 ~ updateChild ~ 旧的元素映射表 ~ keyMap", keyMap);
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // console.group("🚀 ~ file: patch.js:81 ~ updateChild ~ while", { newStartIndex, newEndIndex, oldStartIndex, oldEndIndex });
    // 比对子元素
    // 头部 注意 头部新旧元素是不是同一个元素
    if (isSameVnode(newStartVnode, oldStartVnode)) {
      console.log("1. 命中新前与旧前", { newStartIndex, oldStartIndex, oldStartVnode, newStartVnode });
      // 递归
      patch(oldStartVnode, newStartVnode);
      // 移动指针
      newStartVnode = newChildren[++newStartIndex];
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (isSameVnode(newEndVnode, oldEndVnode)) {
      console.log("2. 命中新后与旧后", { newEndIndex, oldEndIndex, oldEndVnode, newEndVnode });
      patch(oldEndVnode, newEndVnode);
      newEndVnode = newChildren[--newEndIndex];
      oldEndVnode = oldChildren[--oldEndIndex];
    } else if (isSameVnode(newEndVnode, oldStartVnode)) {
      console.log("3. 命中新后与旧前", { newEndIndex, oldStartIndex, oldStartVnode, newEndVnode });
      patch(oldStartVnode, newEndVnode);
      parent.insertBefore(newEndVnode.el, oldEndVnode.el.nextSibling);
      newEndVnode = newChildren[--newEndIndex];
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (isSameVnode(newStartVnode, oldEndVnode)) {
      console.log("4. 命中新前与旧后", { newStartIndex, oldEndIndex, oldEndVnode, newStartVnode });
      patch(oldEndVnode, newStartVnode);
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
      newStartVnode = newChildren[++newStartIndex];
      oldEndVnode = oldChildren[--oldEndIndex];
    } else {
      console.log("x. 上述未命中，暴力对比");
      // 子节点之间没有任何关系，暴力对比
      let moveIndex = keyMap[newStartVnode.key];
      // 从旧的中寻找元素
      if (moveIndex == undefined) {
        // 没有
        parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
      } else {
        // 有
        let moveVnode = oldChildren[moveIndex];
        oldChildren[moveIndex] = null;
        // 插入
        parent.insertBefore(moveVnode.el, oldStartVnode.el);
        // 可能存在子元素，递归
        patch(moveVnode, newStartVnode);
      }
      newStartVnode = newChildren[++newStartIndex];
    }
    // console.groupEnd();
  }
  // 添加新的多余的子元素
  if (newStartIndex <= newEndIndex) {
    console.log("存在新的多余的子元素", { newStartIndex, newEndIndex, newChildren });
    const before = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parent.insertBefore(createElm(newChildren[i]), before);
    }
  }
  // 删除旧的多余的子元素
  if (oldStartIndex <= oldEndIndex) {
    console.log("存在旧的多余的子元素");
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      // tips null
      let child = oldChildren[i];
      if (child) {
        parent.removeChild(child.el); // 删除元素
      }
    }
  }
  console.groupEnd();
}

/**
 * 对比元素是否为同一个元素
 */
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}

export function createElm(vnode) {
  // console.log("🚀 ~ file: patch.js:119 ~ createElm ~ arguments", { vnode });
  let { tag, data, key, children, text } = vnode;
  // 标签
  if (typeof tag === "string") {
    // 创建元素
    vnode.el = document.createElement(tag);
    updateRpors(vnode);
    if (children.length > 0) {
      children.forEach((item) => {
        // console.log(item);
        // 追加子元素
        vnode.el.appendChild(createElm(item));
      });
    }
  } else {
    // 创建文本
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
