# React 面试题

## 常用 hooks，描述作用

### useState

向组件添加一个 状态变量。
set 函数允许你将 state 更新为不同的值并触发组件重新渲染

### useEffect

允许你 将组件与外部系统同步。
外部系统指的是：组件需要与网络、某些浏览器 API 或第三方库保持连接。
useEffect(setup, dependencies?)

setup：处理 Effect 的函数。setup 函数选择性返回一个 清理（cleanup） 函数。当组件被添加到 DOM 的时候，React 将运行 setup 函数。在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。

可选 dependencies：setup 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。

### useRef

帮助引用一个不需要渲染的值。
改变 ref 不会触发重新渲染。这意味着 ref 是存储一些不影响组件视图输出信息的完美选择。

使用场景：

1. 使用 ref 操作 DOM 是非常常见的行为.
2. 避免重复创建昂贵的对象，使用 ref 来创建.

### useMemo

每次重新渲染的时候能够缓存计算的结果。
首次渲染时调用该函数；在之后的渲染中，如果 dependencies 没有发生变化，React 将直接返回相同值。
判断依赖项是否改变，React 是通过 *Object.is* 来判断的。

### useContext

概念：读取和订阅组件中的 context。

用法：向组件树深层传递数据。

优化：Context向深层组件传入带有函数的 props ，可以用 useCallback 包装传递的函数，再将传递的 props 用 useMemo 包装传递给深层组件。具体可以看下面的链接。

[在传递对象和函数时优化重新渲染](https://zh-hans.react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions)

### useReducer

组件的顶层作用域调用 useReducer 以创建一个用于管理状态的 reducer（将组件的所有状态更新逻辑整合到一个外部函数）

useReducer 和 useState 非常相似，但是它可以让你把状态更新逻辑从事件处理函数中移动到组件外部。

useReducer 和 useState 在功能上没什么区别，useReducer 可以对代码管理更好的控制。

可以使用 Immer 来简化 reducer 的编写。

### useImperativeHandle

useImperativeHandle(ref, createHandle, dependencies?);

让你自定义由 ref 暴露出来的句柄。

useImperativeHandle 在子组件中定义，createHandle 是个函数其返回值暴露给父组件调用的方法。

## 父组件调用子组件方法

子组件中使用 useImperativeHandle 定义暴露的方法，父组件通过 ref.current.definedName() 来调用.
