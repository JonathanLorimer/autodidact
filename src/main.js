import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'

// Apollo client side, to be attached to the vue objects to expose apollo methods globally
import apollo from './apolloClient'

// Components
import HelloWorld from './components/HelloWorld.vue'
import LanguageContainer from './components/LanguageContainer.vue'

//needed for Vuex in browsers that do not natively support promises
import 'es6-promise/auto'


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
