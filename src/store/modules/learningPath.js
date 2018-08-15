import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	learningPath: {id: 'root', nodes:[]},
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
	// setCookie({ commit }, cookieDetails){
	// 	let { name, value, days } = cookieDetails
	// 	let expires = ""
	// 	if (days) {
	// 		let date = new Date()
	// 		date.setTime(date.getTime() + (days*24*60*60*1000))
	// 		expires = "; expires=" + date.toUTCString()
	// 	}
	// 	document.cookie = name + "=" + (value || "")  + expires + "; path=/"
	// },
	// getCookie({ commit }, name){
	// 	let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  	// 	return match ? match[2] : false
	// }
}

export default {
	state,
	mutations,
	actions,
}