import { Module } from 'vuex'
import { IHPInfo } from '../../model/actModel'

const MUTATION_UPDATE_ZONE_ID = 'MUTATION_UPDATE_ZONE_ID'
const MUTATION_UPDATE_P1_BOSS = 'MUTATION_UPDATE_P1_BOSS'
const MUTATION_UPDATE_P1_HAND = 'MUTATION_UPDATE_P1_HAND'

const MUTATION_RESET_HP_INFO = 'MUTATION_RESET_HP_INFO'

export interface IInfoState {
  enabled: boolean
  zoneID: number
  p1Boss: IHPInfo
  p1Hand: IHPInfo
}

const module: Module<IInfoState, any> = {
  namespaced: true,
  state: {
    zoneID: 0,
    enabled: false,
    p1Boss: {
      maxHP: 0,
      currentHP: 0,
    },
    p1Hand: {
      maxHP: 0,
      currentHP: 0,
    },
  },
  mutations: {
    [MUTATION_UPDATE_ZONE_ID](state: IInfoState, zoneID: number) {
      state.zoneID = zoneID
      if (zoneID === 887) {
        state.enabled = true
      } else {
        state.enabled = false
      }
    },
    [MUTATION_UPDATE_P1_BOSS](state: IInfoState, info: IHPInfo) {
      state.p1Boss = info
    },
    [MUTATION_UPDATE_P1_HAND](state: IInfoState, info: IHPInfo) {
      state.p1Hand = info
    },
    [MUTATION_RESET_HP_INFO](state: IInfoState) {
      state.p1Boss.currentHP = 0
      state.p1Boss.maxHP = 0
      state.p1Hand.currentHP = 0
      state.p1Hand.maxHP = 0
    },
  },
  actions: {
    updateZoneID({ commit }, zoneID: number) {
      commit(MUTATION_UPDATE_ZONE_ID, zoneID)
    },
    updateP1BossInfo({ commit }, info: IHPInfo) {
      if (info.currentHP <= 0) {
        // 重置
        commit(MUTATION_RESET_HP_INFO)
      } else {
        commit(MUTATION_UPDATE_P1_BOSS, info)
      }
    },
    updateP1HandInfo({ commit }, info: IHPInfo) {
      commit(MUTATION_UPDATE_P1_HAND, info)
    },
    resetHPInfo({ commit }) {
      commit(MUTATION_RESET_HP_INFO)
    },
  },
}

export default module
