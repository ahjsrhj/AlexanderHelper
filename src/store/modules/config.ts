import { Module } from 'vuex'
import {
  p1MainName,
  p1SubName,
  p2MainName,
  p2SubName,
  getEnemyHPRegex,
} from '../../const'

const MUTATION_UPDATE_SCALE = 'MUTATION_UPDATE_SCALE'
const MUTATION_UPDATE_BORDER = 'MUTATION_UPDATE_BORDER'
const MUTATION_UPDATE_NAMES = 'MUTATION_UPDATE_NAMES'

export interface INames {
  p1Main: string
  p1Sub: string
  p2Main: string
  p2Sub: string
}

export interface IConfigState {
  scale: number
  border: boolean
  names: INames
  configWindow: {
    width: number
    height: number
  }
}

const module: Module<IConfigState, any> = {
  namespaced: true,
  state: {
    scale: 1,
    border: false,
    names: {
      p1Main: p1MainName,
      p1Sub: p1SubName,
      p2Main: p2MainName,
      p2Sub: p2SubName,
    },
    configWindow: {
      width: 600,
      height: 300,
    },
  },
  mutations: {
    [MUTATION_UPDATE_SCALE](state: IConfigState, scale: number) {
      state.scale = scale
    },
    [MUTATION_UPDATE_BORDER](state: IConfigState, border: boolean) {
      state.border = border
    },
    [MUTATION_UPDATE_NAMES](state: IConfigState, names: INames) {
      state.names = names
    },
  },
  actions: {
    updateScale({ commit }, scale: number) {
      commit(MUTATION_UPDATE_SCALE, scale)
    },
    updateBorder({ commit }, border: boolean) {
      commit(MUTATION_UPDATE_BORDER, border)
    },
    updateNames({ commit }, names: INames) {
      commit(MUTATION_UPDATE_NAMES, names)
    },
  },
  getters: {
    p1MainRegex: state => getEnemyHPRegex(state.names.p1Main),
    p1SubRegex: state => getEnemyHPRegex(state.names.p1Sub),
    p2MainRegex: state => getEnemyHPRegex(state.names.p2Main),
    p2SubRegex: state => getEnemyHPRegex(state.names.p2Sub),
  },
}

export default module
