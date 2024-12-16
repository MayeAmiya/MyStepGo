<template>
  <div id="container" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

// 示例数据

let map = null

import { useGlobalStore } from '../../../eventBus'

const globalStore = useGlobalStore()
const selectedKeywords = ref(globalStore.Global.user.keywordsList.selected)

const openPane = ref(globalStore.Global.functions.get('showDrawer'))

const currentMap = ref(globalStore.Global.mapDatas.top())

globalStore.$subscribe(() => {
  // 重绘标签
  const newKeywords = globalStore.Global.user.keywordsList.selected
  console.log(globalStore.Global.mapDatas.top())
  console.log(currentMap.value)
  if (selectedKeywords.value !== newKeywords) {
    selectedKeywords.value = globalStore.Global.user.keywordsList.selected
    if (map) {
      map.clearMap()
      addMarkers(AMap)
    }
  }
  if (currentMap.value !== globalStore.Global.mapDatas.top()) {
    currentMap.value = globalStore.Global.mapDatas.top()
    console.log('Map changed')
    if (map) {
      map.clearMap()
      initMap()
      addMarkers(AMap)
    }
  }
})

// 根据currentMap的值，初始化地图

const initMap = async () => {
  const mapInfo = await globalStore.Global.mapDatas.find(currentMap.value)
  if (!mapInfo) {
    console.error('Map data not found')
    return
  } else {
    console.log('Map data found')
  }

  // const { location, region } = mapInfo
  const { location } = mapInfo

  // const bounds = {
  //   southwest: { lng: region[0], lat: region[1] },
  //   northeast: { lng: region[2], lat: region[3] }
  // }

  if (location) {
    map.setCenter(location)
    console.log(location)
    const { region } = mapInfo
    const regionArray = []
    for (let i = 0; i < region.length; i += 2) {
      regionArray.push([region[i], region[i + 1]])
    }
    const polygon = new AMap.Polygon({
      path: regionArray,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.4,
      fillOpacity: 0.2,
      fillColor: '#1791fc',
      zIndex: 50,
      bubble: true // 设置为 true 以确保点击事件不会被阻止
    })

    map.add(polygon)
  } else {
    console.error('Invalid map data')
  }
}

const addMarkers = async (AMap) => {
  // 根据currentMap的值，初始化点
  globalStore.Global.user.currentInfo.pointsInfos = await globalStore.Global.points.find(
    currentMap.value
  )

  const pointsInfo = globalStore.Global.user.currentInfo.pointsInfos
  console.log(pointsInfo)
  // 启动容器时根据容器内标签列表初始化关键词列表
  // 根据关键词列表选择显示标签
  pointsInfo.forEach((point) => {
    if (
      selectedKeywords.value.length === 0 ||
      selectedKeywords.value.some((keyword) => point.keywords.includes(keyword))
    ) {
      console.log(point)
      const marker = new AMap.Marker({
        position: point.location,
        title: point.title,
        content: point.information,
        extData: point.id
      })
      marker.setMap(map)
      marker.on('click', () => {
        globalStore.Global.user.currentInfo.pointIndex = point.id
        globalStore.Global.user.currentInfo.infType = 'points'
        openPane.value = globalStore.Global.functions.get('showDrawer')
        openPane.value()
      })
    }
  })
}

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: '2c30c6b1b049f794e650e0bffd49858e'
  }
  AMapLoader.load({
    key: 'e129fe02a7c0e1f0d934eda9da6c1f34', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale', 'AMap.Geolocation', 'AMap.ControlBar', 'AMap.PolygonEditor'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 14, // 初始化地图级别
        center: [113.536674, 34.817112], // 初始化地图中心点位置
        mapStyle: 'amap://styles/normal' // 使用 HTTPS 协议的资源
      })
      const geolocation = new AMap.Geolocation()
      map.addControl(geolocation)

      // 添加标记 更新位置
      initMap()
      addMarkers(AMap)

      map.on('click', handleMapClick)
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})

const PolygonEditor = () => {
  if (map) {
    return new Promise((resolve) => {
      const polygonEditor = new AMap.PolygonEditor(map)
      const button = document.createElement('el-button')
      button.innerText = 'Close Polygon Editor'
      button.style.position = 'absolute'
      button.style.top = '20px'
      button.style.right = '20px'
      button.style.padding = '10px 20px'
      button.style.backgroundColor = '#007bff'
      button.style.color = '#fff'
      button.style.border = 'none'
      button.style.borderRadius = '5px'
      button.style.cursor = 'pointer'
      button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'
      button.addEventListener('click', () => {
        polygonEditor.clearAdsorbPolygons()
        polygonEditor.close()
        document.getElementById('container').removeChild(button)
      })
      document.getElementById('container').appendChild(button)

      polygonEditor.open()
      polygonEditor.on('end', (event) => {
        resolve(event.target.getPath())
      })
    })
  }
}
globalStore.setFunction('PolygonEditor', PolygonEditor)

const handleMapClick = (e) => {
  const lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
  console.log(lnglat)
  const lnglatInput = document.getElementById('lnglat')
  if (lnglatInput) {
    lnglatInput.value = lnglat
  }
  return lnglat
}
const waitForMapClick = () => {
  return new Promise((resolve) => {
    const handleClick = (e) => {
      const lnglat = e.lnglat.getLng() + ',' + e.lnglat.getLat()
      map.off('click', handleClick)
      resolve(lnglat)
    }
    map.on('click', handleClick)
  })
}
globalStore.setFunction('waitForMapClick', waitForMapClick)
</script>

<style scoped>
/* 添加一些样式 */
#container {
  width: 100%;
  height: 100%;
}
</style>
