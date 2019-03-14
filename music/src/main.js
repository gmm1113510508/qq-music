// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from './axios'
import store from './store'
Vue.prototype.$axios=Axios
//引入重置文件 vue 一切文件皆模块
import './common/style/resset.css'
Vue.config.productionTip = false
// 引入ui框架
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//图片懒加载
import LazyLoad from 'vue-lazyload'
Vue.use(LazyLoad,{
  loading: require('assets/logo.png'),//在js 中通过require 加载图片
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
