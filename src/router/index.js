import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Candidate = () => import('../views/Candidate.vue')
const Vote = () => import('../views/Vote.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/candidate',
    name: 'Candidate',
    component: Candidate
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote
  }
]

const router = new VueRouter({
  routes
})

export default router
