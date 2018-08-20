import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	learningPath: {id: 'root', nodes:[]},
	learningMaterials: {},
	editSwitch: false,
	currentPathId: '',
	currentPathName: '',
	editing: {}
}

const mutations = {
	ADD_MATERIAL (state, { material }) {
		state.learningMaterials[material.id] = material
	},
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
	UPDATE_MATERIAL(state, {material}){
		state.learningMaterials[material.id] = material
	},
	UPDATE_LEARNING_PATH(state, {material}){
		if (material.preReq.id !== state.learningMaterials[material.id].preReq.id){

		}
	},
	SET_STATE(state, { materials, path, currentId, currentName }){
		state.learningMaterials = materials
		state.learningPath = path
		state.currentPathId = currentId
		state.currentPathName = currentName
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
	},
	SET_CURRENT_PATH (state, { id, name }) {
		state.currentPathId = id
		state.currentPathName = name
	}
}

const actions = {
	addMaterial({ commit }, material){
		let id = material.id
		let preReq = material.preReq.id || 'root'
		commit('ADD_MATERIAL_TO_PATH', { preReq, id  })
		commit('ADD_MATERIAL', { material })
		window.localStorage.setItem('learningPath', JSON.stringify(state.learningPath))
		window.localStorage.setItem('learningMaterials', JSON.stringify(state.learningMaterials))
	},
	deleteMaterial({ commit }, id){
		commit('REMOVE_MATERIAL', { id })
		commit('REMOVE_FROM_LEARNING_PATH', { id })
		window.localStorage.setItem('learningPath', JSON.stringify(state.learningPath))
		window.localStorage.setItem('learningMaterials', JSON.stringify(state.learningMaterials))
	},
	editMaterial({commit}, material){
		if (material.preReq.id !== state.learningMaterials[material.id].preReq.id){
			commit('REMOVE_FROM_LEARNING_PATH', { id: material.id })
			commit('ADD_MATERIAL_TO_PATH', { preReq: material.preReq.id || 'root', id: material.id  })
		}
		commit('UPDATE_MATERIAL', { material })
	},
	setStateFromLocalStorage({ commit }){
		commit('SET_STATE', { 
			materials: JSON.parse(localStorage.getItem('learningMaterials')), 
			path: JSON.parse(localStorage.getItem('learningPath')),
			currentId: localStorage.getItem('currentPathId'),
			currentName: localStorage.getItem('currentPathName')
		})
	},
	clearLocalStorage(){
		window.localStorage.removeItem("learningPath");
		window.localStorage.removeItem("learningMaterials");
		window.localStorage.removeItem("currentPathName");
		window.localStorage.removeItem("currentPathId");
	},
	flipEditSwitch({ commit }, id = false){
		commit('SET_EDIT_SWITCH')
		if (id) commit('SET_EDITED', { id })
	},
	saveLearningPath({ commit }, { userId, name }) {
		let learningMaterials = Object.values(state.learningMaterials)
		const mutation = gql`mutation RegisterLearningPath($input: LearningPathInput!, $userId: String!, $name: String! ) {
			registerLearningPath(input: $input, userId: $userId, name: $name){
				status {
					success
					message
				}
    			id
			}
		}`
		
		const variables = {
			input: {learningPath: state.learningPath, learningMaterials},
			userId,
			name
		}

		const response = apollo.mutate({ mutation, variables })
			.then( res => {
				if ( res.data.registerLearningPath.status.success ) {
					commit('UPDATE_USER_PATHS', { id: res.data.registerLearningPath.id })
					commit('SET_CURRENT_PATH', { id: res.data.registerLearningPath.id, name })
					window.localStorage.setItem('currentPathName', name)
					window.localStorage.setItem('currentPathId', res.data.registerLearningPath.id)
			}
				return res.data.registerUser
			})
			.catch( err => console.log(err) )

		return response
	},
}

export default {
	state,
	mutations,
	actions,
}