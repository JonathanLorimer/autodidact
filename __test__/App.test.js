import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import App from '../src/App'
import LandingPage from '../src/components/LandingPage.vue'
import HeaderNav from '../src/components/HeaderNav.vue'
import Login from '../src/components/Login.vue'
import Create from '../src/components/Create.vue'
import CreateForm from '../src/components/CreateForm.vue'
import EditForm from '../src/components/EditForm.vue'
import LearningPathForm from '../src/components/LearningPathForm.vue'
import ViewProj from '../src/components/ViewProj.vue'
import TreeStruct from '../src/components/TreeStruct.vue'

// cmp.component('login', Login)
// cmp.component('create', Create)
// cmp.component('create-form', CreateForm)
// cmp.component('edit-form', EditForm)
// cmp.component('learning-path-form', LearningPathForm)
// cmp.component('view-proj', ViewProj)
// cmp.component('tree-struct', TreeStruct)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Testing App.vue, LandingPage.vue, HeaderNav.vue', () => {
	let cmp, vm, actions, state, store, router
	beforeEach(() => {
		cmp = localVue.extend(App) // Create a copy of the original component
		cmp.component('landing-page', LandingPage) //Register components
		cmp.component('header-nav', HeaderNav)

		state = {
			users: {
				currentUser: false,
				loginSwitch: false
			}
		}
	
		actions = {
			flipLoginSwitch: jest.fn(),
			logout: jest.fn(),
			delCookie: jest.fn(),
			getCookie: jest.fn(),
			clearLocalStorage: jest.fn()
		}
	
		store = new Vuex.Store({
			state,
			actions
		})
		
		router = new VueRouter()

		vm = new cmp({
			store,
			router,
		}).$mount() // Instances and mounts the component
	})
	
	it('Landing Page should mount and render correctly (snapshot test)', () => {
		const wrapper = mount(LandingPage)
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('Header Nav: Login button should call flipLoginSwitch ', () => {
		const wrapper = shallowMount(HeaderNav, { store, router, localVue })
		wrapper.find('.link.login').trigger('click')
		expect(actions.flipLoginSwitch).toBeCalled()
	})

	it('Header Nav: Logout button should call logout and delCookie ', () => {
		const wrapper = shallowMount(HeaderNav, { store, router, localVue })
		store.state.users.currentUser = true

		wrapper.find('.link.logout').trigger('click')
		expect(actions.logout).toBeCalled()
		expect(actions.delCookie.mock.calls).toHaveLength(1)
    	expect(actions.delCookie.mock.calls[0][1]).toEqual('userCookie')
	})

	it('Header Nav: should mount and render correctly (snapshot test)', () => {
		const wrapper = shallowMount(HeaderNav, { store, router, localVue })
		expect(wrapper.html()).toMatchSnapshot()
	})

	it('Header Nav: should mount and render correctly when user is logged in (snapshot test)', () => {
		const wrapper = shallowMount(HeaderNav, { store, router, localVue })
		store.state.users.currentUser = "testUser@hotmail.com"

		expect(wrapper.find('.link.user').text()).toBe('testUser@hotmail.com')
		expect(wrapper.html()).toMatchSnapshot()
	})

})