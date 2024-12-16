import { defineStore } from 'pinia'
import { pointInfos } from './components/information/pointInfo'
import { Groups } from './components/information/tagInfo/groupInfo'
import { User } from './components/information/userInfo'
import { MapDatas } from './components/information/tagInfo/mapInfo'
export const useGlobalStore = defineStore('counter', {
  state: () => {
    const functions = new Map<string, (...args: unknown[]) => unknown>() // 函数集
    const points = new pointInfos() // 点集
    const groups = new Groups() // 组集
    const user = new User() // 用户信息
    const mapDatas = new MapDatas() // 地图集
    const Global = {
      functions,
      mapDatas,
      points,
      groups,
      user
    }
    return { Global }
  },
  actions: {
    setFunction<T extends (...args: unknown[]) => unknown>(name: string, fn: T) {
      this.Global.functions.set(name, fn)
    },
  }
})

// 这里的信息都是更上一级 或者说electron的一个数据线程处理后抽出来的 在所属页面变化时 也会更新
