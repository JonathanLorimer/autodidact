import Vue from 'vue'
import Vuex from 'vuex'

// Import Modules Here
import languages from './mock_modules/mock_languages'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		languages
	}
})