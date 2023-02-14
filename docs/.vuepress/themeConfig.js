const host =
  process.env.NODE_ENV === "production"
    ? "http://docs.langnang.ml"
    : "http://docs.langnang-develop.ml";

const config = {
  // 导航栏链接
  nav: [
    { text: "Home", link: "/" },
    { text: "Guide", link: "/Guide" },
    {
      text: "VuePress",
      items: [
        { text: "Official", link: "https://vuepress.vuejs.org/" },
        { text: "模板", link: host + "/template/" },
        { text: "规范", link: host + "/specification/" },
        { text: "工具", link: host + "/toolkit/" },
        { text: "数据结构与算法", link: host + "/dsa/" },
        { text: "前端开发", link: host + "/front-end/" },
        { text: "源码提炼", link: host + "/learning/" },
      ],
    },
    { text: "GitHub", link: "https://github.com/langnang/langnang/" },
  ],
  // 侧边栏
  sidebar: [
    {
      title: "Simple Vue", // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 6, // 可选的, 默认值是 1
      children: ["/proxy/", "/observe/", "/dep&watcher/"],
    },
  ],
  // 显示所有页面的标题链接
  displayAllHeaders: true,
  // 最后更新时间
  lastUpdated: "Last Updated",
};

if (process.env.NODE_ENV === "development") {
  config.nav[2].items = [
    ...config.nav[2].items,
    { text: "后端开发", link: host + "/back-end/" },
    { text: "移动端开发", link: host + "/mobile-terminal/" },
    { text: "计算机科学", link: host + "/computer-science/" },
    { text: "知识体系", link: host + "/system/" },
  ];
}

module.exports = config;
