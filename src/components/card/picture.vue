<template>
  <div class="picture-card">
    <img :src="props.imageUrl" alt="Picture" class="picture" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.picture-card {
  border: 1px solid #ccc;
  padding: 10px;
  display: inline-block;
}

.picture {
  max-width: 100%;
  height: auto;
}
</style>
