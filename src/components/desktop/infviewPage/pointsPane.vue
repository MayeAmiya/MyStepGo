<template>
  <div style="overflow-y: auto; max-height: 400px">
    <el-card shadow="always" style="border-radius: 10px; margin-top: 10px">
      <template #header>
        <el-button v-if="!create && globalStore.Global.user.currentInfo.infType != 'points'" type="primary"
          class="el-border-radius-small" @click="create = !create">
          {{ create ? 'Cancel' : 'Add New Point' }}
        </el-button>
        <el-button v-if="!create && globalStore.Global.user.currentInfo.infType == 'points' && nextable"
          @click="enterPoint" type="primary">Enter the Point Space</el-button>
        <el-button v-if="!create && globalStore.Global.user.currentInfo.infType != 'points'" @click="changePoint"
          type="primary">Change the Point Information</el-button>
        <div v-if="create" type="primary">
          <el-form @submit.prevent="addPoint">
            <el-form-item label="Title">
              <el-input v-model="newPoint.title" placeholder="Enter title"></el-input>
            </el-form-item>
            <el-form-item label="Type">
              <el-switch v-model="newPoint.type" active-text="Open" inactive-text="Close" />
            </el-form-item>
            <el-form-item label="Location">
              <p>Location: {{ newPoint.location }}</p>
              <el-button @click="choosePoint">Choose Location</el-button>
              <el-button @click="createSpace">Create Point Space</el-button>
            </el-form-item>
            <el-form-item label="Content">
              <el-input v-model="newPoint.input" type="textarea" placeholder="Enter content"
                @keyup.enter="handleEnter"></el-input>
            </el-form-item>

            <el-form-item label="Keywords">
              <div>
                <el-input-tag v-model="newPoint.keywords" draggable clearable placeholder="Enter keywords">
                  <template #suffix>
                    <el-icon>
                      <Search />
                    </el-icon> </template></el-input-tag>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="addPoint">Add Title</el-button>
              <el-button @click="clearPoint">Cancel</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div ref="pointPane" class="point-pane"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { createApp, defineAsyncComponent, ref, onMounted } from 'vue'
import { useGlobalStore } from '../../../eventBus'
import { pointInfo } from '../../information/pointInfo'

const create = ref(false)
const globalStore = useGlobalStore()
const pointPane = ref<HTMLElement | null>(null)
const points = ref<pointInfo[]>(globalStore.Global.user.currentInfo.pointsInfos)
const infType = ref(globalStore.Global.user.currentInfo.infType)
const nextable = ref(false)
globalStore.$subscribe(async () => {
  nextable.value = false
  points.value = globalStore.Global.user.currentInfo.pointsInfos
  infType.value = globalStore.Global.user.currentInfo.infType
  if (await globalStore.Global.points.findPointInfo(globalStore.Global.user.currentInfo.pointIndex)) {
    nextable.value = true
  }

  iteratePoints()
  console.log("update")
})

async function enterPoint() {
  console.log('enterPoint')
  const index = globalStore.Global.user.currentInfo.pointIndex
  globalStore.Global.points.find(index)
  globalStore.Global.points.enter(index)
  globalStore.Global.user.currentInfo.mapIndex = index

  iteratePoints()
}

import { text } from "../../information/cardInfo/text"
async function handleEnter() {
  const textTemp = new text(newPoint.value.input)
  if (await textTemp.createText()) {
    newPoint.value.information.push(textTemp.index)
  }
}
// 为其他附件添加信息
async function changePoint() {
  const index = ref(globalStore.Global.user.currentInfo.pointIndex)
  if (globalStore.Global.user.currentInfo.infType == 'points') {
    index.value = globalStore.Global.user.currentInfo.pointIndex
  } else {
    index.value = globalStore.Global.user.currentInfo.mapIndex
  }
  const mapinfTemp = await globalStore.Global.points.findPointInfo(index.value)
  newPoint.value.title = await mapinfTemp.title
  newPoint.value.information = await mapinfTemp.info
  newPoint.value.keywords = await mapinfTemp.keywords
  newPoint.value.location = await mapinfTemp.location
  newPoint.value.type = await mapinfTemp.type === 'true'
  newPoint.value.Poly = await mapinfTemp.region
  create.value = true
}

async function createSpace() {
  const closeDrawer = globalStore.Global.functions.get('handleClose')
  if (closeDrawer) {
    closeDrawer()
  }
  const PolygonEditor = globalStore.Global.functions.get('PolygonEditor')
  if (PolygonEditor) {
    const result = (await PolygonEditor()) as Array<{ lat: number, lng: number }>
    newPoint.value.Poly = result.map(point => [point.lat, point.lng]).flat()
    console.log(newPoint.value.Poly)
  }
  const openDrawer = globalStore.Global.functions.get('openDrawer')
  if (openDrawer) {
    openDrawer()
  }
}

const newPoint = ref({
  title: '',
  input: '',
  information: [] as number[],
  type: false,
  keywords: [] as string[],
  location: [0, 0] as [number, number],
  Poly: ref<Array<number>>([])
})

async function choosePoint() {
  const closeDrawer = globalStore.Global.functions.get('handleClose')
  if (closeDrawer) {
    closeDrawer()
  }
  const tempPoint = ref<Array<number>>([])
  const waitForMapClick = globalStore.Global.functions.get('waitForMapClick')
  if (waitForMapClick) {
    tempPoint.value = (await waitForMapClick()) as Array<number>
  }
  const openDrawer = globalStore.Global.functions.get('openDrawer')
  if (openDrawer) {
    openDrawer()
  }

  newPoint.value.location = tempPoint.value as [number, number]
}

async function addPoint() {
  if (newPoint.value.title == '') {
    console.log('title is empty')
    return
  }
  if (newPoint.value.location[0] === 0 && newPoint.value.location[1] === 0) {
    console.log('location is empty')
    return
  } else {
    newPoint.value.location = [newPoint.value.location[0], newPoint.value.location[1]]
  }
  await globalStore.Global.points.createPointInfo(
    newPoint.value.type.toString(),
    -1,
    globalStore.Global.user.currentInfo.mapIndex,
    newPoint.value.title,
    newPoint.value.information,
    newPoint.value.keywords,
    newPoint.value.Poly,
    newPoint.value.location
  )
  console.log('addPoint')
  console.log(newPoint.value)
  console.log(globalStore.Global.points)
  clearPoint()
  create.value = false
  // 更新信息列表
  globalStore.Global.user.currentInfo.pointsInfos = await globalStore.Global.points.find(
    globalStore.Global.user.currentInfo.mapIndex
  )
  iteratePoints()
}

function clearPoint() {
  create.value = false
  newPoint.value.title = ''
  newPoint.value.information = []
  newPoint.value.keywords = []
  newPoint.value.location = [0, 0]
}

async function iteratePoints() {
  if (infType.value == 'points') {
    // 添加进入该点的选项
    if (pointPane.value) {
      // 在这里取得points的值
      pointPane.value.innerHTML = ''
      const tempPoints = await globalStore.Global.points.find(
        globalStore.Global.user.currentInfo.pointIndex
      )
      tempPoints.forEach((point) => {
        const pointElement = document.createElement('div')
        const PointComponent = defineAsyncComponent(() => import('../../card/point.vue'))
        pointElement.addEventListener('dblclick', () => {
          globalStore.Global.user.currentInfo.pointIndex = point.id
          enterPoint()
          const closeDrawer = globalStore.Global.functions.get('handleClose')
          if (closeDrawer) {
            closeDrawer()
          }
        });
        pointElement.addEventListener('click', () => {
          const setCenter = globalStore.Global.functions.get('setCenter')
          if (setCenter) {
            setCenter(point.location)
          }
          const closeDrawer = globalStore.Global.functions.get('handleClose')
          if (closeDrawer) {
            closeDrawer()
          }
        });
        const app = createApp(PointComponent, { point })
        app.mount(pointElement)
        pointPane.value?.appendChild(pointElement)
      })
    }
  } else {
    // 添加增加新点的选项
    if (pointPane.value) {
      pointPane.value.innerHTML = '' // 清空之前的内容
      const tempPoints = await globalStore.Global.points.find(
        globalStore.Global.user.currentInfo.mapIndex
      )
      tempPoints.forEach((point) => {
        const pointElement = document.createElement('div')
        const PointComponent = defineAsyncComponent(() => import('../../card/point.vue'))
        pointElement.addEventListener('dblclick', () => {
          globalStore.Global.user.currentInfo.pointIndex = point.id
          enterPoint()
          const closeDrawer = globalStore.Global.functions.get('handleClose')
          if (closeDrawer) {
            closeDrawer()
          }
        });
        pointElement.addEventListener('click', () => {
          const setCenter = globalStore.Global.functions.get('setCenter')
          if (setCenter) {
            setCenter(point.location)
          }
          const closeDrawer = globalStore.Global.functions.get('handleClose')
          if (closeDrawer) {
            closeDrawer()
          }
        });
        const app = createApp(PointComponent, { point })
        app.mount(pointElement)
        pointPane.value?.appendChild(pointElement)
      })
    }
  }
}

onMounted(() => {
  iteratePoints()
  console.log(points.value)
  console.log(infType.value)
})
</script>

<style scoped>
.point-pane {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
}
</style>
