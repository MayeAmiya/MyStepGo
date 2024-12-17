<template>
  <div class="inf-pane">
    <h1 style="color: black">Information Pane</h1>
    <p style="color: black">This is an empty page for the infPane component.</p>
    <div>
      <h3>{{ point.title }}</h3>
      <p>{{ point.information }}</p>
      <p>Keywords: {{ point.keywords.join(', ') }}</p>
      <p>Location: {{ point.location }}</p>
    </div>
    <div ref="infpane"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '../../../eventBus'
const globalStore = useGlobalStore()
const infPane = ref < HTMLElement | null > (null)
const index = ref(globalStore.Global.user.currentInfo.pointIndex)
const point = ref(await globalStore.Global.points.findPointInfo(index.value))
const infType = ref(globalStore.Global.user.currentInfo.infType)

globalStore.$subscribe(async () => {
  infType.value = globalStore.Global.user.currentInfo.infType
  if (infType.value == 'points') {
    index.value = globalStore.Global.user.currentInfo.pointIndex
  } else {
    index.value = globalStore.Global.user.currentInfo.mapIndex
  }
  const point = ref(await globalStore.Global.points.findPointInfo(index.value))
})
//遍历信息列表
import { text } from "../../information/cardInfo/text"
function iteratePoints() {
  if (infPane.value) {
    infPane.value.innerHTML = ''
    point.value.info.forEach((inf) => {
      const pointCard = document.createElement('div')
      const tempInf = globalStore.Global.informaitons.find(inf)
      if (tempInf.type == 'text') {
        // 这里tempInf的content就是一个text对象的序列化
        const textContent = JSON.parse(tempInf.infoString);
        const textElement = document.createElement('p');
        textElement.innerHTML = textContent.content;
      }
      if (tempInf.type == 'image') {
        const imageContent = JSON.parse(tempInf.infoString);
        const imageElement = document.createElement('img');
        imageElement.src = imageContent.src;
        imageElement.style.maxWidth = '100%';
        imageElement.style.height = 'auto';
        pointCard.appendChild(imageElement);
      }
    }
    )
  }
}
</script>

<style scoped>
.inf-pane {
  padding: 20px;
  text-align: center;
}
</style>
