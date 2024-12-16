<template>
  <div class="settingPage" :class="{ 'dark-mode': isDarkMode }">
    <el-switch
      v-model="isDarkMode"
      active-text="Dark Mode"
      inactive-text="Light Mode"
      @change="toggleDarkMode"
    >
    </el-switch>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = (value) => {
  isDarkMode.value = value
  if (value) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
}
</script>

<style scoped>
.settingPage {
  padding: 20px;
}

.dark-mode {
  background-color: #333;
  color: #fff;
}
</style>
