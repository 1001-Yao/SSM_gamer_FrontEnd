import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import YGQ from "@/views/YGQ.vue";
import Home from "@/views/Home.vue";

/**
 * index.js是用来配置路由
 * “/”路径 《=》 当访问http://localhost:port/就路由到 HomeView组件，
 * 就会把HomeView组件的内容，返回到给  <router-view/>
 *
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/ygq',
    name:'ygq - page',
    component: YGQ
  },
  {
    path: '/home',
    name:'管理页面',
    component: HomeView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
