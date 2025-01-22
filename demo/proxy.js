function observerProxy(obj) {
  let handler = {
    get(target, key, receiver) {
      console.log('获取：' + key);
      // 如果是对象，就递归添加 proxy 拦截
      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], handler);
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(key + '-数据改变了');
      return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
      console.log('删除:', key)
    }
  };
  return new Proxy(obj, handler);
}

let obj = {
  name: '守候',
  flag: {
    book: {
      name: 'js',
      page: 325,
    },
    interest: ['火锅', '旅游'],
  },
};

let objProxy = observerProxy(obj);

// 新增监听
// objProxy.age = 18;

// 删除监听
// delete objProxy.name

// 新增
// objProxy.flag.interest.push('老铁')
