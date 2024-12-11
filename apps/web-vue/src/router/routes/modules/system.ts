import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'Tickets',
      order: 1,
      title: '系统管理',
      authority: ['super_admin'],
    },
    name: 'Sys',
    path: '/sys',
    children: [
      {
        name: 'Role',
        path: '/sys/role',
        component: () => import('@/views/sys/role/index.vue'),
        meta: {
          icon: 'UserFilled',
          title: '角色管理',
        },
      },
      {
        name: 'User',
        path: '/sys/user',
        component: () => import('@/views/sys/user/index.vue'),
        meta: {
          icon: 'User',
          title: '用户管理',
        },
      },
      // {
      //   name: 'Menu',
      //   path: '/sys/menu',
      //   component: () => import('@/views/sys/menu/index.vue'),
      //   meta: {
      //     icon: 'Menu',
      //     title: '菜单管理',
      //   },
      // },
    ],
  },
]

export default routes
