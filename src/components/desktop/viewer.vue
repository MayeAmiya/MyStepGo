<template>
  <div style="pointer-events: auto">
    <el-container>
      <el-header style="text-align: center">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect">
          <el-menu-item index="0" style="margin-right: auto"> Information </el-menu-item>
          <el-menu-item index="1" style="margin-right: auto"> Points </el-menu-item>
          <el-menu-item index="2" style="margin-right: auto"> Titles </el-menu-item>
          <el-menu-item @click="props.closeDrawer">Close Drawer</el-menu-item>
          <el-menu-item @click="props.expandDrawer">Expand Drawer</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <component :is="curretlyComponent" />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import pointPane from './infviewPage/pointsPane.vue'
import titlePane from './infviewPage/titlesPane.vue'
import infPane from './infviewPage/contentPane.vue'
const activeIndex = ref('0')
const curretlyComponent = ref<typeof infPane | typeof pointPane | typeof titlePane | null>(null)
curretlyComponent.value = infPane
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
  switch (key) {
    case '0':
      curretlyComponent.value = infPane
      break
    case '1':
      curretlyComponent.value = pointPane
      break
    case '2':
      curretlyComponent.value = titlePane
      break
    default:
      curretlyComponent.value = null
  }
  console.log(key, keyPath)
}

const props = defineProps<{
  expandDrawer: () => void
  closeDrawer: () => void
}>()


</script>

<style>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
