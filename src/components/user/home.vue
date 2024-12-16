<template>
  <div class="inline-flex" style="height: auto; width: auto; margin: 2px; box-shadow: light">
    <span class="demo-shadow-text" style="padding: 1rem 0; font-size: small">
      <div>
        <el-button type="primary" class="large-button" @click="navigateTo('login')">
          登录
        </el-button>
      </div>
      <div>
        <el-button type="primary" class="large-button" @click="navigateTo('register')">
          注册
        </el-button>
      </div>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const visible = ref(true)
const router = useRouter()

const navigateTo = (type: 'login' | 'register') => {
  visible.value = false
  router.push({ name: type.charAt(0).toUpperCase() + type.slice(1) })
}
</script>

<style scoped>
.large-button {
  position: relative;
  width: 150px;
  height: 50px;
  font-size: 16px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: white; /* 白底 */
  border: 1px solid transparent; /* 初始边框透明 */
  color: black; /* 字体颜色改为黑色 */
}

.large-button:hover {
  border-color: blue; /* 指向时泛起蓝色边框 */
}
</style>
