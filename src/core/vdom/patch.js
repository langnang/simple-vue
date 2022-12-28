export function patch(oldVnode, vnode) {
  // 将 vnode 转换为真实 DOM
  // (1) 创建新DOM
  let el = createElm(vnode);
  // (2) 替换
  let parentEl = oldVnode.parentNode;
  parentEl.insertBefore(el, oldVnode.nextSibling);
  parentEl.removeChild(oldVnode);
  return el;
}

function createElm(vnode) {
  let {tag, data, key, children, text} = vnode;
  // 标签
  if (typeof tag === 'string') {
    // 创建元素
    vnode.el = document.createElement(tag);
    if (children.length > 0) {
      children.forEach(item => {
        // console.log(item);
        // 追加子元素
        vnode.el.appendChild(createElm(item));
      })
    }
  } else {
    // 创建文本
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}