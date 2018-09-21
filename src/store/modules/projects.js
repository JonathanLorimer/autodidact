import gql from 'graphql-tag'
import apollo from '../../apolloClient'

const state = {
	userLearningPaths: [],
	nonUserProjects: [],
	nonUserPathsFlag: false,
}

const mutations = {
	SET_USER_PATHS (state, { lps }) {
		state.userLearningPaths = lps
	},
	SET_NON_USER_PROJECTS (state, { projects }) {
		state.nonUserProjects = projects
	},
	FLIP_NON_USER_FLAG (state){
		state.nonUserPathsFlag = !state.nonUserPathsFlag
	}
}

const actions = {
	setUsersLearningPaths({ commit }, lps){
		commit('SET_USER_PATHS', { lps })
	},
	getNonUserProjects({ commit }){
		const query = gql`query GetNonUserProjects {
			getNonUserProjects {
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
				commit('SET_NON_USER_PROJECTS', { projects: res.getNonUserProjects })
				return true
			})
			.catch( err => console.log(err) )

		return response
	},
	flipNonUserFlag({ commit }){
		commit('FLIP_NON_USER_FLAG')
	}
}

export default {
	state,
	mutations,
	actions,
}