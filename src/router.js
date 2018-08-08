import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from './components/Create.vue'
import Login from './components/Login.vue'
import ViewProj from './components/ViewProj.vue'
import LandingPage from './components/LandingPage.vue'

Vue.use(VueRouter)

const routes = [
    {
      // name: 'landing-page',
      path: '/',
      component: LandingPage,
    },
    {
      // name: 'create',
      path: '/create',
      component: Create,
    },
    {
      // name: 'view',
      path: '/view-proj',
      component: ViewProj,
    },
    {
      // name: 'login',
      path: '/login',
      component: Login,
    }
  ]
  
export default new VueRouter({
	routes
})