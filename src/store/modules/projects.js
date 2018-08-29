import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	learningPaths: [],
}

const mutations = {
	SET_PATHS (state, { lps }) {
		state.learningPaths = lps
	}
}

const actions = {
	setUsersLearningPaths({ commit }, lps){
		commit('SET_PATHS', { lps })
	}
}

export default {
	state,
	mutations,
	actions,
}