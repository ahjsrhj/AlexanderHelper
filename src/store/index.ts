import { createStore, createLogger } from 'vuex'
import config, { IConfigState } from './modules/config'
import info, { IInfoState } from './modules/info'

export interface IStoreState {
  info: IInfoState
  config: IConfigState
}

const store = createStore<IStoreState>({
  modules: {
    config,
    info,
  },
  plugins: [createLogger()],
})

export default store
