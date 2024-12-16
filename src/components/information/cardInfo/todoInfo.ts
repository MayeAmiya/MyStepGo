// TODO 含有 发起者，执行者，期限，事件，附加内容，完成条件等
class TODO {
  id: number // 任务序号
  initiator: number // 发起者序号
  init_type: string // 发起者类型
  executor: number[] // 执行者序号
  exec_type: string // 执行者类型
  deadline: string // 期限
  event: number[] // 事件序号
  additionalContent: string // 附加内容
  completionCriteria: string // 完成条件

  constructor(
    id: number,
    initiator: number,
    init_type: string,
    executor: number[],
    exec_type: string,
    deadline: string,
    event: number[],
    additionalContent: string,
    completionCriteria: string
  ) {
    this.id = id
    this.initiator = initiator
    this.init_type = init_type
    this.executor = executor
    this.exec_type = exec_type
    this.deadline = deadline
    this.event = event
    this.additionalContent = additionalContent
    this.completionCriteria = completionCriteria
  }
}

export { TODO }
