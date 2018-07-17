import Vue from 'vue'
import Vuex from 'vuex'

// Import Modules Here
import languages from './modules/languages'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		languages
	}
})