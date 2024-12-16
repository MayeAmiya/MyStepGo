<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<style>
#app {
  position: relative;
  margin-bottom: 0px;
}

.el-popup-parent--hidden {
  padding-right: 0px !important;
  overflow: hidden !important;
}
</style>
