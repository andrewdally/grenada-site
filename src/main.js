import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Axios from 'axios'
import { createProvider } from './vue-apollo'

Vue.prototype.$http = Axios;

Vue.config.productionTip = false

new Vue({
  router: router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
