import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'; // 解决移动端300ms延迟
import moment from 'moment';
import Api from '@/utils/api'

import {axios_get, axios_post} from './utils/axios';

import router from './router/index';

Vue.config.productionTip = false;
Vue.prototype.$ajaxGet = axios_get;
Vue.prototype.$ajaxPost = axios_post;
Vue.prototype.$moment = moment;
Vue.prototype.$API = Api;

// 移动端浏览器在派发点击事件的时候，解决 300ms左右的延迟问题
FastClick.attach(document.body);

// 解决使用FastClick 时，输入框在ios上点击输入调取手机自带输入键盘不灵敏，有时候甚至点不出来的问题
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
