<template>
    <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  createDiscreteApi
} from 'naive-ui'

const { message } = createDiscreteApi(["message"])

onMounted(() => {
  message.info('欢迎使用 Naive UI', { duration: 30000 })
})
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  user-select: none;
}

#app {
  font-size: 12px;
  background-color: #fff;
  color: #333;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
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
