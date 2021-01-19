// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import http from "@/utils/http"
Vue.config.productionTip = false
Vue.prototype.$http = http.axios
Vue.prototype.$upload = http.upload

// 设置域名
Vue.prototype.$domain = "http://localhost:3000"
// 使用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
