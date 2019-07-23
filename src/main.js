// 导入顶级vue
import Vue from 'vue';
import { Message, MessageBox} from 'element-ui';

// 导入app.vue
import App from './App.vue';
Vue.config.productionTip = false;
// 导入ruoter.js
import router from './router.js';
// 全局样式
import './assets/less/base.less'
// 导入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入请求
import { getHttp, postHttp,target } from './request/http';
Vue.prototype.$get=getHttp;
Vue.prototype.$post=postHttp;
Vue.prototype.$target=target;
// 富文本
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.prototype.$message = Message;
Vue.use(VueQuillEditor)
// 头部公共组件
import myHeader from './components/header.vue';
Vue.component('my-header', myHeader)

// 过滤器
import * as filters from './filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})