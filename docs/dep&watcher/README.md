# Dep&Watcher 依赖收集&派发更新

## Watcher

创建`Watcher`实例，实现视图渲染

<<< @/../src/core/observer/watcher.js

<<< @/../src/core/instance/lifecycle.js#mountComponent{9-20}

**单元测试**

<<< @/dep&watcher/.test.js

<!-- <<< @\learning\simple\simple-vue\snippets\01\\.test.js -->

## Dep

实现`Dep`，实现视图更新

::: warning

在这里，`Dep`与`Watcher`是一对多的关系

:::

<<< @/../src/core/observer/dep.js

<!-- <<< @\learning\simple\simple-vue\snippets\02\dep.js -->

<!-- <<< @\learning\simple\simple-vue\snippets\02\watcher.js -->

**单元测试**

<!-- <<< @\learning\simple\simple-vue\snippets\02\\.test.js -->

## Dep2Watcher

实现`Dep`与`Watcher`之间多对多的关系

## Dep Object

实现对象的依赖收集

<!-- <<< @\learning\simple\simple-vue\snippets\03\observe.js -->

## Dep Array

实现数组的依赖收集
