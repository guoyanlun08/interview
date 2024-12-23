# Vue 面试题

## defineExpose

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
