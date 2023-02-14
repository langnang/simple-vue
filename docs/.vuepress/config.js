/** @format */

// THIS IS FILE IS OPTIONAL, you can delete it if you don't want to use it

// config.js is the entry file for your VuePress app configuration
// It can also be written in yml or toml instead of js
// See the documentation for more information on how to use it
// https://v1.vuepress.vuejs.org/config/

module.exports = {
  // 部署站点的基础路径，默认值为'/'
  base: "/simple-vue/",
  // 网站的标题
  title: "Simple Vue",
  // 网站的描述
  // description: "VuePress starter template ",
  // 额外的需要被注入到当前页面的 HTML <head> 中的标签
  head: [],
  // 指定用于 dev server 的主机名
  host: "0.0.0.0",
  // 指定 dev server 的端口
  port: 8080,
  // 指定 vuepress build 的输出目录,默认值为 '.vuepress/dist'
  // dest: ".vuepress/dist",
  // 提供多语言支持的语言配置
  locales: [],
  // 为当前的主题提供一些配置，这些选项依赖于你正在使用的主题
  themeConfig: require("./themeConfig.js"),
  plugins: require("./plugins.js"),

  // Markdown configuration
  markdown: {
    // 是否在每个代码块的左侧显示行号
    lineNumbers: true,
    // markdown-it 插件
    plugins: [],
  },
};
