import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'


import apollo from './apolloClient'


import HelloWorld from './components/HelloWorld.vue'
import LanguageContainer from './components/LanguageContainer.vue'

import 'es6-promise/auto' //needed for Vuex in browsers that do not natively support promises


Vue.config.productionTip = false
Vue.prototype.$apollo = apollo

Vue.component('hello-world', HelloWorld)
Vue.component('language-container', LanguageContainer)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
