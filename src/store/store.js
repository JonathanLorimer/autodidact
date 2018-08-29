import Vue from 'vue'
import Vuex from 'vuex'

// Import Modules Here
import users from './modules/users'
import learningPath from './modules/learningPath'
import projects from './modules/projects'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		users,
		learningPath,
		projects
	}
})