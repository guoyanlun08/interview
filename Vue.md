# Vue 面试题

## 生命周期

vue3 和 vue2 的生命周期几乎也没什么差别。vue3 在 beforeCreate 前多了一个 setup 的概念。

vue3 中常用的生命周期钩子有

- onMounted —— 组件挂载完成后执行
- onUpdated —— 组件因为响应式状态变更而更新其 DOM 树之后调用
- onUnmounted —— 组件实例被卸载之后调用

## defineExpose 作用

**定义：** 通过 defineExpose 编译器宏来显式指定在 \<script setup\> 组件中要暴露出去的属性

**使用：**

```js
// 子组件中定义
const count = ref(0);
const exposeFn = () => {
  console.log('打印');
};

defineExpose({
  count,
  exposeFn,
});

// 父组件中使用
// 模板
<SonComp ref="sonComp" />;
// setup 中定义一个点击事件
const handleClick = () => {
  sonComp.value.exposeFn();
  console.log(sonComp.value.count);
};
```

## watchEffect 作用

**定义：** 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

具体使用参数类型定义还是看[官网文档](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)

```js
// 常用介绍
const stop = watchEffect((onCleanup) => {}, {
  // 选项只列了常用的，不是只有这个
  flush: 'pre', // 'pre' | 'post' | 'sync'
});

// 返回值，这里的 stop 变量
// 当不再需要此侦听器时:
stop()
```

第一个参数就是要运行的副作用函数。这个副作用函数中的参数也是函数，是用来清理无效的副作用的。清理回调会在该副作用下一次执行前被调用的。

第二个参数是可选的，

- 有个选项默认是 flush: 'pre'（侦听器将在组件渲染之前执行）
- flush: 'post' (使侦听器延迟到组件渲染之后再执行)
- flush: 'sync' (在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器)

## watch 作用

**定义：** 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

具体使用参数类型定义还是看[官网文档](https://cn.vuejs.org/api/reactivity-core.html#watch)

```js
const stop = watch(source, () => {}, {
  // 选项只列了常用的，不是只有这些
  immediate: true, // 在侦听器创建时立即触发回调
  deep: true, // 对象深度监听
  flush：'pre', // 同上 watchEffect
  once: true, // (3.4+) 回调函数只会运行一次。
})
```

watch 使用上和 watchEffect 类似。

- 第一个参数是侦听器的源（函数返回值 或 ref 或 reactive响应式对象）
- 第二个参数是发生变化时要调用的回调函数
- 第三个参数选项配置。

``` js
// P.S. 当直接侦听一个响应式对象时，侦听器会自动启用深层模式 (自己验证一下)
const state = reactive({ count: 0 })
watch(state, () => {
  /* 深层级变更状态所触发的回调 */
})
```

> 面试考点
>
> watch() 和 watchEffect() 区别
>
> 1. watch 默认是懒执行，不是一进页面就触发的（可以通过配置 immediate: true 来立即执行）。wacthEffect 是立即执行的
>
> 2. 更加明确是应该由哪个状态触发侦听器重新执行
>
> 3. 可以访问所侦听状态的前一个值和当前值。
