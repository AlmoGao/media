import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'

export default createStore({
  state: {
    config: {},
    ads: {},
    category: []
  },
  mutations: {
    setConfig(state, val) {
      state.config = val
    },
    setAds(state, val) {
      state.ads = val
    },
    setCategory(state, val) {
      state.category = val
    },
  },
  actions: {
    updateConfig({ commit }) { // 更新配置
      return new Promise(resolve => {
        api.index().then(res => {
          commit('setConfig', res)
          if (res.site?.name) {
            document.title = res.site.name
          }
        }).finally(() => {
          resolve(true)
        })
      })
    },
    updateAds({ commit }) { // 更新广告
      return new Promise(resolve => {
        api.indexAd().then(res => {
          commit('setAds', res)
        }).finally(() => {
          resolve(true)
        })
      })
    },
    updateCategory({ commit }) { // 更新分类
      return new Promise(resolve => {
        api.category().then(res => {
          commit('setCategory', res)
        }).finally(() => {
          resolve(true)
        })
      })
    },
  },
  plugins: [createPersistedState()]
})
