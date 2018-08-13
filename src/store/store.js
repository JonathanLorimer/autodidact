import Vue from 'vue'
import Vuex from 'vuex'

// Import Modules Here
import users from './modules/users'
import learningPath from './modules/learningPath'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		users,
		learningPath
	}
})