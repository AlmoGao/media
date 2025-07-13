import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import api from '@/api'
import router from '@/router'

export default createStore({
  state: {
    config: {},
    ads: {
      1: {}, // 首页
      2: {}, // 影片
      3: {}, // 福利页
      7: {}, // 搜索页
      5: {}, // 消息页
      6: {}, // 详情页
    },
    category: [],

    video: {}, // 视频
  },
  mutations: {
    openad(state, val) { // 打开广告
      if (val.item.url) window.open(val.item.url)
      switch (val.type) {
        case 'vad':
          break
        case 'tad':
          break
        case 'carousel':
          break
        case 'banner':
          break
        case 'app':
          break
        case 'inner':
          break
      }
    },
    setConfig(state, val) {
      state.config = val
    },
    setAds(state, { key, val }) {
      state.ads[key] = val || {}
    },
    setCategory(state, val) {
      state.category = val
    },
    setVideo(state, val) {
      state.video = val || {}
    },
    goVideoInfo(state, val) {
      state.video = val || {}
      if (router.currentRoute.value.name == 'info') {
        router.replace({ name: 'wait' }).then(() => {
          router.replace({ name: 'info' })
        })
      } else {
        router.push({ name: 'wait' }).then(() => {
          router.replace({ name: 'info' })
        })
      }
    }
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
    updateAds({ commit }, key) { // 更新广告
      return new Promise(resolve => {
        api.indexAd(key).then(res => {
          commit('setAds', {
            key,
            val: res
          })
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
