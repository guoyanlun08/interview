# CSS 面试

## CSS 优先级

**常用选择器权重优先级：!important \> id > class > tag**

_详细_
元素上权重高的生效。
权重计算：

- 一个行内样式+1000
- 一个 id 选择器+100
- 一个属性选择器、class 或者伪类+10
- 一个元素选择器，或者伪元素+1
- 通配符+0

## flex 布局中，弹性子元素表现形式

> 面试问法：父容器设置了 flex, 子元素中块级元素和行内元素表现区别是什么？
>
> 回答：如果一个元素的父元素开启了 flex 布局；那么其子元素的 display 属性对自身的影响将会失效，但是对其内容的影响依旧存在的。
>
> 如何理解：
>
> - 子元素设置了 display: block || display: inline 属性，自身的表现会像个 inline-block 元素。这就是对自身影响失效.
> - 子元素也设置了 flex 布局, 子元素的内容依然会受到它 flex 布局的影响.

**flex-item 会有下列行为:**

- 元素沿主轴排列为一行 (flex-direction 属性的初始值是 row), flex-wrap: nowrap。
- 元素不会在主维度方向拉伸，但是可以缩小。
- 元素被拉伸来填充侧轴大小。
- flex-basis 属性为 auto。

## flex-grow

**这个属性其实挺重要的，建议不要忽略**
定义：弹性盒子项（flex-item）的拉伸因子，默认值 0

主要是让子容器来瓜分父容器的剩余空间
![flex剩余空间](./imgs/flex剩余空间.png 'flex剩余空间')

### 子容器是怎么进行瓜分？

先来看段 css 代码

```css
/* 子项 (flex-item) */
.item {
  height: 100px;
}
/* A 子容器 */
.a {
  width: 100px;
  flex-grow: 1;
}
/* B 子容器 */
.b {
  width: 150px;
  flex-grow: 2;
}
/* C 子容器 */
.c {
  width: 100px;
  flex-grow: 3;
}
```

先给结论：
![flex-grow瓜分剩余空间](./imgs/flex-grow瓜分剩余空间.png 'flex-grow瓜分剩余空间')
设剩余空间为 150px
A 子容器瓜分剩余空间后的 width：1/(1+2+3) \* 150 + 100
B 子容器瓜分剩余空间后的 width：2/(1+2+3) \* 150 + 150
C 子容器瓜分剩余空间后的 width：3/(1+2+3) \* 150 + 100

我们可看出，设置 flex-grow 后，子容器瓜分父容器剩余空间后，子容器的宽度为：flex-grow 在子项中所有占比 \* 剩余空间的宽度，再加上自身的宽度。

计算方式为：

- 剩余空间：x
- 假设有三个 flex item 元素，flex-grow 的值分别为 a, b, c
- 每个元素可以分配的剩余空间为： a/(a+b+c) \* x，b/(a+b+c) \* x，c/(a+b+c) \* x

### 应用场景

我们经常会用，在一个 layout 布局下，一个 header, footer 高度固定，中间内容区自动填满占据剩余空间。
![flex填满剩余空间.png](./imgs/flex填满剩余空间.png 'flex填满剩余空间.png')
这里是纵向的，需要设置 【flex-direction: column;】改变弹性主轴方向.
在日常开发中，其实我们用的 _flex: 1;_ 来满足这样的需求，其实 _flex: 1;_ 就是用了 _flex-grow: 1;_ 的属性。后面会提及 **flex** 属性.

demo：
[layout 布局使用 flex-grow 自动填满剩余空间](./demo/layout布局使用flex-grow自动填满剩余空间.html 'layout布局使用flex-grow自动填满剩余空间')

## flex-shrink

定义：指定了 flex 元素的收缩规则，默认值是 1

子容器压缩条件：当子容器宽度超过父容器宽度，flex 默认不换行，就会进行压缩。
P.S. 如果子容器没有超出父容器，设置 flex-shrink 无效

有了上面 flex-grow 的理解，对这个计算公式就好理解了：

- 三个 flex item 元素的 width: w1, w2, w3
- 三个 flex item 元素的 flex-shrink：a, b, c
- 计算总压缩权重：sum = a \* w1 + b \* w2 + c \* w3
- 计算每个元素压缩率：S1 = a \* w1 / sum，S2 =b \* w2 / sum，S3 =c \* w3 / sum
- 计算每个元素宽度：width - 压缩率 \* 溢出空间

## flex-basis

定义：指定了 flex 元素在主轴方向上的初始大小
flex-item 设置了 flex-basis 也不一定按照指定的大小初始化，会根据主轴是否还有剩余空间。当没有剩余空间，flex-basis 再大也没有用。
其他设置宽度的属性有：max-width，min-width，width。这些宽度设置是有优先级的。
优先级关系：max-width/min-width > flex-basis > width

来个 demo 看看：
[flex-basis 和其他宽度设置的优先级](./demo/flex-basis和其他宽度设置的优先级.html 'flex-basis和其他宽度设置的优先级')

## flex: 1

flex 属性是 flex-grow, flex-shrink, flex-basis; 的三个属性简写。默认值是 **0 1 auto**

**面试考点：_flex: 1_ 的概念** \

_flex: 1_ 其实就是 _flex-grow, flex-shrink, flex-basis;_ 的三个属性简写.
_flex: 1_ 相当于 _flex: 1 1 0%_ 我们上文中 **flex-grow - 应用场景** 中有提及作用。
