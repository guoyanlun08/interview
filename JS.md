# JS 面试题

## 基本数据类型

1. number
2. string
3. boolean
4. undefined
5. null
6. symbol

## var, let, const 区别

1. var 声明是全局作用域或函数作用域，而 let 和 const 是块作用域。
2. var 变量可以在其作用域内更新和重新声明；let 变量可以更新但不能重新声明；const 变量既不能更新也不能重新声明。
3. let 和 const 有暂时性死区，不能在声明前使用。var 有变量提升。

## js 判断对象属性是否在原型钟

Object.hasOwnProperty 判断属性是否存在实例中
in 操作符：能访问到的属性就为 true，不管存在实例还是原型中
利用

```javascript
function propertyIsInPrototype(object, propertyName) {
  return !object.hasOwnProperty(propertyName) && propertyName in object;
}
```

## 手写 call

```javascript
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new Error('type error');
  }
  const curContext = context || window;
  const args = [...arguments].slice(1);

  let result = null;

  curContext.fn = this;

  result = curContext.fn(...args);

  return result;
};
```
