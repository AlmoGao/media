<template>
  <!-- 顶飘 -->
  <img class="top-ad" v-show="showTop" @click="open(site.top_url)"
    style="width: 100%;position: fixed;left: 0;z-index: 9;height: auto;max-height: 120px;" v-if="site.top_image"
    :src="site.top_image" alt="">
  <!-- 头部 -->
  <ConHeader />
  <!-- 内容 -->
  <router-view class="page" />
  <!-- 底部 -->
  <ConBottom />
  <!-- 回到顶部 -->
  <NBackTop :listen-to="'#app'" :bottom="'100px'" :right="'20px'">
    <img style="width:50px;height:50px" src="@/assets/back_top_icon.webp" alt="">
  </NBackTop>
  <!-- 开屏广告 -->
  <ConAdPopup />
  <!-- 底飘 -->
  <div class="bb-box" v-if="site.bottom_image" @click="open(site.bottom_url)">
    <img style="width: 100%;max-height: 120px;" :src="site.bottom_image" alt="">
    <img
      style="width: 100%;max-height: 120px;position: fixed;bottom: 0;left: 0;z-index: 9;height: auto;cursor: pointer;"
      :src="site.bottom_image" alt="">
  </div>

</template>

<script setup>
import { NBackTop } from "naive-ui"
import ConHeader from "@/components/ConHeader.vue"
import ConBottom from "@/components/ConBottom.vue"
import ConAdPopup from "@/components/ConAdPopup.vue"
import { onMounted, computed, ref } from 'vue'
import {
  createDiscreteApi
} from 'naive-ui'
import store from "./store"
import { useRoute } from "vue-router"

const route = useRoute()
const { message } = createDiscreteApi(["message"])
const site = computed(() => store.state.config.site || {})
if (site.value.name) {
  document.title = site.value.name
}

const open = url => {
  window.open(url)
}

const showTop = ref(false)
onMounted(() => {
  // message.info('欢迎使用 Naive UI', { duration: 30000 })
  document.querySelector('#app').addEventListener('scroll', e => {
    showTop.value = e.target.scrollTop > 400
    sessionStorage.setItem(`scroll_${route.name}`, e.target.scrollTop)
  })
})

store.dispatch('updateConfig')
store.dispatch('updateCategory')
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  font-size: 5vw;
  background-color: #e8e8e8;
}

#app {
  background-color: #e8e8e8;
  color: #3d3d3d;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.maxwidth {
  max-width: 1323px;
}

.page {
  min-height: 90vh;
}

.n-back-top {
  z-index: 999;
}

.gradient-text {
  background: linear-gradient(90deg, #d23c96 0%, #f49f02 100%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
  display: inline-block;
  /* 确保渐变效果正确应用 */
}

.ad-texts {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 auto;
  font-size: 4vw;
  padding: 4vw 0;

  .ad-text {
    margin: 0 2vw 1vw 0;
    cursor: pointer;
  }
}
.top-ad {
  top: 0;
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {

  html,
  body {
    /* 平板样式 */
    font-size: 20px;
  }

  .page {
    min-height: 80vh;
  }

  .ad-texts {
    font-size: 24px;
    padding: 24px 0;

    .ad-text {
      margin: 0 20px 14px 0;
    }
  }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {

  html,
  body {
    /* 平板样式 */
    font-size: 20px;
  }

  .page {
    min-height: 80vh;
  }

  .ad-texts {
    font-size: 28px;
    padding: 28px 0;

    .ad-text {
      margin: 0 24px 16px 0;
    }
  }

  .top-ad {
    top: 100px;
  }
}

/* Firefox 兼容 */
* {
  scrollbar-width: thin;
  scrollbar-color: #dc4891 rgba(220, 72, 145, 0.1);
}

div {
  box-sizing: border-box;
  transition: all ease .2s, font-size ease 0s;

  /* 全局滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
    /* 垂直滚动条宽度 */
    height: 6px;
    /* 水平滚动条高度 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(220, 72, 145, 0.08);
    /* 半透明轨道 */
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dc4891;
    /* 主色 */
    border-radius: 3px;
    transition: background 0.2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(220, 72, 145, 0.8);
    /* 悬停时稍透明 */
  }


}

input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
}
</style>
