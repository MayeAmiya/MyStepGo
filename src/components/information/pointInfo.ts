class pointInfo {
  id: number // 标签序号
  type: string // 类型
  groupid: number // 组织序号
  father: number // 父级序号
  title: string // 标题
  info: string[] // 信息列表
  keywords: string[] // 关键词
  location: [number, number] // 位置

  constructor(
    id: number,
    type: string,
    groupid: number,
    father: number,
    title: string,
    info: string[],
    keywords: string[],
    location: [number, number]
  ) {
    this.id = id
    this.type = type
    this.groupid = groupid
    this.father = father
    this.title = title
    this.info = Array.isArray(info) ? info : [info]
    this.keywords = Array.isArray(keywords) ? keywords : [keywords]
    this.location = location
  }
}

class pointInfos {
  pointInfoList: pointInfo[]

  constructor() {
    this.pointInfoList = []
    this.initializePointInfoList()
  }

  async createPointInfo(
    type: string,
    groupid: number,
    father: number,
    title: string,
    info: string[],
    keywords: string[],
    location: [number, number]
  ): Promise<void> {
    try {
      const response = await fetch('https://example.com/api/pointInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: -1, type, groupid, father, title, info, keywords, location })
      })
      const data = await response.json()
      const newPointInfo = new pointInfo(
        data.id,
        data.type,
        data.groupid,
        data.father,
        data.title,
        data.info,
        data.keywords,
        data.location
      )
      this.pointInfoList.push(newPointInfo)
    } catch (error) {
      console.error('Error creating pointInfo:', error)
    }
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
      new pointInfo(1, 'type1', 1, 0, 'p1', ['info1'], ['keyword1'], [0, 0]),
      new pointInfo(2, 'Public', 2, 1, 'p2', ['School'], ['ZZU'], [113.535902, 34.817359]),
      new pointInfo(3, 'Public', 3, 2, 'p3', ['Gate'], ['Gate'], [113.535425, 34.808465])
    ]
  }
}

export { pointInfo, pointInfos }
