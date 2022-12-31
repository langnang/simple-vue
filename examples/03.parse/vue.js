(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? (module.exports = factory()) : typeof define === "function" && define.amd ? define(factory) : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), (global.Vue = factory()));
})(this, function () {
  "use strict";

  /**start::src/core/instance/index.js */
  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue);
  stateMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  initGlobalAPI(Vue);
  /**end::src/core/instance/index.js */

  /**start::src/core/instance/init.js */
  /**
   * 添加初始化方法至 Vue 原型
   */
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = options;

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      let vm = this;
      el = document.querySelector(el); // 获取元素
      vm.$el = el;
      let options = vm.$options;
      if (!options.render) {
        let template = options.template;
        if (!template && el) {
          template = el.outerHTML;
          // 转换为 ast 语法树
          const ast = compileToFunction(template);
          options.ast = ast;
          options._ast = JSON.stringify(ast);
          console.log(ast);
        }
      }
      // 挂载组件
      // mountComponent(vm, el);
    };
  }
  /**end::src/core/instance/init.js */

  function compileToFunction(template) {
    console.group("🚀 ~ file: vue.js:55 ~ compileToFunction ~ 模板编译 ~ arguments", { template });
    // 1. 将html转换为ast语法树
    let ast = parseHTML(template);
    console.log("🚀 ~ file: vue.js:54 ~ compileToFunction ~ ast", ast);
    console.groupEnd();
    return ast;
    // 2. 将 ast 语法树转化为 render 函数 （1）ast 语法树转换为字符串 （2）字符串转换为函数
    const code = generate(ast); // _c _v _s
    // 3. 将render字符串转换为函数
    let render = new Function(`with(this){return ${code}}`);
    return render;
  }
  /**
   * 遍历解析 template 转化为 ast 语法树
   */
  function parseHTML(template) {
    console.group("🚀 ~ file: vue.js:205 ~ parseHTML ~ 模板解析 ~ arguments", { template });
    const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性
    const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    const ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名称
    const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")"; // <span:xx>
    const startTagOpen = new RegExp("^<" + qnameCapture); // 标签开头的正则，捕获的内容是标签名
    const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
    const endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>"); // 匹配标签结尾的 </div>
    const doctype = /^<!DOCTYPE [^>]+>/i;
    // #7298: escape - to avoid being passed as HTML comment when inlined in page
    const comment = /^<!\--/;
    const conditionalComment = /^<!\[/;
    /**
     * 创建 ast 语法树
     */
    function createASTElement(tag, attrs) {
      console.log("🚀 ~ file: vue.js:86 ~ createASTElement ~ 创建ast语法实例 ~ arguments", { tag, attrs });
      return {
        tag, // 元素
        attrs, // 属性
        children: [], // 子元素
        type: 1,
        parent: null, // 父元素
      };
    }

    let root; // 根元素
    let createParent; // 当前元素的父元素
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
      // text = text.replace(/ /g, '');
      if (text) {
        createParent.children.push({
          type: 3, // 文本
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
      if (createParent) {
        // 元素闭合
        element.parent = createParent.tag;
        createParent.children.push(element);
      }
    }
    let whileIndex = 0;
    while (template) {
      console.group(`🚀 ~ file: vue.js:140 ~ parseHTML ~ while(template)[${++whileIndex}}]`, { template });
      // 判断标签 <>
      let textEnd = template.indexOf("<");
      console.log("🚀 ~ file: vue.js:143 ~ parseHTML ~ template.indexOf('<')", textEnd);
      // 匹配标签
      if (textEnd === 0) {
        // 开始标签
        const startTagMatch = parseStartTag(); // 开始标签的内容
        if (startTagMatch) {
          console.log("🚀 ~ file: vue.js:148 ~ parseHTML ~ startTagMatch", startTagMatch);
          start(startTagMatch.tagName, startTagMatch.attrs);
          // continue; // 跳出本次循环
        } else {
          // 结束标签
          let endTagMatch = template.match(endTag);
          if (endTagMatch) {
            console.log("🚀 ~ file: vue.js:155 ~ parseHTML ~ endTagMatch", endTagMatch);
            end(endTagMatch[1]);
            advance(endTagMatch[0].length);
            // continue; // 跳出本次循环
          }
        }
      } else {
        // 文本
        let text;
        if (textEnd > 0) {
          // 获取文本内容
          text = template.substring(0, textEnd);
          console.log("🚀 ~ file: vue.js:168 ~ parseHTML ~ text", text);
        }
        if (text) {
          advance(text.length);
          chars(text);
        }
      }
      // whileIndex++;
      console.groupEnd();
    }
    /**
     * 解析开始标签
     */
    function parseStartTag() {
      //
      const start = template.match(startTagOpen); // 解析开始标签 1结果 2false
      if (!start) {
        return;
      }
      console.group("🚀 ~ file: vue.js:179 ~ parseStartTag ~ 解析开始标签 ~ start", start);
      // 创建 ast 语法树
      let match = {
        tagName: start[1],
        attrs: [],
      };
      // 删除开始标签
      advance(start[0].length);
      // 属性
      // tips:: 可能存在多个 => 遍历
      let attr, end;
      let whileIndex = 0;
      while (!(end = template.match(startTagClose)) && (attr = template.match(attribute))) {
        console.log(`🚀 ~ file: vue.js:196 ~ parseStartTag ~ 解析标签属性 ~ attr[${++whileIndex}]`, { name: attr[1], value: attr[3] || attr[4] || attr[5] });
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
        console.groupEnd();
        return match;
      }
    }

    // 删除 HTML
    function advance(n) {
      template = template.substring(n);
    }

    console.log("🚀 ~ file: vue.js:205 ~ parseHTML ~ root", root);
    console.groupEnd();
    return root;
  }

  /**start::src/core/instance/state.js */
  /**
   * 添加数据方法至 Vue 原型
   */
  function stateMixin(Vue) {}
  /**end::src/core/instance/state.js */

  /**start::src/core/instance/lifecycle.js */
  /**
   * 添加生命周期方法至 Vue 原型
   */
  function lifecycleMixin(Vue) {}
  /**end::src/core/instance/lifecycle.js */

  /**start::src/core/instance/render.js */
  /**
   * 添加渲染方法至 Vue 原型
   */
  function renderMixin(Vue) {}
  /**end::src/core/instance/render.js */

  /**start::src/core/global-api/index.js */
  /**
   * 添加全局方法至 Vue 原型
   */
  function initGlobalAPI(Vue) {}
  /**end::src/core/global-api/index.js */

  return Vue;
});
