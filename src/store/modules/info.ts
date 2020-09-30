import { Module } from 'vuex'
import { IHPInfo } from '../../model/actModel'
import { IStoreState } from '../index'

const MUTATION_UPDATE_ZONE_ID = 'MUTATION_UPDATE_ZONE_ID'
const MUTATION_UPDATE_P1_BOSS = 'MUTATION_UPDATE_P1_BOSS'
const MUTATION_UPDATE_P1_HAND = 'MUTATION_UPDATE_P1_HAND'

const MUTATION_UPDATE_P2_MAIN = 'MUTATION_UPDATE_P2_MAIN'
const MUTATION_UPDATE_P2_SUB = 'MUTATION_UPDATE_P2_SUB'

const MUTATION_RESET_HP_INFO = 'MUTATION_RESET_HP_INFO'

const calcValue = (
  data: IHPInfo,
  name: string,
): { name: string; value: number } => {
  const { currentHP, maxHP } = data
  return {
    name,
    value: maxHP > 0 ? +((currentHP / maxHP) * 100).toFixed(2) : 0,
  }
}

export interface IInfoState {
  enabled: boolean
  zoneID: number
  p1Boss: IHPInfo
  p1Hand: IHPInfo
  p2Main: IHPInfo
  p2Sub: IHPInfo
  p1Pass: boolean
}

const module: Module<IInfoState, IStoreState> = {
  namespaced: true,
  state: {
    zoneID: 0,
    enabled: false,
    p1Pass: false,
    p1Boss: {
      maxHP: 0,
      currentHP: 0,
    },
    p1Hand: {
      maxHP: 0,
      currentHP: 0,
    },
    p2Main: {
      maxHP: 0,
      currentHP: 0,
    },
    p2Sub: {
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
      if (info.currentHP <= 0) {
        // p1 pass
        state.p1Pass = true
        state.p1Boss = {
          currentHP: 0,
          maxHP: 0,
        }
        state.p1Hand = {
          currentHP: 0,
          maxHP: 0,
        }
      } else {
        state.p1Boss = info
      }
    },
    [MUTATION_UPDATE_P1_HAND](state: IInfoState, info: IHPInfo) {
      state.p1Hand = info
    },
    [MUTATION_RESET_HP_INFO](state: IInfoState) {
      state.p1Boss.currentHP = 0
      state.p1Boss.maxHP = 0
      state.p1Hand.currentHP = 0
      state.p1Hand.maxHP = 0
      state.p2Main.maxHP = 0
      state.p2Main.maxHP = 0
      state.p2Sub.maxHP = 0
      state.p2Sub.currentHP = 0
      state.p1Pass = false
    },
    [MUTATION_UPDATE_P2_MAIN](state: IInfoState, info: IHPInfo) {
      state.p2Main = info
    },
    [MUTATION_UPDATE_P2_SUB](state: IInfoState, info: IHPInfo) {
      state.p2Sub = info
    },
  },
  actions: {
    updateZoneID({ commit }, zoneID: number) {
      commit(MUTATION_UPDATE_ZONE_ID, zoneID)
    },
    updateP1BossInfo({ commit }, info: IHPInfo) {
      commit(MUTATION_UPDATE_P1_BOSS, info)
    },
    updateP1HandInfo({ commit }, info: IHPInfo) {
      commit(MUTATION_UPDATE_P1_HAND, info)
    },
    updateP2MainInfo({ commit }, info: IHPInfo) {
      commit(MUTATION_UPDATE_P2_MAIN, info)
    },
    updateP2SubInfo({ commit }, info: IHPInfo) {
      commit(MUTATION_UPDATE_P2_SUB, info)
    },
    resetHPInfo({ commit }) {
      commit(MUTATION_RESET_HP_INFO)
    },
  },
  getters: {
    isP1(state: IInfoState) {
      const {
        p1Boss: { currentHP },
      } = state
      return currentHP > 0
    },
    isP2(state: IInfoState) {
      const { p2Main, p2Sub } = state
      return p2Main.currentHP > 0 || p2Sub.currentHP > 0
    },
    mainBoss(state: IInfoState, getters, rootState) {
      if (getters.isP1) {
        return calcValue(state.p1Boss, rootState.config.names.p1Main)
      } else if (getters.isP2) {
        return calcValue(state.p2Main, rootState.config.names.p2Main)
      }
      return {
        name: '',
        value: 0,
      }
    },
    subBoss(state: IInfoState, getters, rootState) {
      if (getters.isP1) {
        return calcValue(state.p1Hand, rootState.config.names.p1Sub)
      } else if (getters.isP2) {
        return calcValue(state.p2Sub, rootState.config.names.p2Sub)
      }
      return {
        name: '',
        value: 0,
      }
    },
    disparityHP(state: IInfoState, getters) {
      const mainBossVal = getters.mainBoss.value
      const subBossVal = getters.subBoss.value
      if (mainBossVal > 0 && subBossVal > 0) {
        return Math.abs(mainBossVal - subBossVal).toFixed(2)
      }
      return 0
    },
  },
}

export default module
