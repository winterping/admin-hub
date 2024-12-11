import type { Router } from 'vue-router'
import { accessRoutes, coreRouteNames } from './routes'
import { generateRoutes } from '@/utils/generate-routes'
import { generateMenus } from '@/utils/generate-menus'
import { useAccessStore } from '@/store/access'
import { useUserStore } from '@/store/user'
import { cloneDeep } from 'lodash-es'

const forbiddenComponent = () => import('@/views/not-found/index.vue')

/**
 * 权限访问守卫配置
 * @param router
 */
function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    // console.log('to',to,'from',from);
    const accessStore = useAccessStore()
    const userStore = useUserStore()
    // 基本路由，这些路由不需要进入权限拦截
    if (coreRouteNames.includes(to.name as string)) {
      return true
    }

    // accessToken 检查
    if (!accessStore.accessToken) {
      console.log('没有accessToken')

      // 明确声明忽略权限访问权限，则可以访问
      if (to.meta.ignoreAccess) {
        return true
      }
      // 没有访问权限，跳转登录页面
      if (to.fullPath !== '/login') {
        return {
          path: '/login',
          query: { redirect: encodeURIComponent(to.fullPath) },
          replace: true,
        }
      }
      return to
    }

    if (accessStore.isAccessChecked) {
      console.log('已经生成过动态路由了')
      return true
    }

    const userRoles = userStore.userRoles ?? []
    const newRoutes = cloneDeep(accessRoutes)
    // 获取动态路由
    const accessibleRoutes = await generateRoutes({
      router,
      routes: accessRoutes,
      roles: userRoles,
      forbiddenComponent,
    })
    console.log('accessibleRoutes', accessibleRoutes)
    // 生成菜单
    const accessibleMenus = await generateMenus(accessibleRoutes, router)
    // console.log('accessibleMenus',accessibleMenus);
    // 保存菜单信息和路由信息
    accessStore.setAccessMenus(accessibleMenus)
    accessStore.setAccessRoutes(accessibleRoutes)
    accessStore.setIsAccessChecked(true)

    const redirectPath = (from.query.redirect ?? to.fullPath) as string
    return {
      ...router.resolve(decodeURIComponent(redirectPath)),
      replace: true,
    }
  })
}

/**
 * 项目守卫配置
 * @param router
 */
function createRouterGuard(router: Router) {
  /** 权限访问 */
  setupAccessGuard(router)
}

export { createRouterGuard }
