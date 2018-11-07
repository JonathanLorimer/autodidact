/**
 * @jest-environment jsdom
 */

// import Vue from 'vue'
// import Vuex from 'vuex'
// import VueRouter from 'vue-router'
// import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
// import App from '../src/App'
// import users from '../src/store/modules/users'
// import learningPath from '../src/store/modules/learningPath'

// import HeaderNav from '../src/components/HeaderNav.vue'

// Vue.use(Vuex)

// describe('Testing Users Store', () => {
// 	let cmp, vm, store, router
// 	beforeEach(() => {
// 		cmp = localVue.extend(App) // Create a copy of the original component
// 		cmp.component('header-nav', HeaderNav)
		
	
// 		store = new Vuex.Store({ modules: { users, learningPath } }) //Learning path required for App instantiation

// 		router = new VueRouter()

// 		vm = new cmp({
// 			store,
// 			router,
// 		}).$mount() // Instances and mounts the component

// 	})

// 	it('flipLoginSwitch', async () => {
// 		store.users.hotUpdate({
// 			mutations: { SET_LOGIN_SWITCH: jest.fn() }
// 		})
// 		const commit = jest.fn()
// 		await store.users.dispatch('flipLoginSwitch')

// 		expect(commit).toHaveBeenCalledWith('SET_LOGIN_SWITCH', true)
// 	})


// })

import Vue from 'vue'
import Vuex from 'vuex'
import users from '../src/store/modules/users'

Vue.use(Vuex)

describe('Testing Users Store Actions', () => {
	let mutationMock
	let actionMock
	let store

	beforeAll(() => {
		Object.defineProperty(global, 'document', {});
	})

	beforeEach(() => {
		mutationMock = jest.fn()
		actionMock = jest.fn()

		store = new Vuex.Store({
			state: { data: {} },
			mutations: {
				SET_LOGIN_SWITCH: mutationMock,
				SET_USER: mutationMock
			},
			actions: {
				flipLoginSwitch: users.actions.flipLoginSwitch,
				logout: users.actions.logout,
				clearLocalStorage: actionMock
			},
		})
	})

	it('flipLoginSwitch', async () => {	
		await store.dispatch('flipLoginSwitch')
		expect(mutationMock).toHaveBeenCalled()
	})

	it('logout', async () => {	
		await store.dispatch('logout')
		expect(mutationMock).toHaveBeenCalled()
		expect(actionMock).toHaveBeenCalled()
		expect(mutationMock.mock.calls[0][1]).toEqual({ email: '', id: '' })
	})
})

