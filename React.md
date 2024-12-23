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
判断依赖项是否改变，React 是通过 _Object.is_ 来判断的。

### useContext

概念：读取和订阅组件中的 context。

用法：向组件树深层传递数据。

优化：Context 向深层组件传入带有函数的 props ，可以用 useCallback 包装传递的函数，再将传递的 props 用 useMemo 包装传递给深层组件。具体可以看下面的链接。

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

```javascript
import { useRef, useImperativeHandle } from 'react';

export default function FatherInput() {
  const ref = useRef(null);
  return (
    <div>
      <button
        onClick={() => {
          if (ref.current) {
            ref.current.focus();
          }
        }}
      >
        点击
      </button>
      <MyInput ref={ref} />
    </div>
  );
}

const MyInput = ({ ref }) => {
  const inputRef = useRef < HTMLInputElement > null;
  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        },
      };
    },
    []
  );
  return <input type="text" ref={inputRef} />;
};
```

## 监听 form 上的属性

1. 使用 useState ，更新函数触发也伴随 UI 的更新
2. antd@4.20.0 后新增了 Form.useWatch ，例：Form.useWatch('song', form); 但性能方面上有些困扰，监听一个属性改变，会带动表单整体 UI 更新
3. Watch 组件，Ant Plus 5（antx）中提供了一个 Watch 组件，专用于监听表单字段变化，并更新局部 UI 的需求。

```jsx
import { Form, Watch, Input } from 'antx';

const [form] = Form.useForm();

<Form form={form}>
  <Input label="歌曲" name="song" />

  <Watch name="song">
    {(songValue) => {
      // 仅此处 UI 更新，不会每次输入都触发整个组件 re-render
      return songValue?.length > 0 && <div>歌曲：{songValue}</div>;
    }}
  </Watch>
</Form>;
```

## useEffect 会执行几次

在开发条件下，开启严格模式，会先调用 cleanup 函数再调用 setup 函数。（如果组件第一个挂在在页面上，会在 cleanup 前调用一次 setup）

## 高阶组件

高阶组件（HOC）是一个接收组件作为参数并返回一个新组件的函数。
看个例子：

```jsx
// ------- withLoading.jsx
// 定义一个简单的高阶组件
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
}
export default withLoading;

// ------- DataListWithLoading.jsx
// 高阶组件包装
import withLoading from "./withLoading";

function DataList({ data }) {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
const DataListWithLoading = withLoading(DataList);
export default DataListWithLoading;

// -----index.js
// 使用高阶组件
<DataListWithLoading data={data} isLoading={isLoading} />

```

使用高阶组件，就是将组件一些复用的逻辑，抽离在外层封装成一个函数（demo 中的 withLoading），组件通过参数传递给外层函数，来复用定义在外层函数内的逻辑。
