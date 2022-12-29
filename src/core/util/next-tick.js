const callbacks = []
let pending = false;

function flushCallbacks() {
  callbacks.forEach(cb => cb());
  pending = false;
}

let timeFunc;
// 处理兼容问题
if (Promise) {
  timeFunc = () => Promise.resolve().then(flushCallbacks);// 异步处理
} else if (MutationObserver) {// h5 异步方法 可以监听DOM变化，监控完毕后异步更新
  let observer = new MutationObserver(flushCallbacks);
  let textNode = document.createTextNode('1');
  observer.observe(textNode, {characterData: true});// 
  timeFunc = () => textNode.textContent = 2;
} else if (setImmediate) {
  timeFunc = () => setImmmediate(flushCallbacks);
} else {
  timeFunc = () => setTimeout(flushCallbacks, 0);
}

export function nextTick(cb = function () {
}, ctx) {
  // console.log('nextTick', cb)
  // cb.call(ctx);
  callbacks.push(() => {
    cb.call(ctx);
  })
  if (!pending) {
    timeFunc();
    pending = true;
  }
}