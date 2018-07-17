import Vue from 'vue'
import VueRouter from 'vue-router'
import LanguageContainer from './components/LanguageContainer.vue'

Vue.use(VueRouter)

const routes = [
    {
      name: 'language-container',
      path: '/:id',
      component: LanguageContainer,
    }
  ]
  
export default new VueRouter({
	routes
})