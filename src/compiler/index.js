import { parseHTML } from "./parser/index";
import { generate } from "./codegen/index";

export function compileToFunction(template) {
  console.groupCollapsed("🚀 ~ file: index.js:5 ~ compileToFunction ~ 模板编译 ~ arguments", { arguments });
  // 1. 将html转换为ast语法树
  let ast = parseHTML(template.trim());
  console.group("🚀 ~ file: index.js:6 ~ compileToFunction ~ 转换为render() ~ arguments", { ast });
  // 2. 将 ast 语法树转化为 render 函数 （1）ast 语法树转换为字符串 （2）字符串转换为函数
  const code = generate(ast); // _c _v _s
  console.log("1. ast 语法树转换为字符串", { ast, code });
  // 3. 将render字符串转换为函数
  let render = new Function(`with(this){return ${code}}`);
  console.log("2. 字符串转换为函数", { ast, code, render });
  console.groupEnd();
  console.groupEnd();
  return render;
}
