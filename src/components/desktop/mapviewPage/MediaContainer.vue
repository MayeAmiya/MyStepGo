<template>
  <div class="media-container" @click="handleClick" @dragover.prevent @drop="handleDrop"></div>
  <div class="media-content">
    <!-- <img src="path/to/image.jpg" alt="Image" class="draggable-item" /> -->
    <!-- Add more media elements as needed -->
  </div>
</template>

<script setup>
const handleClick = (event) => {
  const container = event.currentTarget
  const rect = container.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  alert(`Clicked at: (${x}, ${y})`)
}

const handleDrop = (event) => {
  const container = event.currentTarget
  const rect = container.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // 创建一个新的元素并设置其位置
  const newElement = document.createElement('div')
  newElement.className = 'draggable-item'
  newElement.style.left = `${x}px`
  newElement.style.top = `${y}px`
  newElement.textContent = 'New Item'
  container.appendChild(newElement)
}
</script>

<style scoped>
.media-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}

.draggable-item {
  position: absolute;
  cursor: move;
  background-color: #f0f0f0;
  padding: 5px;
  border: 1px solid #ccc;
}
</style>
