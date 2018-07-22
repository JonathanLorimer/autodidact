import Vue from 'vue'
import { mount } from '@vue/test-utils'
import App from '../src/App'
import store from '../src/store/__mocks__/mock_store'
import router from '../src/router'
import HelloWorld from '../src/components/HelloWorld.vue'

describe('App.test.js', () => {
  let cmp, vm
  beforeEach(() => {
    cmp = Vue.extend(App) // Create a copy of the original component
    cmp.component('hello-world', HelloWorld) //Register components

    vm = new cmp({
      store,
      router,
      data: { // Replace data value with this fake data
        msg: 'Cat'
      }
    }).$mount() // Instances and mounts the component
  })

  it('equals messages to "Cat"', () => {
    expect(vm.msg).toEqual('Cat')
  })

})
