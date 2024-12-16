<template>
  <div class="safety-page">
    <el-card class="box-card">
      <template #header>
        <div class="clearfix">
          <span>个人安全页面</span>
        </div>
      </template>
      <el-form :model="form" label-width="120px">
        <el-form-item label="绑定手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="绑定邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="重置密码">
          <el-input v-model="form.password" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="登录设备管理">
          <el-table :data="devices" style="width: 100%">
            <el-table-column prop="name" label="设备名称" width="180"></el-table-column>
            <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
            <el-table-column prop="lastLogin" label="最后登录时间"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  phone: '',
  email: '',
  password: ''
})

const devices = ref([
  { name: '设备1', ip: '192.168.1.1', lastLogin: '2023-10-01 12:00' },
  { name: '设备2', ip: '192.168.1.2', lastLogin: '2023-10-02 14:00' }
])

const submitForm = () => {
  console.log('提交表单', form.value)
}
</script>

<style scoped>
.safety-page {
  padding: 20px;
}
</style>
