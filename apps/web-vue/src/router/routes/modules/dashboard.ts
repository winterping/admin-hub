import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'Tickets',
      order: -1,
      title: '概览',
    },
    name: 'House',
    path: '/',
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('@/views/dashboard/home/index.vue'),
        meta: {
          icon: 'House',
          title: '首页',
        },
      },
    ],
  },
]

export default routes
