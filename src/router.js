import Vue from 'vue'
import Router from 'vue-router'
// 引入定义好的 vue类型的组建
import Login from './views/login'
import Home from './views/home'
import Welcome from './components/welcome'
import Users from './components/users/users'
import Rights from './components/power/Rights'
import Roles from './components/power/roles'
import Cate from './components/goods/Cate'
import Params from './components/goods/params'
import List from './components/goods/List'
import Add from './components/goods/add'

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    }, { path: '/users', component: Users },
    { path: '/Rights', component: Rights },
    { path: '/roles', component: Roles },
    { path: '/categories', component: Cate },
    { path: '/params', component: Params },
    { path: '/goods', component: List },
    { path: '/goods/add', component: Add }
    ]
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
