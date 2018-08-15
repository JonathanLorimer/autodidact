import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	learningPath: {id: 'root', nodes:[]},
	learningMaterials: {},
	editSwitch: false,
	editing: {}
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
			array.forEach(x => {
				let n = pointer.nodes
				let elem = n.find(y => y.id === x)
				elem ? 
				pointer = n[n.indexOf(elem)] :
				n.push({ id: x, nodes: [] })
			})
			return state
		}
		const f = traverse(material).map(e => e.id)
	
		state.learningPath = insert(state.learningPath, f)
	},
	SET_STATE(state, { materials, path }){
		state.learningMaterials = materials
		state.learningPath = path
	},
	SET_EDIT_SWITCH(state){
		state.editSwitch = !state.editSwitch
	},
	SET_EDITED(state, { id }){
		state.editing = state.learningMaterials[id]
	}

}

const actions = {
	addMaterial({ commit }, material){
		commit('ADD_MATERIAL_TO_PATH', { material })
		commit('ADD_MATERIAL', { material })
		this.dispatch('setCookie', {
			name: 'materialCookie',
			value: JSON.stringify({materials: state.learningMaterials, path: state.learningPath}),
			days: 1
		})
	},
	setStateFromCookie({ commit }, value){
		commit('SET_STATE', JSON.parse(value))
	},
	flipEditSwitch({ commit }, id = false){
		commit('SET_EDIT_SWITCH')
		if (id) commit('SET_EDITED', { id })
	}
}

export default {
	state,
	mutations,
	actions,
}