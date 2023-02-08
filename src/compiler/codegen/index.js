export function generate(ast) {
  let children = genChildren(ast);
  // tips::属性(style)
  let code = `_c('${ast.tag}',${ast.attrs.length ? `${genProps(ast.attrs)}` : "null"},${children ? `${children}` : "null"})`;
  return code;
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{}}

/**
 * 处理子节点
 */
function genChildren(ast) {
  let children = ast.children;
  if (children) {
    return children.map((item) => gen(item)).join(",");
  }
}

function gen(node) {
  // 元素
  if (node.type === 1) {
    return generate(node);
  } else {
    // 文本
    let text = node.text;
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`;
    }
    // 带有 {{}}
    let tokens = [];
    let lastIndex = (defaultTagRE.lastIndex = 0);
    let match;
    while ((match = defaultTagRE.exec(text))) {
      const index = match.index;
      if (index > lastIndex) {
        // 添加 {{ 前内容
        tokens.push(JSON.stringify(text.slice(lastIndex, index))); // 文本
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      // 添加 }} 后内容
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join("+")})`;
  }
}

/**
 * 处理属性
 */
function genProps(attrs) {
  let str = "";
  // 对象
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === "style") {
      let obj = {};
      attr.value.split(";").forEach((item) => {
        let [key, val] = item.split(":");
        if (key && val) {
          obj[(key || "").trim()] = val.trim();
        }
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}
