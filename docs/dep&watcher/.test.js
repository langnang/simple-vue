import Watcher from "./watcher.js";

const watcher = new Watcher(
  {},
  () => {},
  () => {},
  true
);

console.log(watcher);
/**
Watcher {
  vm: {},
  expression: [Function (anonymous)],
  cb: [Function (anonymous)],
  options: true,
  getter: [Function (anonymous)]
}
 */
