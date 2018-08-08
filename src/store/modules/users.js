import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	currentUser: ''
}

const mutations = {
	SET_USER (state, { email }) {
		console.log(`setting current user to ${email}`)
		state.currentUser = email
	}
// 	SET_LANGUAGES (state, { languages }) {
// 		const ids = languages.map(x => x.id)

// 		for (let id in ids) {
// 			if (!state.languageIds.includes(ids[id])) {
// 			state.languageIds.push(ids[id])
// 			}
// 		}

// 		for (let l in languages) {
// 			const language = languages[l]
// 			state.languages = {
// 				...state.languages, 
// 				[language.id]: {
// 					...state.languages[language.id], 
// 					...language
// 				},
// 			}
// 		}
// 	},
// 	UPDATE_LANGUAGE(state, { id, data }) {
// 		if (!state.languageIds.includes(id)) {
// 			state.languageIds.push(id)
// 		}
// 		state.languages = {...state.languages, [id]: {...data}}
// 	}
}

const actions = {
	registerUser({ commit }, user) {
		let { email, password } = user
		const query = gql`query RegisterUser($email: String!, $password: String! ) {
			registerUser(email: $email, password: $password){
				status {
					success
					message
				}
				email
    			uuid
			}
		}`
		
		const variables = {
			email,
			password
		}

		const response = apollo.query({ query, variables })
			.then( res => { 
				commit('SET_USER', { email })
				return res.data.registerUser 
			})
			.catch( err => console.log(err) )

		return response
	},
	loginUser({ commit }, user) {
		let { email, password } = user
		const query = gql`query LoginUser($email: String!, $password: String! ) {
			loginUser(email: $email, password: $password){
				status {
					success
					message
				}
				email
    			uuid
			}
		}`
		
		const variables = {
			email,
			password
		}

		const response = apollo.query({ query, variables })
			.then( res => {
				commit('SET_USER', { email })
				return res.data.loginUser
			})
			.catch( err => console.log(err) )

		return response
	},
	loginUserById({ commit }, id) {
		const query = gql`query LoginUserById($id: String!) {
			loginUserById(id: $id){
				status {
					success
					message
				}
				email
    			uuid
			}
		}`
		
		const variables = { id }

		const response = apollo.query({ query, variables })
			.then( res => {
				let email = res.data.loginUserById.email
				console.log(`res: ${JSON.stringify(res)}`)
				commit('SET_USER', { email })
				return res.data.loginUserById
			})
			.catch( err => console.log(err) )

		return response
	},
	logout({ commit }){
		commit('SET_USER', '')
	},
	setCookie({ commit }, cookieDetails){
		let { name, value, days } = cookieDetails
		let expires = ""
		if (days) {
			let date = new Date()
			date.setTime(date.getTime() + (days*24*60*60*1000))
			expires = "; expires=" + date.toUTCString()
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/"
	},
	getCookie({ commit }, name){
		let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  		return match ? match[2] : false
	},
	delCookie({ commit }, name){
		document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
	}
	
	// getLanguage({ commit }, id) {
	// 	console.time(`getLangById ${id}`)

	// 	const query = gql`
	// 		query GetLanguage($id: ID!) {
	// 			getLanguage(id: $id) {
	// 				id
	// 				name
	// 				frameworks {
	// 					name
	// 				}
	// 			}
	// 		}`
		
	// 	const variables = {
	// 		id: id
	// 	}

	// 	const response = apollo.query({
	// 		query, variables
	// 	})
	// 	.then((res) => {
	// 		commit('UPDATE_LANGUAGE', { id, data: res.data.getLanguage })
			
	// 		console.log(res.data.getLanguage)
	// 		console.timeEnd(`getLangById ${id}`)
	// 	})

	// }
}

export default {
	state,
	mutations,
	actions,
}