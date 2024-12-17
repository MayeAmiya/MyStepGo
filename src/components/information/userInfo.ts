import { Groups } from './groupInfo'
import { pointInfo } from './pointInfo'

class KeywordsList {
  selected: string[] = []
  candidates: string[] = []
  constructor() {
    this.selected = []
    this.candidates = []
  }
}

class currentInfo {
  pageName: string = ''
  pointIndex: number = -1
  infType: string = ''
  mapIndex: number = 1
  pointsInfos: pointInfo[] = []
  constructor() {
    this.pageName = ''
    this.pointIndex = -1
    this.infType = ''
    this.mapIndex = 1
  }
}

class User {
  userid: number = -1
  username: string = ''
  cookie: string = ''
  currentInfo: currentInfo = new currentInfo()
  keywordsList: KeywordsList = new KeywordsList()
  groups: Groups = new Groups()
}

export { User }
