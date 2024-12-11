import type { RouteRecordRaw } from 'vue-router'

// 通用路由，任何人都可以访问的
const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index.vue'), // 动态导入登录组件
  },
  // {
  //   meta: {
  //     title: "主页",
  //   },
  //   name: "Home",
  //   path: "/",
  //   redirect: '/home',
  // },
]

/** 全局404页面 */
const notFoundRoute: RouteRecordRaw = {
  component: () => import('@/views/not-found/index.vue'),
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },
  name: 'NotFound',
  path: '/:path(.*)*',
}
export { coreRoutes, notFoundRoute }
