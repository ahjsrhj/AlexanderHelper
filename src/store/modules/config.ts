import { Module } from 'vuex'

const MUTATION_UPDATE_SCALE = 'MUTATION_UPDATE_SCALE'

export interface IConfigState {
  scale?: number
}

const module: Module<IConfigState, any> = {
  namespaced: true,
  state: {
    scale: 1,
  },
  mutations: {
    [MUTATION_UPDATE_SCALE](state: IConfigState, scale: number) {
      state.scale = scale
    },
  },
  actions: {
    updateScale({ commit }, scale: number) {
      commit(MUTATION_UPDATE_SCALE, scale)
    },
  },
}

export default module
