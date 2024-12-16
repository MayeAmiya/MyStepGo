// 地图数据 含有 地图名，地图ID，地图更新日期，地图标签列表[所有！]
class MapData {
  index: number // 地图ID
  type: string // 地图类型
  updateDate: string // 更新日期
  region: number[] // 区域边界集 围成一个区域
  location: [number, number] // 地图中心位置

  constructor(
    index: number,
    type: string,
    updateDate: string,
    region: number | number[],
    location: [number, number]
  ) {
    this.index = index
    this.type = type
    this.updateDate = updateDate
    this.region = Array.isArray(region) ? region : [region]
    this.location = location
  }
}

class MapDatas {
  mapDataList: MapData[]
  stack: number[]

  push(value: number) {
    this.stack.push(value)
  }

  pop(): number | undefined {
    return this.stack.pop()
  }

  top(): number {
    return this.stack[this.stack.length - 1]
  }

  enter(index: number): void {
    this.stack.push(index)
  }

  async find(index: number): Promise<MapData> {
    // try {
    //   const response = await fetch(`https://api.example.com/mapdata/${index}`)
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok')
    //   }
    //   const data = await response.json()
    //   const mapData = new MapData(
    //     data.index,
    //     data.type,
    //     data.updateDate,
    //     data.region,
    //     data.location
    //   )
    //   this.mapDataList.push(mapData)
    //   return mapData
    // } catch (error) {
    //   console.error('Fetch error:', error)
    //   console.log(index)
    //   const foundMapData = this.mapDataList.find((mapData: MapData) => mapData.index === index)
    //   if (!foundMapData) {
    //     throw new Error(`MapData with index ${index} not found`)
    //   }
    //   console.log(foundMapData)
    //   return foundMapData
    // }
    const foundMapData = this.mapDataList.find((mapData: MapData) => mapData.index === index)
    if (!foundMapData) {
      throw new Error(`MapData with index ${index} not found`)
    }
    return foundMapData
  }

  constructor() {
    this.mapDataList = [
      new MapData(1, 'Global', '2023-10-01', [113.52933,34.808426,113.541119,34.808333,113.541965,34.82718,113.535591,34.826995,113.535365,34.825606,113.530909,34.825606], [113.536674, 34.817112]),
      new MapData(2, 'Global', '2023-10-01', [113.536674, 34.817112,113.536674, 34.817112,113.536674, 34.817112,113.536674, 34.817112], [113.536674, 34.817112])
    ]
    // Global表示大地球地图 1表示地图ID 2023表示最后更新日期 -1表示区域边界集 这里不需要 0,0表示地图中心位置
    this.stack = []
    this.stack.push(1)
    console.log(this.mapDataList[0])
    // 用于存储地图ID 用于地图切换
  }
}

export { MapData, MapDatas }
