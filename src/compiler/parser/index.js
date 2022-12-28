const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";// 标签名称
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";// <span:xx>
const startTagOpen = new RegExp(("^<" + qnameCapture));// 标签开头的正则，捕获的内容是标签名
const startTagClose = /^\s*(\/?)>/;// 匹配标签结束的 >
const endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));// 匹配标签结尾的 </div>
const doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;// {{}}

/**
 * 创建 ast 语法树
 */
function createASTElement(tag, attrs) {
  return {
    tag,// 元素
    attrs, // 属性
    children: [],// 子元素
    type: 1,
    parent: null, // 父元素
  };
}

let root;// 根元素
let createParent;// 当前元素的父元素
// 数据结构 栈
let stack = [];

/**
 * 开始标签
 */
function start(tag, attrs) {
  let element = createASTElement(tag, attrs);
  if (!root) {
    root = element;
  }
  createParent = element;
  stack.push(element);
}

/**
 * 文本
 */
function chars(text) {
  text = text.replace(/a/g, '');
  if (text) {
    createParent.children.push({
      type: 3,// 文本
      text,
    });
  }
}

/**
 * 结束标签
 */
function end(tag) {
  let element = stack.pop();
  createParent = stack[stack.length - 1];
  if (createParent) {// 元素闭合
    element.parent = createParent.tag;
    createParent.children.push(element);
  }
}

/**
 * 遍历解析 template 转化为 ast 语法树
 */
export function parseHTML(template) {
  while (template) {
    // 判断标签 <>
    let textEnd = template.indexOf('<');
    if (textEnd === 0) {// 标签
      // 开始标签
      const startTagMatch = parseStartTag();// 开始标签的内容
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;// 跳出本次循环
      }
      // 结束标签
      let endTagMatch = template.match(endTag);
      if (endTagMatch) {
        end(endTagMatch[1]);
        advance(endTagMatch[0].length)
        continue;// 跳出本次循环
      }
    }
    // 文本
    let text;
    if (textEnd > 0) {
      // 获取文本内容
      text = template.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  function parseStartTag() {
    // 
    const start = template.match(startTagOpen);// 解析开始标签 1结果 2false
    if (!start) {
      return;
    }
    // 创建 ast 语法树
    let match = {
      tagName: start[1],
      attrs: []
    }
    // 删除开始标签
    advance(start[0].length);
    // 属性
    // tips:: 可能存在多个 => 遍历
    let attr, end;
    while (!(end = template.match(startTagClose)) && (attr = template.match(attribute))) {
      match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]});
      advance(attr[0].length);
    }
    if (end) {
      advance(end[0].length);
      return match;
    }
  }

  // 删除 HTML 
  function advance(n) {
    template = template.substring(n);
  }

  return root;
}