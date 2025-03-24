import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'

export default createStore({
  state: {
    config: {},
  },
  mutations: {
    setConfig(state, val) { 
      state.config = val
    },
  },
  actions: {
    updateUser({ commit }) {
      return new Promise(resolve => {
        api.userConfig().then(res => {
          commit('setUserInfo', res.userinfo)
        }).finally(() => {
          resolve(true)
        })
      })
    },
  },
  plugins: [createPersistedState()]
})
