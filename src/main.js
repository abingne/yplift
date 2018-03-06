// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Utils from './lib/utils'

import vuexI18n from 'vuex-i18n';

Vue.use(ElementUI)
// Vue.use(MintUI)
Vue.use(Utils)

Vue.use(vuexI18n)
import './assets/css/app.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // vux,
  components: { App },
  template: '<App/>'
})
