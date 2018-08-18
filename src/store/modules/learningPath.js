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
	// ADD_MATERIAL_TO_PATH (state, { material }){
	// 	const traverse = (obj, acc = []) => {
	// 		acc.unshift(obj)
	// 		if (!obj.preReq.name) return acc
	// 		else {
	// 			return traverse(obj.preReq, acc)
	// 		}
	// 	}
	// 	const insert = (state, array) => {
	// 		let pointer = state
	// 		array.forEach(x => {
	// 			let n = pointer.nodes
	// 			let elem = n.find(y => y.id === x)
	// 			elem ? 
	// 			pointer = n[n.indexOf(elem)] :
	// 			n.push({ id: x, nodes: [] })
	// 		})
	// 		return state
	// 	}
	// 	const f = traverse(material).map(e => e.id)
	
	// 	state.learningPath = insert(state.learningPath, f)
	// },
	ADD_MATERIAL_TO_PATH (state, { preReq, id }){
		if (preReq === 'root'){
			state.learningPath.nodes.push({id, nodes: []})
			return
		}
		const trav = (state, pid, id) => {
			let n = state.nodes
			let f = n.find(e => e.id === pid)
			if (f) {
				f.nodes.push({id, nodes: []})
				return state
			}
			n.forEach(e => {
				trav(e, pid, id)
			})
			return state
		}
	
		state.learningPath = trav(state.learningPath, preReq, id)
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
	},
	REMOVE_MATERIAL(state, { id }){
		let newPreReq = state.learningMaterials[id].preReq

		for (let m in state.learningMaterials ){
			if(state.learningMaterials[m].preReq.id === id) state.learningMaterials[m].preReq = newPreReq
		}
		
		delete state.learningMaterials[id]
	},
	REMOVE_FROM_LEARNING_PATH(state, { id }){
		const remove = (state, id) => {
			let n = state.nodes
		
			n.every(e => e.id !== id) ?
			n.forEach(e => remove(e, id)) :
			n.forEach((e, i) => {
				if (e.id === id){
					n.splice(i, 1)[0].nodes.forEach(e => {
						n.push(e)
					})
				}
			})
		
			return state
		}

		state.learningPath = remove(state.learningPath, id)
	}
}

const actions = {
	addMaterial({ commit }, material){
		let id = material.id
		let preReq = material.preReq.id || 'root'
		commit('ADD_MATERIAL_TO_PATH', { preReq, id  })
		commit('ADD_MATERIAL', { material })
		localStorage.setItem('learningPath', JSON.stringify(state.learningPath))
		localStorage.setItem('learningMaterials', JSON.stringify(state.learningMaterials))
	},
	deleteMaterial({ commit }, id){
		commit('REMOVE_MATERIAL', { id })
		commit('REMOVE_FROM_LEARNING_PATH', { id })
		window.localStorage.setItem('learningPath', JSON.stringify(state.learningPath))
		window.localStorage.setItem('learningMaterials', JSON.stringify(state.learningMaterials))
	},
	setStateFromLocalStorage({ commit }){
		commit('SET_STATE', { materials: JSON.parse(localStorage.getItem('learningMaterials')), path: JSON.parse(localStorage.getItem('learningPath')) })
	},
	clearLocalStorage({ commit }){
		window.localStorage.removeItem("learningPath");
		window.localStorage.removeItem("learningMaterials");
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