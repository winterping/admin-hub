<script setup name="menuItem" lang="ts">
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <el-sub-menu
    v-if="item?.children?.length > 0"
    :key="item.path"
    :index="item.path"
    class="menu-group"
  >
    <template #title>
      <el-icon>
        <component :is="item.icon"> </component>
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
    <menuItem v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>
  <el-menu-item v-else :index="item.path" class="sidebar-menu">
    <el-icon>
      <component :is="item.icon"> </component>
    </el-icon>
    <template #title>{{ item.name }}</template>
  </el-menu-item>
</template>

<style lang="scss">
.menu-group {
  margin-bottom: 10px;

  .el-sub-menu__title {
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
  }
}

.sidebar-menu {
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
}

.el-menu-item.is-active {
  fill: var(--menu-item-active-color);
  color: var(--menu-item-active-color);
  -webkit-text-decoration: none;
  text-decoration: none;
  cursor: pointer;
  background: var(--menu-item-active-background-color);
}
</style>
