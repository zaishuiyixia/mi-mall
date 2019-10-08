const MiHome = () => import('./MiHome.vue')
const MiLogin = () => import('./MiLogin.vue')
const MiCategory = () => import('./MiCategory.vue') 
const MiCart = () => import('./MiCart.vue')
const MiUser = () => import('./MiUser.vue')
const MiList = () => import('./MiList.vue')
const MiDetail = () => import('./MiDetail.vue')

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: MiHome,
    meta: {
      index: 0
    }
  },
  {
    path: '/login',
    name: 'login',
    component: MiLogin
  },
  {
    path: '/category',
    name: 'category',
    component: MiCategory,
    meta: {
      index: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: MiCart,
    meta: {
      index: 2
    }
  },
  {
    path: '/user',
    name: 'user',
    component: MiUser,
    meta: {
      index: 3
    }
  },
  {
    path: '/commodity/list/:id',
    name: 'list',
    component: MiList
  },
  {
    path: '/commodity/detail/:id',
    name: 'list',
    component: MiDetail
  }
]
