class emblemInfo {
  emblemId: number // 标志序号
  emblemType: string // 标志类型
  emblemIcon: string // 标志图标
  emblemInfo: string // 标志信息
  emblemTrigger: string // 标志触发
  emblemPosition: { x: number; y: number }

  constructor(
    emblemId: number,
    emblemType: string,
    emblemIcon: string,
    emblemInfo: string,
    emblemTrigger: string,
    emblemPosition: { x: number; y: number }
  ) {
    this.emblemId = emblemId
    this.emblemType = emblemType
    this.emblemIcon = emblemIcon
    this.emblemInfo = emblemInfo
    this.emblemTrigger = emblemTrigger
    this.emblemPosition = emblemPosition
  }
}

export { emblemInfo }
