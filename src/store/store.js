import Vue from 'vue'
import Vuex from 'vuex'

// Import Modules Here
import languages from './modules/languages'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		languages,
		users
	}
})