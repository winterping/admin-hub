import type { RouteRecordRaw } from 'vue-router'

import { BasicLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'Memo',
      keepAlive: true,
      order: 3,
      title: '组件示例',
    },
    name: 'Examples',
    path: '/examples',
    children: [
      {
        meta: {
          icon: 'Operation',
          title: 'X6使用',
        },
        name: 'X6Examples',
        path: '/examples/x6',
        children: [
          {
            name: 'FlowChart',
            path: '/examples/x6/flow-chart',
            component: () => import('@/views/examples/x6/flow-chart.vue'),
            meta: {
              icon: 'TrendCharts',
              title: '流程图',
            },
          },
        ],
      },
    ],
  },
]

export default routes
