<script setup lang="ts">
import { clearToken, clearUserInfo } from '@/utils/clear-store'
import breadcrumb from './breadcrumb.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { ref } from 'vue'
import { logoutUser } from '@/api/login'

const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  await logoutUser()
  clearToken()
  clearUserInfo()
  router.replace('/login')
}
const dialogVisible = ref(false)
</script>

<template>
  <div class="header">
    <div class="left">
      <breadcrumb />
    </div>
    <div class="right">
      <el-dropdown placement="bottom-start">
        <div v-if="userStore.userInfo" class="user">
          <p>{{ userStore.userInfo.username }}</p>
          <!-- <p class="role">【{{ userStore.currentRole.name }}】</p> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogVisible = true">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="" width="400">
    <span>确认退出?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logout"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 55px;
  background-color: white;
  border-bottom: var(--menu-border);
  display: flex;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 10px;
  align-items: center;
  justify-content: space-between;
}

.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  .role {
    font-size: 14px;
    color: #999;
    margin-top: 5px;
  }
}
</style>
