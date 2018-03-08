// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Utils from './lib/utils'
import vuexI18n from 'vuex-i18n';

Vue.use(ElementUI)
Vue.use(Utils)
Vue.use(vuexI18n)
Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/timg.gif',
  loading: './assets/timg.gif',
  attempt: 1
})

import './assets/css/app.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
