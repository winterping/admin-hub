import { useAccessStore } from '@/store/access'
import { useUserStore } from '@/store/user'

function clearToken() {
  const accessStore = useAccessStore()
  accessStore.setAccessToken(null)
  accessStore.setIsAccessChecked(false)
}

function clearUserInfo() {
  const userStore = useUserStore()
  userStore.clearUserInfo()
}

export { clearToken, clearUserInfo }
