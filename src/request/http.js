
import Vue from 'vue';
// 导入axios
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

let baseUrl = 'http://192.168.100.3:8088';
// let baseUrl = 'http://192.168.100.3:8080'; //测试用

// if (process.env.NODE_ENV == 'development') {
//     baseUrl = '/api';

// } else if (process.env.NODE_ENV == 'production') {
//     //baseUrl = '测试地址';
//     //baseUrl = '预发布地址';
//     baseUrl = '生产地址';
// }

axios.defaults.baseURL = baseUrl;//设置默认接口地址
axios.defaults.timeout = 10000

// 请求头信息是为post请求设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    // 请求之前设置token
    config.headers.token = window.localStorage.getItem('token')
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// 响应拦截器
axios.interceptors.response.use(response => {
  var code = parseInt(response.data.code)
  if (code === 603) {
    Message({
      type:'error',
      message:'token失效，请重新登录',
      duration:1000
    })
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }
  if (!localStorage.getItem('token')) {
    // 页面跳转
    router.push('/login')
    // Message.error('请登录')
  }
  return response;
}, error => {
  return Promise.reject(error);
});

// get方法
export function getHttp(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(res => {
        var code = parseInt(res.data.code)
        if (code === 200) {
          resolve(res.data)
        }else{
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

// post方法
export function postHttp(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        var code = parseInt(res.data.code)
        if (code === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

// 表格导出
export function target(api, name) {
  return new Promise((resolve, reject) => {
  let execlName = name + '.xlsx';
  const token = localStorage.getItem('token');
  var downloadUrl = baseUrl + api;
  axios({
    url: downloadUrl, // 接口名字
    method: 'get',
    params: {
      token: token
    },
    responseType: 'blob'
  }).then(function (response) {
    const blob = new Blob([response.data], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    });
    const aEle = document.createElement('a'); // 创建a标签
    const href = window.URL.createObjectURL(blob); // 创建下载的链接
    aEle.href = href;
    aEle.download = execlName; // 下载后文件名
    document.body.appendChild(aEle);
    aEle.click(); // 点击下载
    document.body.removeChild(aEle); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  });
})
}