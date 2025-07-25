<!-- 首页 -->
<template>
  <div class="page-movie">
    <!-- 顶部 -->
    <div class="top">
      {{ site.name }}
    </div>


    <!-- 文字 -->
    <div class="maxwidth ad-texts" v-if="top_tad && top_tad.length">
      <div @click="openAd('tad', item)" class="ad-text" v-for="item in top_tad || []" :key="'ad' + item.id">{{
        item.title }}</div>
    </div>

    <!-- 板块 -->
    <div class="ad-block" v-if="banner_on_tad && banner_on_tad.length">
      <div class="block-item" @click="openAd('banner_on_tad', item)" v-for="(item, i) in banner_on_tad" :key="i">{{ item.title }}</div>
    </div>

    <!-- banner -->
    <div v-if="banner && banner.length" class="maxwidth" style="margin: 0 auto">
      <img @click="openAd('banner', item)"
        style="width:100%;height:auto;display: block;cursor: pointer;max-height: 120px;" v-for="item in banner"
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
    <ConList :title="keyWord + '搜索结果'" :from="'movies'" @more="getList" :list="list" :midApps="midApps" :loading="loading"
      :finish="finish" style="margin: 0 auto;" />


    <!-- 右侧广告 -->
    <ConAdRight :list="rightApps"  />
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
store.dispatch('updateAds', 7)

const site = computed(() => store.state.config.site || {})
const top_tad = computed(() => store.state.config?.top_tad || [])
const banner_on_tad = computed(() => store.state.config?.banner_on_tad || [])
const banner = computed(() => store.state.config?.banner || [])
const category = computed(() => store.state.category || [])
const ads = computed(() => store.state.ads[7] || {})
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




const keyWord = ref(sessionStorage.getItem('search_word') || '')
const loading = ref(false)
const page = ref(sessionStorage.getItem('search_page') || 0)
const finish = ref(false)
const list = ref([])
try {
    list.value = JSON.parse(sessionStorage.getItem('search_list') || '[]')
} catch {
    list.value = []
}

const getList = () => {
    if (loading.value || finish.value || keyWord.value === '') return
    loading.value = true
    page.value++
    const word = keyWord.value
    https.search_video(keyWord.value || '', page.value).then(res => {
        if (word !== keyWord.value) return
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

        sessionStorage.setItem('search_page', page.value)
        sessionStorage.setItem('search_word', keyWord.value)
        sessionStorage.setItem('search_list', JSON.stringify(list.value))

    }).finally(() => {
        if (word !== keyWord.value) return
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
const searchStr = ref(sessionStorage.getItem('search_word') || '')
const goSearch = () => {
    keyWord.value = searchStr.value
    reset()
}

if (!list.value.length) {
    reset()
}


const openAd = (type, item) => {
  store.commit('openad', {
    type,
    item
  })
}

const changeCate = item => {
    sessionStorage.setItem('movie_activeId', item.id)
    router.replace({
        name: 'movies',
    })
}

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-movie {

    :deep(.ad-texts) {
        background-color: #218868;
    }
    :deep(.class-box) {
        background-color: #218868;
    }

//   移动设备样式
  .top {
    width: 100%;
    height: calc(var(--vw) * 12);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #218868;
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
      border-bottom: calc(var(--vw) * 0.5)solid #dc4891;
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