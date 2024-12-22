<template>
  <div class="desktop-container">
    <maptop default="Map" class="map" />
    <div class="overlay">
      <div class="overlay-content">
        <div style="pointer-events: auto">
          <div style="
              position: absolute;
              bottom: 16px;
              left: 50%;
              transform: translateX(-50%);
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              background-color: #fff;
              padding: 10px;
              display: flex;
              gap: 10px;
            ">
            <div style="height: 40px">
              <el-button type="primary" style="height: 40px; width: 40px" @click="searchDrawer = true">
                <el-icon>
                  <Search />
                </el-icon>
              </el-button>
            </div>

            <div style="height: 40px">
              <el-button type="primary" style="
                  background-color: rgba(255, 255, 255, 0.5);
                  height: 40px;
                  width: 40px;
                  color: black;
                " @click="SquareOpen">
                <el-icon>
                  <ChatSquare />
                </el-icon>
              </el-button>
            </div>

            <div style="height: 40px">
              <el-avatar shape="square" fit="fit" :src="head" style="border: 1px solid black"
                @click="personDrawer = true" />
            </div>
          </div>
        </div>
      </div>

      <div class="overlay-drawer" style="pointer-events: auto">
        <el-drawer v-model="searchDrawer" :with-header="false" direction="ltr" :size="'60%'"
          :style="{ minWidth: '650px', maxWidth: '850px' }">
          <search />
        </el-drawer>

        <el-drawer v-model="personDrawer" :with-header="false" direction="rtl" :size="'auto'">
          <Person />
        </el-drawer>

        <el-drawer v-model="showDrawer" :with-header="false" :direction="'btt'" :size="showDrawerSize"
          @close="handleClose()">
          <!-- 这里放组件信息 -->
          <viewer :expand-drawer="expandDrawer" :close-drawer="closeDrawer" />
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import maptop from './desktop/map.vue'
import search from './desktop/search.vue'
import Person from './desktop/person.vue'
import viewer from './desktop/viewer.vue'
import headImg from '../assets/head.png'
const head = headImg

import { ref } from 'vue'
const personDrawer = ref(false)
const showDrawer = ref(false)
const searchDrawer = ref(false)
const showDrawerSize = ref('60%')
const expandDrawer = () => {
  showDrawerSize.value = '100%'
}
const closeDrawer = () => {
  showDrawer.value = false
  showDrawerSize.value = '60%'
  handleClose()
}
const openDrawer = () => {
  showDrawer.value = true
}

function handleClose() {
  showDrawer.value = false
  globalStore.Global.user.currentInfo.infType = 'map'
}

import { useGlobalStore } from '../eventBus'
const globalStore = useGlobalStore()
const SquareOpen = () => {
  showDrawer.value = true
}

onMounted(() => {
  globalStore.setFunction('showDrawer', SquareOpen)
  globalStore.setFunction('handleClose', handleClose)
  globalStore.setFunction('openDrawer', openDrawer)
})
</script>

<style scoped>
.desktop-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.map {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.overlay-content {
  position: absolute;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
