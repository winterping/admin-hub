<script setup lang="ts">
import {
  reactive,
  ref,
  defineProps,
  onMounted,
  toRaw,
  watch,
  watchEffect,
  toRef,
  computed,
} from 'vue'
import { treeProps } from './tree-props'
import { mergeRouteModules } from '@/utils/merge-route-modules'

const props = defineProps(['tree'])

const menuData = computed(() => {
  const arr = [
    {
      children: props.tree,
      name: '根菜单',
      id: -1,
    },
  ]
  return arr
})

const dialogFormVisible = ref(true)

const paths = ref([])

const getViewPaths = () => {
  const views = import.meta.glob('@/views/**/*.vue')
  const viewPaths = Object.keys(views).map((path) => {
    return path.replace('@', '/src')
  })
  paths.value = viewPaths
}

onMounted(() => {
  getViewPaths()
})

const form = reactive({
  parentId: null,
  name: null,
  code: null,
  path: null,
  component: null,
  enable: true,
  icon: null,
  keepAlive: false,
  order: null,
  show: true,
})

watchEffect(() => {})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="新增" width="700">
    <el-form :model="form">
      <el-form-item label="所属菜单" prop="parentId">
        <el-tree-select
          v-model="form.parentId"
          :data="menuData"
          :props="treeProps"
          check-strictly
          filterable
        >
          <template #default="{ data }">
            {{ data.name }}
          </template>
        </el-tree-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="编码" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="显示状态" prop="show">
        <el-switch
          v-model="form.show"
          active-text="显示"
          inactive-text="隐藏"
          inline-prompt
        />
      </el-form-item>
      <el-form-item label="状态" prop="enable">
        <el-switch
          v-model="form.enable"
          active-text="开启"
          inactive-text="禁用"
          inline-prompt
        />
      </el-form-item>
      <el-form-item label="路由地址" prop="path">
        <el-select v-model="form.path" placeholder="请选择" filterable>
          <el-option
            v-for="item in paths"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
