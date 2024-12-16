<template>
  <div class="card">
    <p style="color: black">Point Name : {{ props.point.title }}</p>
    <p style="color: black">Point Keywords : {{ props.point.keywords.join(', ') }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  point: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
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
