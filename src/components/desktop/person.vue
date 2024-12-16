<template>
  <div style="pointer-events: auto">
    <div style="display: flex; flex-direction: column; align-items: center">
      <el-avatar :size="'default'" :src="head" style="border: 1px solid black" @click="changeCollapse" />
      <div id="component" style="display: flex; justify-content: space-between; padding: 10px 0">
        <div class="common-layout">
          <el-container>
            <el-aside v-on-click-outside="menuClickout" width="auto">
              <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="true" @open="handleOpen"
                @close="handleClose" @select="changeComponent">
                <el-menu-item index="0">
                  <el-icon>
                    <User />
                  </el-icon>
                  <template #title>Person</template>
                </el-menu-item>
                <el-menu-item index="1">
                  <el-icon>
                    <Lock />
                  </el-icon>
                  <template #title>Safety</template>
                </el-menu-item>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <template #title>ToDo</template>
                </el-menu-item>
                <el-menu-item index="3">
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <template #title>Groups</template>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <template #title>Setting</template>
                </el-menu-item>
              </el-menu></el-aside>
            <el-main>
              <component :is="currentComponent" />
            </el-main>
          </el-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import headImg from '../../assets/head.png'
const head = headImg

import { vOnClickOutside } from '@vueuse/components'
import { Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import grouplistPage from './personalPage/grouplistPage.vue'
import personalPage from './personalPage/personalPage.vue'
import safetyPage from './personalPage/safetyPage.vue'
import settingPage from './personalPage/settingPage.vue'
import todolistPage from './personalPage/todolistPage.vue'

const currentComponent = ref<
  | typeof grouplistPage
  | typeof personalPage
  | typeof safetyPage
  | typeof settingPage
  | typeof todolistPage
  | null
>(null)

const changeComponent = (index: string) => {
  isCommponent.value = true
  isCollapse.value = false
  const component = document.getElementById('component')
  if (component) {
    component.style.width = '80vw'
  }
  switch (index) {
    case '0':
      currentComponent.value = personalPage
      break
    case '1':
      currentComponent.value = safetyPage
      break
    case '2':
      currentComponent.value = todolistPage
      break
    case '3':
      currentComponent.value = grouplistPage
      break
    case '4':
      currentComponent.value = settingPage
      break
    default:
      currentComponent.value = null
      isCommponent.value = false
      isCollapse.value = true
      if (component) {
        component.style.width = 'auto'
      }
  }
}
const isCollapse = ref(true)
const isCommponent = ref(false)

const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const menuClickout = () => {
  isCollapse.value = true
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

onMounted(() => {
  currentComponent.value = null
})

onUnmounted(() => {
  currentComponent.value = null
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
