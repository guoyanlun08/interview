# HTTP 网络

## 跨域问题

一个请求 url 的 <font color=#FF000 >协议、域名、端口</font> 三者之间的任意一个与当前页面 url 不同即为跨域。(三者相同则为 **同源策略**，浏览器有同源策略的限制)

解决方案：

- 前端使用 **whistle** 代理来绕过浏览器这层的限制，如果服务器有限制，whistle 也无法解决跨域问题.
- **JSONP** 利用 script 标签的 src 属性来实现跨域数据交互（不受跨域限制）, 服务器直接返回一段 JS 代码的函数调用，将服务器数据放在函数实参中，前端提前写好响应的函数准备回调，接收数据，实现跨域数据交互。

```js
// 前端处理
<script>
  function callfun(data) {
    document.getElementById('qwerty').innerHTML = data;
  }
</script>
<script src="http://127.0.0.1:10010/js?call=callfun"></script>

// 后端处理
ctx.body = ctx.query.call + '("nihao")';
```

- **CORS**: 主要是在服务端进行操作。
  客户端：发送 http 请求，浏览器会添加 origin 请求头，值为当前发起请求的域名。
  服务端：服务器需要加入 **Access-Control-Allow-Origin** 响应头，指明可以共享数据的域。如：`Access-Control-Allow-Origin: http://localhost`.
  若设置为 `Access-Control-Allow-Origin: *` 则表示可与任意域进行数据共享。
  跨域请求有分两种 ==_简单请求_、_复杂请求_==
  同时满足以下两大条件，就属于简单请求：

  1. 请求方法是以下三种方法之一：HEAD, GET, POST
  2. HTTP 的头信息不超出以下几种字段：

  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

  刚讲述设置 `Access-Control-Allow-Origin` 可以解决跨域问题，只适用于简单请求。
  复杂请求，浏览器还会先发送 OPTIONS 请求以取得服务器的确认。如：随意添加一个请求头，服务器没有额外的设置 `Access-Control-Allow-Headers` 。浏览器会做跨域拦截，得不到服务器的确认，浏览器不会发出正式请求（真正的请求不会发起到服务器）。
