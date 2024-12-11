<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAccessStore } from '@/store/access'
import MenuItem from './menu-item.vue'
import { useRoute } from 'vue-router'
const accessStore = useAccessStore()
const route = useRoute()

const defaultActive = ref(route.path)

watchEffect(() => {
  if (route.query.parent) {
    defaultActive.value = route.query.parent as string
  } else {
    defaultActive.value = route.path
  }
})
</script>

<template>
  <el-menu class="sidebar" router :default-active="defaultActive">
    <menuItem
      v-for="item in accessStore.accessMenus"
      :key="item.path"
      :item="item"
    />
  </el-menu>
</template>

<style scoped lang="scss">
.sidebar {
  width: 210px;
  background-color: white;
  height: 100vh;
  overflow-y: auto;
  border-right: var(--menu-border);
}
</style>
