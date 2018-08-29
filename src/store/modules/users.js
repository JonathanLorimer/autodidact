import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	currentUser: '',
	currentUserId: '',
	loginSwitch: false
}

const mutations = {
	SET_USER (state, { email, id }) {
		state.currentUser = email
		state.currentUserId = id
	},
	SET_LOGIN_SWITCH (state) {
		state.loginSwitch = !state.loginSwitch
	}
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
				if ( res.data.registerUser.status.success ) commit('SET_USER', { email, id: res.data.registerUser.uuid })
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
				learningPaths {
					learningPath {
						id
						nodes {
							id
							nodes {
								id
								nodes {
									id
									nodes {
										id 
										nodes {
											id
										}
									}
								}
							}
						}
					}
					learningMaterials {
						id
						name
						type
						link
						preReq {
							id
							name
							type
							link
						}
					}
				}
			}
		}`
		
		const variables = {
			email,
			password
		}

		const response = apollo.query({ query, variables })
			.then( res => {
				if ( res.data.loginUser.status.success ) commit('SET_USER', { email, id: res.data.loginUser.uuid })
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
				learningPaths {
					learningPath {
						id
						nodes {
							id
							nodes {
								id
								nodes {
									id
									nodes {
										id 
										nodes {
											id
										}
									}
								}
							}
						}
					}
					learningMaterials {
						id
						name
						type
						link
						preReq {
							id
							name
							type
							link
						}
					}
				}
			}
		}`
		
		const variables = { id }

		const response = apollo.query({ query, variables })
			.then( res => {
				let email = res.data.loginUserById.email
				if ( res.data.loginUserById.status.success ) commit('SET_USER', { email, id: res.data.loginUserById.uuid })
				return res.data.loginUserById
			})
			.catch( err => console.log(err) )

		return response
	},
	logout({ commit, dispatch }){
		commit('SET_USER',{ email: '', id: '' })
		dispatch('clearLocalStorage')
	},
	setCookie({ commit }, cookieDetails){
		console.log()
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
	},
	flipLoginSwitch({ commit }){
		commit('SET_LOGIN_SWITCH')
	}
}

export default {
	state,
	mutations,
	actions,
}