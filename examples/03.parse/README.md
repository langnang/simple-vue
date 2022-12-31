# Parse - 模板解析

将 HTML 模板解析转换为 ast 语法树

## 回顾

## 获取模板

1. 用户定义的 `render()` 方法
2. 用户定义的 `template` 模板
3. HTML 原始模板：`document.querySelector(el).outerHTML`

## 模板解析

- 变量声明
  - `root`：根元素
- 遍历模板 `while(template)`
  - 根据标签符号 `<`，匹配标签 `template.indexOf('<')`
  - 根据匹配结果下标，判断标签或文本
    - 匹配开始标签，并提取出对应属性，删除 `template` 上提取到的内容
    - 提取文本，删除 `template` 上提取到的内容
    - 匹配结束标签，删除 `template` 上提取到的内容
- 返回 `root`

## 解析开始标签

```js
const ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名称
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")"; // <span:xx>
const startTagOpen = new RegExp("^<" + qnameCapture); // 标签开头的正则，匹配的内容是标签名
```

## 解析文本

## 解析结束标签

## 总结
