<script setup lang="ts">
import { watchEffect, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { useAccessStore } from '@/store/access'
import { treeFindPath } from '@/utils/tree'

const route = useRoute()
const accessStore = useAccessStore()
const accessRoutes = toRaw(accessStore.accessRoutes)

const breadcrumbItems = ref([])

watchEffect(() => {
  // console.log('watch---', route.meta.hideInMenu);
  let arr = route.matched
  if (route.meta.hideInMenu) {
    console.log(route.query)
    const { parent } = route.query
    arr = treeFindPath(accessRoutes, (data) => data.path === parent)
  }
  const result = arr.map((item) => ({
    meta: item.meta,
    path: item.path,
  }))
  // console.log('result', result);
  breadcrumbItems.value = result
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
      <div class="item">
        <el-icon>
          <component :is="item.meta.icon"> </component>
        </el-icon>
        {{ item.meta.title }}
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.item {
  display: inline-flex;
  align-items: center;
  font-weight: 500;

  .el-icon {
    margin-right: 5px;
  }
}
</style>
