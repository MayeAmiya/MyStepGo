// router.ts
import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router'
import Start from './components/start.vue'
import Desktop from './components/desktop.vue'
import Login from './components/user/login.vue'
import Register from './components/user/register.vue'
import Connect from './components/user/connect.vue'
import Home from './components/user/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/start/home' // 设置初始路由为 /start
  },
  {
    path: '/start',
    name: 'Start',
    component: Start,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'connect',
        name: 'Connect',
        component: Connect
      }
    ]
  },
  {
    path: '/desktop',
    name: 'Desktop',
    component: Desktop
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export { router }
