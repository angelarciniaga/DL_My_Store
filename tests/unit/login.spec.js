import { shallowMount, createLocalVue } from '@vue/test-utils'

import Login from '@/views/Login.vue'
import VueRouter from 'vue-router'
import myRoutes from "./mocks/routes"

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter(myRoutes)

describe('Prueba de Login.vue', () => {

  it('Muestra error si las credenciales son falsas', () => {

    const wrapper = shallowMount(Login, {
      data: {
        credenciales: {
          email: '',
          password: ''
        },
        formHasErrors: false
      }
    })
    let e = { preventDefault: () =>{} }
    wrapper.vm.login(e)
    expect(wrapper.vm.$data.formHasErrors).toBe(true)
  }),
  it('Prueba si redirecciona al /Home si el registro es exitoso', () => {

    const wrapper = shallowMount(Login, {
      localVue,
      router
    })
    wrapper.setData({
      credenciales: {
        email: 'user2@mystore.com',
        password: 'password'
      }
    })
    let e = { preventDefault: () =>{} }
    wrapper.vm.login(e)
    expect(wrapper.vm.$data.formHasErrors).toBe(true)
    expect(wrapper.vm.$route.path).toEqual('/')
  })
})
