function observer(obj) {
  if (typeof obj === 'object') {
    for (let key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, value) {
  //针对value是对象，递归检测
  observer(value);
  //劫持对象的key
  Object.defineProperty(obj, key, {
    get() {
      console.log('获取：' + key);
      return value;
    },
    set(val) {
      //针对所设置的val是对象
      observer(val);
      console.log(key + '-数据改变了');
      value = val;
    },
  });
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

observer(obj);

// 新增删除监听不到
// delete obj.name;
// obj.age = 18;

// 数组新增监听不到
// obj.flag.interest.push('111')
