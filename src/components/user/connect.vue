<template>
  <div v-on-click-outside="back" class="connect">
    <el-avatar id="head" shape="square" :size="150" :src="head" />
    <h1>Name</h1>
    <h2>Email</h2>
    <button @click="connect">登录</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { vOnClickOutside } from '@vueuse/components'
import headImg from '../../assets/head.png'
const head = headImg
const router = useRouter()

const connect = () => {
  // Add your login logic here
  console.log('Login button clicked')
  router.push('/desktop')
  // 获取用户信息 然后转入desktop时根据用户信息读取初始状态
}

const back = () => {
  console.log('Login back clicked')
  router.back()
}
</script>

<style scoped>
.connect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: auto;
  gap: 10px; /* Add gap between elements */
  border-radius: 15px; /* 圆角 */
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
}

button {
  position: relative;
  padding: 10px 80px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block; /* 横排文字 */
  white-space: nowrap; /* 一行字 */
}
</style>
