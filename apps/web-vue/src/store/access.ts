import type { RouteRecordRaw } from 'vue-router'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { MenuRecordRaw } from '@/typings/menu'
import type { AccessToken, AccessState } from '@/typings/access'

/**
 * 访问权限相关
 */
export const useAccessStore = defineStore('access', {
  actions: {
    setAccessMenus(menus: MenuRecordRaw[]) {
      this.accessMenus = menus
    },
    setAccessRoutes(routes: RouteRecordRaw[]) {
      this.accessRoutes = routes
    },
    setAccessToken(token: AccessToken) {
      this.accessToken = token
    },
    setIsAccessChecked(isAccessChecked: boolean) {
      this.isAccessChecked = isAccessChecked
    },
  },
  persist: {
    // 持久化
    storage: localStorage,
    pick: ['accessToken'],
  },
  state: (): AccessState => ({
    accessMenus: [],
    accessRoutes: [],
    accessToken: null,
    isAccessChecked: false,
  }),
})

// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useAccessStore, hot))
}
