<template>
  <div ref="loginContainerRef" v-on-click-outside="back" class="login-container">
    <h1>Login</h1>
    <el-input
      id="organization-username"
      v-model="Username"
      type="text"
      placeholder="用户名"
      required
    />
    <el-input
      id="organization-password"
      v-model="Password"
      type="password"
      placeholder="密码"
      required
    />
    <el-button type="primary" class="large-button" @click="Login">Login</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { vOnClickOutside } from '@vueuse/components'

const Username = ref('')
const Password = ref('')

const visible = ref(true)
const router = useRouter()

const Login = () => {
  console.log('Username:', Username.value)
  console.log('Password', Password.value)
  // Add your login logic here
  console.log('Login button clicked')
  visible.value = false
  router.push({ name: 'Connect' })
}
const back = () => {
  console.log('Login back clicked')
  router.push({ name: 'Home' })
  console.log('Current route:', router.currentRoute.value)
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  z-index: 1;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center; /* 使表单元素居中 */
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
}

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

.toggle-button {
  font-size: 16px; /* 原有字体规格 */
  text-decoration: underline; /* 添加下划线 */
  text-underline-offset: 4px; /* 调整下划线与字体的距离 */
}

.toggle-button:hover {
  font-size: 18px;
  font-weight: bold;
  color: blue;
}
</style>
