import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Scroller from '@/components/Scroller'

import axios from 'axios'

import Loader from '@/components/Loading'
Vue.prototype.axios = axios

Vue.filter('filterImgUrl', (url, wh) => {
  return url.replace('w.h/', '').replace('@2500w_2500h_1l_0e', '') + wh
})
Vue.component('Scroller', Scroller)
Vue.component('Loader', Loader)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
