// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import Vue from 'vue';
import App from 'components/App';

import heyuiConfig from 'js/config/heyui-config';
import { router } from 'js/config/router-config';
import store from 'js/vuex/store';
import Uploader from 'vue-simple-uploader';
import 'js/vue/components';
import 'js/vue/filters';
import './css/nnyun/iconfont.css';

require('./css/app.less');

// 开发环境判断
// process.env.NODE_ENV == 'development'

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

heyuiConfig();
Vue.use(HeyUI);
Vue.use(Uploader);
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
