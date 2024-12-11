import { acceptHMRUpdate, defineStore } from 'pinia'

interface BasicUserInfo {
  [key: string]: any
  roles?: string[]
  username: string
  currentRole: object
}

interface UserState {
  userInfo: BasicUserInfo | null
  userRoles: string[]
  currentRole: object | null
}

/**
 * @zh_CN 用户信息相关
 */
export const useUserStore = defineStore('user', {
  actions: {
    setUserInfo(userInfo: BasicUserInfo) {
      console.log('userInfo', userInfo)
      const { roles, currentRole, ...rest } = userInfo
      this.userInfo = rest
      this.setUserRoles(roles ?? [])
      this.setCurrentRole(currentRole)
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles
    },
    setCurrentRole(role) {
      this.currentRole = role
    },
    clearUserInfo() {
      this.userInfo = null
      this.userRoles = []
      this.currentRole = null
    },
  },
  state: (): UserState => ({
    userInfo: null,
    userRoles: [],
    currentRole: null,
  }),
  persist: {
    // 持久化
    storage: localStorage,
    pick: ['userInfo', 'userRoles', 'currentRole'],
  },
})

// 解决热更新问题
const hot = import.meta.hot
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot))
}
