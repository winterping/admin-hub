<script setup lang="ts">
import { reactive, toRaw, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import { useAccessStore } from '@/store/access'
import { useUserStore } from '@/store/user'
import { router } from '@/router'
import { loginUser } from '@/api/login'

const accessStore = useAccessStore()
const userStore = useUserStore()

interface RuleForm {
  username: string
  password: string
  role: string
}

const form = reactive({
  username: 'super',
  password: '123456',
  role: 'super',
})

const formRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { username, password } = toRaw(form)
      const res: any = await loginUser({ username, password })
      const { accessToken, ...userInfo } = res.data
      accessStore.setAccessToken(accessToken)
      accessStore.setIsAccessChecked(false)
      userStore.setUserInfo(userInfo)
      router.replace({
        path: '/',
      })
    } else {
      console.log('error submit!')
    }
  })
}
</script>

<template>
  <div class="container">
    <div class="login-main">
      <p class="title">欢迎登录</p>
      <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
        <!-- <el-form-item prop="role">
          <el-select v-model="form.role" placeholder="用户角色">
            <el-option label="超级管理员" value="super" />
            <el-option label="管理员" value="admin" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item> -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            @click="onSubmit(formRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    154deg,
    rgba(7, 7, 9, 0.08235) 30%,
    hsl(var(--primary) / 30%) 48%,
    rgba(7, 7, 9, 0.08235) 64%
  );
  backdrop-filter: blur(100px);
  position: relative;
  z-index: 1;
}

.login-main {
  width: 300px;
  height: 250px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
}

.el-form-item {
  margin-bottom: 25px;
}
</style>
