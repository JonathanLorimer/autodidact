import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	userLearningPaths: [],
	nonUserProjects: [],
	userProjects: [],
	firstLoad: false,
}

const mutations = {
	SET_USER_PATHS (state, { lps }) {
		state.userLearningPaths = lps
	},
	SET_ALL_PROJECTS (state, { projects, currentUserId }) {
		const projectsObj = projects.reduce((acc, cur) => {
			if (cur.userId === currentUserId) acc.u.push(cur)
			else acc.nu.push(cur)
			return acc
		}, {u: [], nu: []})
		state.nonUserProjects = projectsObj.nu
		state.userProjects = projectsObj.u
	},
	FLIP_FIRST_LOAD_FLAG (state){
		state.firstLoad = !state.firstLoad
	}
}

const actions = {
	setUsersLearningPaths({ commit }, lps){
		commit('SET_USER_PATHS', { lps })
	},
	getAllProjects({ commit}, currentUserId){
		const query = gql`query getAllProjects {
			getAllProjects {
				userId
				username
				name
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
		}`
		
		const variables = {}

		const response = apollo.query({ query })
			.then( res => {
				commit('SET_ALL_PROJECTS', { projects: res.data.getAllProjects, currentUserId })
				return true
			})
			.catch( err => console.log(err) )

		return response
	},
	flipFirstLoadFlag({ commit }){
		commit('FLIP_FIRST_LOAD_FLAG')
	}
}

export default {
	state,
	mutations,
	actions,
}