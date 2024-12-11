<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchMenuTree } from '@/api/menu'
import AddMenu from './add-menu.vue'
import { treeProps } from './tree-props.ts'

const tree = ref([])

onMounted(() => {
  getMenuTree()
})

const getMenuTree = async () => {
  try {
    const res = await fetchMenuTree()
    console.log('res', res.data)
    tree.value = res.data ?? []
  } catch (err) {}
}
</script>

<template>
  <div class="menu-container">
    <div>
      <el-button>新增菜单</el-button>
    </div>
    <el-tree
      :data="tree"
      :props="treeProps"
      class="menu-tree"
      default-expand-all
    >
      <template #default="{ node, data }">
        <el-icon>
          <ChatSquare />
        </el-icon>
        <span>{{ data.name }}</span>
        <div style="margin-left: 20px">
          <el-button link>新增</el-button>
          <el-button link>刪除</el-button>
          <el-button link>编辑</el-button>
        </div>
      </template>
    </el-tree>
  </div>
  <!-- <add-menu :tree="tree" /> -->
</template>

<style scoped lang="scss">
.menu-container {
  height: 100%;
  // border: 1px solid red;
}

.menu-tree {
  height: 100%;
  // background-color: aqua;
}
</style>
