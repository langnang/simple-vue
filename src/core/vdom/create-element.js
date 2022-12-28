import {vnode} from "./vnode";

/**
 * 创建元素
 */
export function createElement(tag, data = {}, ...children) {
  return vnode(tag, data, data ? data.key : null, children)
}