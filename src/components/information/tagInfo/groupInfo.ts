class Group {
  id: number // 组织序号
  father: number // 父级序号 群号
  members: number[] // 成员序号 包括群
  masterID: number // 群主序号
  adminID: number[] // 管理员序号
  info: number[] // 信息列表 包括群组信息 群组对应标签信息 群组对应活动信息

  constructor(
    id: number,
    father: number,
    members: number[],
    masterID: number,
    adminID: number[],
    info: number[]
  ) {
    this.id = id
    this.father = father
    this.members = members
    this.masterID = masterID
    this.adminID = adminID
    this.info = info
  }
}

class Groups {
  groups: Group[] = []

  // async initializeFromNetwork(ids: number[]): Promise<void> {
  //   const fetchGroupInfo = async (id: number): Promise<Group> => {
  //     // Replace with actual network request logic
  //     const response = await fetch(`https://api.example.com/groups/${id}`)
  //     const data = await response.json()
  //     return new Group(data.id, data.father, data.members, data.masterID, data.adminID, data.info)
  //   }

  //   this.groups = await Promise.all(ids.map((id) => fetchGroupInfo(id)))
  // }
  initializeSampleData(): void {
    this.groups = [
      new Group(1, 0, [2, 3, 4], 1, [2, 3], [101, 102]),
      new Group(2, 1, [5, 6], 2, [4], [103, 104]),
      new Group(3, 1, [7, 8], 3, [5], [105, 106])
    ]
  }
}

export { Group, Groups }
