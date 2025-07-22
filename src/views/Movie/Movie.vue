<!-- 首页 -->
<template>
  <div class="page-movie">
    <!-- 顶部 -->
    <div class="top">
      {{ site.name }}
    </div>


    <!-- 文字 -->
    <div class="maxwidth ad-texts" v-if="ads.tad && ads.tad.length">
      <div @click="openAd('tad', item)" class="ad-text" v-for="item in ads.tad || []" :key="'ad' + item.id">{{
        item.title }}</div>
    </div>

    <!-- 板块 -->
    <div class="ad-block">
      <div class="block-item" v-for="i in 10" :key="i">模块广告</div>
    </div>

    <!-- banner -->
    <div v-if="ads.banner && ads.banner.length" class="maxwidth" style="margin: 0 auto">
      <img @click="openAd('banner', item)"
        style="width:100%;height:auto;display: block;cursor: pointer;max-height: 120px;" v-for="item in ads.banner"
        :key="item.id" :src="item.image" alt="">
    </div>

    <!-- 分类 -->
    <div class="class-box">
      <div class="class-con">
        <div class="class-title">视频</div>
        <div class="class-items">
          <div class="class-item" @click="changeCate(item)" :class="{ 'active-class': activeId == item.id }"
            v-for="item in category" :key="item.id">
            <span>{{ item.name }}</span>
            <img src="@/assets/hot.gif" alt="">
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="inner-search">
      <div class="title">搜索:</div>
      <div class="ipt">
        <input v-model="searchStr" type="text">
      </div>
      <button @click="goSearch">搜索</button>
    </div>


    <!-- 电影列表 -->
    <div>{{ }}</div>
    <ConList :title="cateTitle" :from="'movies'" @more="getList" :list="list" :midApps="midApps" :loading="loading"
      :finish="finish" style="margin: 0 auto;" />


    <!-- 右侧广告 -->
    <ConAdRight :list="rightApps" v-if="rightApps.length" />
  </div>
</template>


<script setup>
import ConAdRight from "@/components/ConAdRight.vue"
import { NCarousel, NCarouselItem } from 'naive-ui'
import ConList from "@/components/ConList.vue"
import store from '@/store';
import { computed, watch, ref } from "vue"
import https from '@/api';
import router from "@/router";
store.dispatch('updateAds', 2)

const site = computed(() => store.state.config.site || {})
const category = computed(() => store.state.category || [])
const ads = computed(() => store.state.ads[2] || {})
const rightApps = computed(() => { // 右侧广告
  if (!ads.value || !ads.value.app || !ads.value.app.length) return []
  return ads.value.app.filter(item => item.flag == 1) || []
})
const midApps = computed(() => { // 中间广告
  if (!ads.value || !ads.value.app || !ads.value.app.length) return []
  return (ads.value.app.filter(item => item.flag == 0) || []).map(item => {
    item.type = 'ad'
    return item
  })
})
const innerAds = computed(() => { // 列表插入广告
  if (!ads.value || !ads.value.vad || !ads.value.vad.length) return []
  return ads.value.vad
})
const activeId = ref(sessionStorage.getItem('movie_activeId') || '')




const loading = ref(false)
const page = ref(sessionStorage.getItem('movie_page') || 0)
const finish = ref(false)
const list = ref([])
try {
  list.value = JSON.parse(sessionStorage.getItem('movie_list') || '[]')
} catch {
  list.value = []
}
const getList = () => {
  if (loading.value || finish.value) return
  loading.value = true
  page.value++
  const id = activeId.value
  https.category_video(activeId.value, page.value).then(res => {
    if (id !== activeId.value) return
    if (!res || !res.length) return finish.value = true
    // 替换内部广告
    if (innerAds.value && innerAds.value.length) {
      res.forEach((item, i) => {
        innerAds.value.forEach(ad => {
          if (i + 1 == ad.weigh) {
            res[i] = ad
            res[i].is_ad = true
          }
        })
      })
    }
    list.value.push(...res)

    sessionStorage.setItem('movie_page', page.value)
    sessionStorage.setItem('movie_list', JSON.stringify(list.value))
  }).finally(() => {
    if (id !== activeId.value) return
    loading.value = false
  })
}
const reset = () => {
  loading.value = false
  finish.value = false
  list.value = []
  page.value = 0
  getList()
}
const cateTitle = computed(() => {
  if (!category.value || !category.value.length) return ''
  const target = category.value.find(a => a.id == activeId.value)
  if (target) return target.name
  return ''
})
const changeCate = item => {
  activeId.value = item.id
  reset()
  sessionStorage.setItem('movie_activeId', activeId.value)
}


watch(() => category.value, val => {
  if (val && val.length && !activeId.value) {
    activeId.value = val[0].id
    getList()
    sessionStorage.setItem('movie_activeId', activeId.value)
  }
}, { immediate: true })

const openAd = (type, item) => {
  store.commit('openad', {
    type,
    item
  })
}


const searchStr = ref('')
const goSearch = () => {
  sessionStorage.setItem('search_list', '[]')
  sessionStorage.setItem('search_word', searchStr.value)
  router.push({
    name: 'search'
  })
}

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-movie {



  /* 移动设备样式 */
  .top {
    width: 100%;
    height: calc(var(--vw) * 12);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .cate-box {
    margin: 0 auto;
    white-space: nowrap;
    overflow-x: auto;
    padding: calc(var(--vw) * 4);

    .cate-item {
      margin: 0 calc(var(--vw) * 4) calc(var(--vw) * 2) 0;
      display: inline-block;
      cursor: pointer;
    }

    .active-cate {
      color: #dc4891;
      border-radius: calc(var(--vw) * 2);
      border-bottom: calc(var(--vw) * 0.5) solid #dc4891;
    }
  }

  .banners {
    display: none;
  }

  .banners-h5 {
    display: block;
    height: calc(var(--vw) * 60);

    .carousel-img {
      width: 100%;
      height: calc(var(--vw) * 60);
    }
  }

}

</style>