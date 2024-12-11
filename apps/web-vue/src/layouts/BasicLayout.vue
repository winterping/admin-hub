<script setup lang="ts">
import sidebar from '@/views/sidebar/index.vue'
import MainHeader from '@/views/header/index.vue'
</script>

<template>
  <div class="basic-layout">
    <sidebar />
    <div class="basic-main">
      <main-header />
      <el-main class="basic-body">
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>

<style lang="scss">
.basic-layout {
  width: 100%;
  height: 100vh;
  background-color: var(--bg-color);
  display: flex;

  .basic-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .basic-body {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
