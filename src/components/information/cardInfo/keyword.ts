class Keyword {
  public selected: string[] // 已选关键词
  public candidate: string[] // 候选关键词
  public user: string[]

  constructor(selected: string[] = [], candidate: string[] = [], user: string[] = []) {
    this.selected = selected
    this.candidate = candidate
    this.user = user
  }
}

export { Keyword }
