import {parseHTML} from "./parser/index";


export function compileToFunction(template) {
  // 1. 将html转换为ast语法树
  let ast = parseHTML(template.trim());
  // 2. 将 ast 语法树转化为 render 函数 （1）ast 语法树
  console.log(ast);
}