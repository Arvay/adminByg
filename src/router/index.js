import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '订单管理',
      icon: 'lock'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: '预售订单',
        meta: {
          title: '预售订单'
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/delList'),
        name: '删除记录',
        meta: {
          title: '删除记录'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'update/:id',
        component: () => import('@/views/permission/base/update'),
        name: '编辑',
        hidden: true,
        meta: {
          title: '编辑'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
