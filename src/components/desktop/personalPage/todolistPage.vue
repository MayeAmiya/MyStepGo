<template>
  <div class="todolist-page">
    <el-row :gutter="20">
      <el-col v-for="day in days" :key="day" :span="8">
        <el-card>
          <h3>{{ day }}</h3>
          <el-table :data="getTasksForDay(day)" style="width: 100%">
            <el-table-column prop="text" label="Task" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
const tasks = ref([
  { id: 1, text: 'Task 1', day: 'Monday' },
  { id: 2, text: 'Task 2', day: 'Tuesday' },
  { id: 3, text: 'Task 3', day: 'Wednesday' }
  // Add more tasks as needed
])
const getTasksForDay = (day) => {
  return tasks.value.filter((task) => task.day === day)
}
</script>

<style scoped>
.todolist-page {
  padding: 20px;
}
</style>
