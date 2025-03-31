<template>
  <ConHeader />
  <router-view />
  <ConBottom />
  <NBackTop :listen-to="'#app'" />
</template>

<script setup>
import { NBackTop } from "naive-ui"
import ConHeader from "@/components/ConHeader.vue"
import ConBottom from "@/components/ConBottom.vue"
import { onMounted } from 'vue'
import {
  createDiscreteApi
} from 'naive-ui'
import store from "./store"

const { message } = createDiscreteApi(["message"])

onMounted(() => {
  // message.info('欢迎使用 Naive UI', { duration: 30000 })
})

store.dispatch('updateConfig')
store.dispatch('updateAds')
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
/* 平板设备 (750px及以上) */
@media (min-width: 750px) {

  html,
  body {
    /* 平板样式 */
    font-size: 20px;
  }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {

  html,
  body {
    /* 平板样式 */
    font-size: 20px;
  }
}

div {
  box-sizing: border-box;
  transition: all ease .2s, font-size ease 0s;
}

input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
}
</style>
