import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import cleanup from "rollup-plugin-cleanup";
export default {
  input: "./src/core/instance/index.js", // 打包的入口文件
  output: {
    file: "dist/vue.js",
    format: "umd", // 在 window 上使用 Vue, new Vue
    name: "Vue",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**", // 排除文件
    }),
    serve({
      open: true,
      openPage: "/examples/index.html",
      port: "8080",
      contentBase: "", // 若为空字符串表示当前目录
    }),
    cleanup(),
  ],
};
