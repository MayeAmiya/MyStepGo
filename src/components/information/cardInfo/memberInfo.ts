// 指向的成员的信息
class Member {
  name: string // 名称
  index: number // 序号
  type: string // 类型

  info: number[]

  constructor(name: string, index: number, type: string, inf: number[]) {
    this.name = name
    this.index = index
    this.type = type
    this.info = inf
  }
}

class Members {
  public MemberArray: Member[] = []

  constructor() {
    this.init()
  }

  public init() {
    this.MemberArray = [
      new Member('Alice', 1, 'public', []),
      new Member('Bob', 2, 'public', []),
      new Member('Charlie', 3, 'public', []),
      new Member('David', 4, 'public', []),
      new Member('Eve', 5, 'public', []),
      new Member('Frank', 6, 'public', []),
      new Member('Grace', 7, 'public', []),
      new Member('Heidi', 8, 'public', []),
      new Member('Ivan', 9, 'public', []),
      new Member('Judy', 10, 'public', []),
      new Member('Mallory', 11, 'public', []),
      new Member('Niaj', 12, 'public', []),
      new Member('Olivia', 13, 'public', []),
      new Member('Peggy', 14, 'public', []),
      new Member('Sybil', 15, 'public', []),
      new Member('Trent', 16, 'public', []),
      new Member('Victor', 17, 'public', []),
      new Member('Walter', 18, 'public', []),
      new Member('Xavier', 19, 'public', []),
      new Member('Yvonne', 20, 'public', [])
    ]
  }
}

export { Member, Members }
