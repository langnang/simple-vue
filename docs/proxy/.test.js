import { proxy } from "../../src/core/instance/state.js";

const vm = {};

let data = () => ({ title: "Simple Vue", author: "Langnang" });

data = vm._data = typeof data === "function" ? data.call(vm) : data || {};

for (let key in data) {
  proxy(vm, "_data", key);
}

console.log(vm);
// { _data: { title: 'Simple Vue', author: 'Langnang' } }
console.log(vm.title);
// Simple Vue
console.log(vm.author);
// Langnang
