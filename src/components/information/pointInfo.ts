class pointInfo {
  id: number // 标签序号
  type: string // 类型
  groupid: number // 组织序号
  father: number // 父级序号
  title: string // 标题
  info: number[] // 信息列表
  keywords: string[] // 关键词
  updateDate: string // 更新日期
  region: number[] // 区域边界集 围成一个区域
  location: number[] // 位置

  constructor(
    id: number,
    type: string,
    groupid: number,
    father: number,
    title: string,
    info: number[],
    keywords: string[],
    updateDate: string,
    region: number | number[],
    location: [number, number]
  ) {
    this.id = id
    this.type = type
    this.groupid = groupid
    this.father = father
    this.title = title
    this.info = Array.isArray(info) ? info : [info]
    this.keywords = Array.isArray(keywords) ? keywords : [keywords]
    this.updateDate = updateDate
    this.region = Array.isArray(region) ? region : [region]
    this.location = location
  }
}

class pointInfos {
  pointInfoList: pointInfo[]
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

  exit(): void {
    this.stack.pop()
  }

  constructor() {
    this.pointInfoList = []
    this.stack = []
    this.stack.push(1)
    this.initializePointInfoList()
  }

  async createPointInfo(
    type: string,
    groupid: number,
    father: number,
    title: string,
    info: number[],
    keywords: string[],
    region: number[], // 区域边界集 围成一个区域
    location: number[]
  ): Promise<void> {
    // try {
    //   const response = await fetch('https://example.com/api/pointInfo', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ id: -1, type, groupid, father, title, info, keywords, location })
    //   })
    //   const data = await response.json()
    //   const newPointInfo = new pointInfo(
    //     data.id,
    //     data.type,
    //     data.groupid,
    //     data.father,
    //     data.title,
    //     data.info,
    //     data.keywords,
    //     data.updateDate,
    //     data.region,
    //     data.location
    //   )
    //   this.pointInfoList.push(newPointInfo)
    // } catch (error) {
    //   console.error('Error creating pointInfo:', error)
    // }
    const currentDate = new Date().toLocaleDateString()
    this.pointInfoList.push(new pointInfo(this.pointInfoList.length + 1, type, groupid, father, title, info, keywords, currentDate, region, location))
  }

  async find(father: number): Promise<pointInfo[]> {
    // fetch(`https://example.com/api/pointInfo?father=${father}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.pointInfoList = data.pointInfo.map(
    //       (item: {
    //         id: number
    //         type: string
    //         groupid: number
    //         father: number
    //         info: string[]
    //         keywords: string[]
    //         location: [number, number]
    //       }) =>
    //         new pointInfo(
    //           item.id,
    //           item.type,
    //           item.groupid,
    //           item.father,
    //           item.info,
    //           item.keywords,
    //           item.location
    //         )
    //     )
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching pointInfo:', error)
    //   })
    return this.pointInfoList.filter((point) => point.father === father)
  }
  async findPointInfo(id: number): Promise<pointInfo> {
    // fetch(`https://example.com/api/pointInfo?id=${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.pointInfoList = data.pointInfo.map(
    //       (item: {
    //         id: number
    //         type: string
    //         groupid: number
    //         father: number
    //         info: string[]
    //         keywords: string[]
    //         location: [number, number]
    //       }) =>
    //         new pointInfo(
    //           item.id,
    //           item.type,
    //           item.groupid,
    //           item.father,
    //           item.info,
    //           item.keywords,
    //           item.location
    //         )
    //     )
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching pointInfo:', error)
    //   })
    const point = this.pointInfoList.find((point) => point.id === id)
    if (!point) {
      throw new Error(`PointInfo with id ${id} not found`)
    }
    return point
  }
  initializePointInfoList() {
    // fetch('https://example.com/api/pointInfo')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.pointInfoList = data.pointInfo.map(
    //       (item: {
    //         id: number
    //         type: string
    //         groupid: number
    //         father: number
    //         info: string[]
    //         keywords: string[]
    //         location: [number, number]
    //       }) =>
    //         new pointInfo(
    //           item.id,
    //           item.type,
    //           item.groupid,
    //           item.father,
    //           item.info,
    //           item.keywords,
    //           item.location
    //         )
    //     )
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching pointInfo:', error)
    //   })
    this.pointInfoList = [
      new pointInfo(1, 'type1', 1, 0, 'p1', [1], ['keyword1'], '2023-10-01', [113.52933, 34.808426, 113.541119, 34.808333, 113.541965, 34.82718, 113.535591, 34.826995, 113.535365, 34.825606, 113.530909, 34.825606], [113.535902, 34.817359]),
      new pointInfo(2, 'Public', 2, 1, 'p2', [2], ['ZZU'], '2023-10-01', [113.536674, 34.817112, 113.536674, 34.817112, 113.536674, 34.817112, 113.536674, 34.817112], [113.535902, 34.817359]),
      new pointInfo(3, 'Public', 3, 2, 'p3', [3], ['Gate'], '2023-10-01', [], [113.535425, 34.808465])
    ]
  }
}

export { pointInfo, pointInfos }
