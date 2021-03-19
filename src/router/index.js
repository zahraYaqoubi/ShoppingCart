import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/selectAddress',
    name: 'SelectAddress',
    component: () => import(/* webpackChunkName: "select address" */ '../views/SelectAddress.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "select address" */ '../views/Payment.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
