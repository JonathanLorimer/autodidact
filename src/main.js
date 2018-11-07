import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'

// Apollo client side, to be attached to the vue objects to expose apollo methods globally
if (process.env.NODE_ENV !== 'test'){
  import apollo from './apolloClient'
}

// Components
import LandingPage from './components/LandingPage.vue'
import HeaderNav from './components/HeaderNav.vue'
import Login from './components/Login.vue'
import Create from './components/Create.vue'
import CreateForm from './components/CreateForm.vue'
import EditForm from './components/EditForm.vue'
import LearningPathForm from './components/LearningPathForm.vue'
import ViewProj from './components/ViewProj.vue'
import TreeStruct from './components/TreeStruct.vue'


//needed for Vuex in browsers that do not natively support promises
import 'es6-promise/auto'


Vue.config.productionTip = false
Vue.prototype.$apollo = apollo

Vue.component('landing-page', LandingPage)
Vue.component('header-nav', HeaderNav)
Vue.component('login', Login)
Vue.component('create', Create)
Vue.component('create-form', CreateForm)
Vue.component('edit-form', EditForm)
Vue.component('learning-path-form', LearningPathForm)
Vue.component('view-proj', ViewProj)
Vue.component('tree-struct', TreeStruct)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
