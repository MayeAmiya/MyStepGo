<template>
  <div class="card">
    <p style="color: black">Title : {{ props.title.title }}</p>
    <p style="color: black">Creater : {{ props.title.creater }}</p>
    <p style="color: black">Last update : {{ props.title.date }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      keywords: [],
      location: [0, 0]
    })
  }
})
</script>
<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
</style>
