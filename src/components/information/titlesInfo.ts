class TitleInfo {
  public father: number // 父级序号 该title属于一个point
  public pointid: number // 对应点的序号 可以为-1 即不对应任何点
  public titleid: number // 标题序号
  public title: string // 标题
  public creater: number // 创建者、
  public date: string // 创建日期
  public content: string // 内容
  public lastedit: string // 最后编辑日期
  constructor(
    father: number,
    pointid: number,
    titleid: number,
    title: string,
    creater: number,
    date: string,
    content: string,
    lastedit: string
  ) {
    this.father = father
    this.pointid = pointid
    this.titleid = titleid
    this.title = title
    this.creater = creater
    this.date = date
    this.content = content
    this.lastedit = lastedit
  }
}

class TitleInfos {
  public titleInfoList: TitleInfo[]

  constructor() {
    this.titleInfoList = []
    this.createSampleTitleInfos()
  }

  // (alias) new TitleInfo
  // (father: 当前的mapid, pointid: 选定一个点或不选定, titleid: -2 服务器决定, title: string, creater: id 用户提供,
  // date: 服务器决定, content: 用户 这是一串id, lastedit: 服务器决定): TitleInfo
  async createTitle(
    father: number,
    pointid: number,
    title: string,
    creater: number,
    content: string
  ): Promise<void> {
    //   try {
    //     const response = await fetch('https://example.com/api/titles', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ father, pointid, title, creater, content })
    //     })
    //     const data = await response.json()
    //     const newTitle = new TitleInfo(
    //       data.father,
    //       data.pointid,
    //       data.titleid,
    //       data.title,
    //       data.creater,
    //       data.date,
    //       data.content,
    //       data.lastedit
    //     )
    //     this.titleInfoList.push(newTitle)
    //   } catch (error) {
    //     console.error('Error creating title:', error)
    //   }
    this.titleInfoList.push(new TitleInfo(father, pointid, this.titleInfoList.length + 1, title, creater, new Date().toLocaleDateString(), content, new Date().toLocaleDateString()))
  }

  async find(father: number): Promise<TitleInfo[]> {
    // try {
    //   const response = await fetch(`https://example.com/api/titles?father=${father}`)
    //   const data = await response.json()
    //   this.titleInfoList = data.map(
    //     (item: {
    //       father: number
    //       pointid: number
    //       titleid: number
    //       title: string
    //       creater: string
    //       date: string
    //       content: string
    //       lastedit: string
    //     }) =>
    //       new TitleInfo(
    //         item.father,
    //         item.pointid,
    //         item.titleid,
    //         item.title,
    //         item.creater,
    //         item.date,
    //         item.content,
    //         item.lastedit
    //       )
    //   )
    // } catch (error) {
    //   console.error('Error fetching titles:', error)
    // }
    return this.titleInfoList.filter((title) => title.father === father)
  }

  public createSampleTitleInfos(): void {
    this.titleInfoList = [
      new TitleInfo(1, 1, 1, 'Sample Title 1', 1, '2023-01-01', 'Sample content 1', '2023-01-02'),
      new TitleInfo(2, 2, 2, 'Sample Title 2', 2, '2023-02-01', 'Sample content 2', '2023-02-02'),
      new TitleInfo(3, 3, 3, 'Sample Title 3', 3, '2023-03-01', 'Sample content 3', '2023-03-02')
    ]
  }
  // public async fetchTitlesByFather(father: number): Promise<void> {
  //   try {
  //     const response = await fetch(`https://api.example.com/titles?father=${father}`);
  //     const data = await response.json();
  //     this.titleInfoList = data.map((item: any) => new TitleInfo(
  //       item.father,
  //       item.pointid,
  //       item.title,
  //       item.creater,
  //       item.date,
  //       item.content,
  //       item.lastedit
  //     ));
  //   } catch (error) {
  //     console.error('Error fetching titles:', error);
  //   }
  // }
  // public async getTitlesByIds(titleIds: number[]): Promise<TitleInfo[]> {
  //   try {
  //     const response = await fetch(`https://api.example.com/titles?ids=${titleIds.join(',')}`)
  //     const data = await response.json()
  //     return data.map(
  //       (item: {
  //         father: number
  //         pointid: number
  //         titleid: number
  //         title: string
  //         creater: string
  //         date: string
  //         content: string
  //         lastedit: string
  //       }) =>
  //         new TitleInfo(
  //           item.father,
  //           item.pointid,
  //           item.titleid,
  //           item.title,
  //           item.creater,
  //           item.date,
  //           item.content,
  //           item.lastedit
  //         )
  //     )
  //   } catch (error) {
  //     console.error('Error fetching titles:', error)
  //     return []
  //   }
  // }
}
export { TitleInfo, TitleInfos }
