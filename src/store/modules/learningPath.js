import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	learningPath: {},
	learningMaterials: {}
}

const mutations = {
	ADD_MATERIAL (state, { material }) {
		state.learningMaterials[material.id] = material
	},
	ADD_MATERIAL_TO_PATH (state, { material }){
		const traverse = (obj, acc = []) => {
			acc.unshift(obj)
			if (!obj.preReq.name) return acc
			else {
				return traverse(obj.preReq, acc)
			}
		}
		const insert = (state, array) => {
			let pointer = state
			array.forEach(e => {
				if(!pointer[e]) pointer[e] = {}
				pointer = pointer[e]
			})
			return state
		}
		const f = traverse(material).map(e => e.id)

		state.learningPath = insert(state.learningPath, f)
	}

}

const actions = {
	addMaterial({ commit }, material){
		commit('ADD_MATERIAL_TO_PATH', { material })
		commit('ADD_MATERIAL', { material })
	}
}

export default {
	state,
	mutations,
	actions,
}