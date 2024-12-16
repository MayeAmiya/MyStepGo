<template>
  <div style="overflow-y: auto; max-height: 400px">
    <el-card shadow="always" style="border-radius: 10px; margin-top: 10px">
      <template #header>
        <el-button v-if="!create" type="primary" class="el-border-radius-small" @click="create = !create">
          {{ create ? 'Cancel' : 'Add New Title' }}
        </el-button>
        <div v-if="create" type="primary">
          <el-form @submit.prevent="addTitle">
            <el-form-item label="Title">
              <el-input v-model="newTitle.title" placeholder="Enter title"></el-input>
            </el-form-item>
            <el-form-item label="Content">
              <el-input v-model="newTitle.content" type="textarea" placeholder="Enter content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addTitle">Add Title</el-button>
              <el-button @click="create = false">Cancel</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div ref="titlePane" class="title-pane"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { createApp, defineAsyncComponent, ref, onMounted } from 'vue'
import { useGlobalStore } from '../../../eventBus'
import { TitleInfo, TitleInfos } from '../../information/titlesInfo'

const create = ref(false)
const globalStore = useGlobalStore()
const titlePane = ref<HTMLElement | null>(null)
const infType = ref(globalStore.Global.user.currentInfo.infType)
const titleInfos = new TitleInfos()
const titles = ref<TitleInfo[]>(titleInfos.titleInfoList)

globalStore.$subscribe(() => {
  infType.value = globalStore.Global.user.currentInfo.infType
  iterateTitles()
})

async function iterateTitles() {
  if (titlePane.value) {
    titlePane.value.innerHTML = ''
    // 添加发布新帖子的选项
    if (infType.value == 'titles') {
      titles.value = await titleInfos.find(globalStore.Global.user.currentInfo.pointIndex)
    } else {
      titles.value = await titleInfos.find(globalStore.Global.user.currentInfo.mapIndex)
    }
  } else {
    return
  }

  titles.value.forEach((title) => {
    const titleElement = document.createElement('div')
    const titleComponent = defineAsyncComponent(() => import('../../card/title.vue'))
    const app = createApp(titleComponent, { title })
    app.mount(titleElement)
    titlePane.value?.appendChild(titleElement)
  })
}

const newTitle = ref({
  title: '',
  content: ''
})
async function addTitle() {
  if (globalStore.Global.user.currentInfo.infType == 'map') {
    await titleInfos.createTitle(
      globalStore.Global.user.currentInfo.mapIndex,
      -2,
      newTitle.value.title,
      globalStore.Global.user.userid,
      newTitle.value.content
    )
  } else {
    await titleInfos.createTitle(
      globalStore.Global.user.currentInfo.mapIndex,
      globalStore.Global.user.currentInfo.pointIndex,
      newTitle.value.title,
      globalStore.Global.user.userid,
      newTitle.value.content
    )
  }
  create.value = !create.value
  // (alias) new TitleInfo
  // (father: 当前的mapid, pointid: 选定一个点或不选定, titleid: -2 服务器决定, title: string, creater: id 用户提供,
  // date: 服务器决定, content: 用户 这是一串id, lastedit: 服务器决定): TitleInfo

  iterateTitles()
}

onMounted(() => {
  iterateTitles()
})
</script>

<style scoped>
.title-pane {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
}
</style>
