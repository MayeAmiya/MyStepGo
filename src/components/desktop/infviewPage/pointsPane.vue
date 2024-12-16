<template>
  <div style="overflow-y: auto; max-height: 400px">
    <el-card shadow="always" style="border-radius: 10px; margin-top: 10px">
      <template #header>
        <el-button v-if="!create && globalStore.Global.user.currentInfo.infType == 'map'" type="primary"
          class="el-border-radius-small" @click="create = !create">
          {{ create ? 'Cancel' : 'Add New Point' }}
        </el-button>
        <el-button v-if="!create && globalStore.Global.user.currentInfo.infType == 'points' && nextable"
          @click="enterPoint" type="primary">Enter the Point Space</el-button>
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
              <el-input v-model="newPoint.information" type="textarea" placeholder="Enter content"></el-input>
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
  if (await globalStore.Global.mapDatas.find(globalStore.Global.user.currentInfo.pointIndex)) {
    nextable.value = true
  }

  iteratePoints()
})

function enterPoint() {
  console.log('enterPoint')
  const index = globalStore.Global.user.currentInfo.pointIndex
  globalStore.Global.mapDatas.find(index)
  globalStore.Global.mapDatas.enter(index)
  globalStore.Global.user.currentInfo.mapIndex = index

  iteratePoints()
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
  information: '',
  type: false,
  keywords: [] as string[],
  location: [0, 0] as [number, number],
  Poly: ref<Array<number>>([])
})

async function choosePoint() {
  const closeDrawer = globalStore.Global.functions.get('handleClose')
  console.log(closeDrawer)
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

function addPoint() {
  if (newPoint.value.title == '') {
    return
  }
  if (newPoint.value.information == '') {
    return
  }
  if (newPoint.value.location.length != 2) {
    return
  }
  globalStore.Global.points.createPointInfo(
    newPoint.value.type.toString(),
    -1,
    globalStore.Global.user.currentInfo.mapIndex,
    newPoint.value.title,
    [newPoint.value.information],
    newPoint.value.keywords,
    newPoint.value.location
  )
  iteratePoints()
}

function clearPoint() {
  create.value = false
  newPoint.value.title = ''
  newPoint.value.information = ''
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
        const app = createApp(PointComponent, { point })
        app.mount(pointElement)
        pointPane.value?.appendChild(pointElement)
      })
    }
  } else {
    // 添加增加新点的选项
    if (pointPane.value) {
      pointPane.value.innerHTML = '' // 清空之前的内容

      points.value.forEach((point) => {
        const pointElement = document.createElement('div')
        const PointComponent = defineAsyncComponent(() => import('../../card/point.vue'))
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
