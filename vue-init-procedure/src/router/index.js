/**
 * VueRouter
 * @type {*[]}
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout'
import my from '../views/my'
import login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [{ path: '/my', component: my }]
  },
  {
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
