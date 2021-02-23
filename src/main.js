import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Scroller from '@/components/Scroller'

import axios from 'axios'

import Loader from '@/components/Loading'
Vue.prototype.axios = axios

Vue.filter('filterImgUrl', (data) => {
  return data.replace('w.h', '128.180') + '@1l_1e_1c_128w_180h'
})
Vue.component('Scroller', Scroller)
Vue.component('Loader', Loader)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
