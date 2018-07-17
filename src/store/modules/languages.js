import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	languageIds: [],
	languages: {}
}

const mutations = {
	SET_LANGUAGES (state, { languages }) {
		const ids = languages.map(x => x.id)

		for (let id in ids) {
			if (!state.languageIds.includes(ids[id])) {
			state.languageIds.push(ids[id])
			}
		}

		for (let l in languages) {
			const language = languages[l]
			state.languages = {
				...state.languages, 
				[language.id]: {
					...state.languages[language.id], 
					...language
				},
			}
		}
	},
	UPDATE_LANGUAGE(state, { id, data }) {
		if (!state.languageIds.includes(id)) {
			state.languageIds.push(id)
		}
		state.languages = {...state.languages, [id]: {...data}}
	}
}

const actions = {
	getLanguages({ commit }) {
		console.time('getLanguages')

		const response = apollo.query({
			query: gql`
			query Languages {
				languages {
					id
					name
				}
			}
			`
		})
		.then((res) => {
			const { languages } = res.data
			commit('SET_LANGUAGES', { languages })
	
			console.timeEnd('getLanguages')
		})

	},
	getLanguage({ commit }, id) {
		console.time(`getLangById ${id}`)

		const query = gql`
			query GetLanguage($id: ID!) {
				getLanguage(id: $id) {
					id
					name
					frameworks {
						name
					}
				}
			}`
		
		const variables = {
			id: id
		}

		const response = apollo.query({
			query, variables
		})
		.then((res) => {
			commit('UPDATE_LANGUAGE', { id, data: res.data.getLanguage })
			
			console.log(res.data.getLanguage)
			console.timeEnd(`getLangById ${id}`)
		})

	}
}

export default {
	state,
	mutations,
	actions,
}