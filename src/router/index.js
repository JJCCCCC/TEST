import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/ketang',
    name: 'Ketang',
    component: () => import( /* webpackChunkName: "about" */ '../views/Ketang.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/huodong',
    name: 'Huodong',
    component: () => import( /* webpackChunkName: "about" */ '../views/huodong.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/shoucang',
    name: 'Shoucang',
    component: () => import( /* webpackChunkName: "about" */ '../views/Shoucang.vue')
  },
  {
    path: '/wode',
    name: 'Wode',
    component: () => import( /* webpackChunkName: "about" */ '../views/Wode.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("login")) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import( /* webpackChunkName: "about" */ '../pages/information.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/noteInformation',
    name: 'noteInformation',
    component: () => import( /* webpackChunkName: "about" */ '../pages/noteInformation.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/findInfo',
    name: 'findInfo',
    component: () => import( /* webpackChunkName: "about" */ '../pages/findInfo.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/classfition_list',
    name: 'classfitionList',
    component: () => import( /* webpackChunkName: "about" */ '../pages/classfition_list.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
]


const router = new VueRouter({
  routes
})
export default router