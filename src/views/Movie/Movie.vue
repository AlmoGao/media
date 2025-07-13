<!-- 首页 -->
<template>
  <div class="page-movie">
    <!-- 顶部图片 -->
    <div class="top">
      <img src="@/assets/movies_page_title.webp" alt="">
    </div>


    <!-- 分类 -->
    <div class="maxwidth cate-box">
      <div class="cate-item" @click="changeCate(item)" :class="{ 'active-cate': activeId == item.id }"
        v-for="item in category" :key="item.id">{{ item.name }}</div>
    </div>

    <!-- 轮播图 -->
    <div class="banner-box" v-if="ads.carousel && ads.carousel.length" style="background-color: #3b3b3b;">
      <!-- h5 -->
      <NCarousel autoplay touchable draggable class="banners-h5">
        <img style="cursor: pointer;" @click="openAd('carousel', item)" v-for="item in ads.carousel"
          :key="'b-' + item.id" class="carousel-img" :src="item.image">
      </NCarousel>

      <!-- pc -->
      <NCarousel autoplay effect="card" class="banners" touchable draggable
        prev-slide-style="transform: translateX(-110%) translateZ(-200px);"
        next-slide-style="transform: translateX(10%) translateZ(-200px);">
        <NCarouselItem :style="{ width: '80%' }" v-for="item in ads.carousel" :key="'pb-' + item.id">
          <img style="cursor: pointer;" class="carousel-img" @click="openAd('carousel', item)" :src="item.image">
        </NCarouselItem>
      </NCarousel>
    </div>

    <!-- 文字 -->
    <div class="maxwidth ad-texts" v-if="ads.tad && ads.tad.length">
      <div @click="openAd('tad', item)" class="gradient-text ad-text" v-for="item in ads.tad || []"
        :key="'ad' + item.id">{{ item.title }}</div>
    </div>

    <!-- banner -->
    <div v-if="ads.banner && ads.banner.length" class="maxwidth" style="margin: 0 auto">
      <img @click="openAd('banner', item)"
        style="width:100%;height:auto;display: block;cursor: pointer;max-height: 120px;" v-for="item in ads.banner"
        :key="item.id" :src="item.image" alt="">
    </div>


    <!-- 电影列表 -->
    <ConList :from="'movies'" @more="getList" :list="list" :midApps="midApps" :loading="loading" :finish="finish"
      style="margin: 0 auto;" />


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
store.dispatch('updateAds', 2)

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

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-movie {



  /* 移动设备样式 */
  .top {
    width: 100%;
    height: 12vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4vw;

    img {
      height: 100%;
      width: auto;
    }
  }

  .cate-box {
    margin: 0 auto;
    white-space: nowrap;
    overflow-x: auto;
    padding: 4vw;

    .cate-item {
      margin: 0 4vw 2vw 0;
      display: inline-block;
      cursor: pointer;
    }

    .active-cate {
      color: #dc4891;
      border-radius: 2vw;
      border-bottom: 0.5vw solid #dc4891;
    }
  }

  .banners {
    display: none;
  }

  .banners-h5 {
    display: block;
    height: 60vw;

    .carousel-img {
      width: 100%;
      height: 60vw;
    }
  }

}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
  .page-movie {

    /* 平板样式 */
    .top {
      width: 100%;
      height: 100px;
      margin-bottom: 24px;
    }

    .cate-box {
      padding: 24px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;

      .cate-item {
        margin: 0 32px 24px 0;
        font-size: 24px;
      }

      .active-cate {
        border-radius: 8px;
        border-bottom: 4px solid #dc4891;
      }
    }

    .banners-h5 {
      display: none;
    }

    .banner-box {
      padding: 32px 0;
    }

    .banners {
      height: 360px;
      display: block;

      .carousel-img {
        height: 360px;
        width: auto;
        margin: 0 auto;
      }
    }
  }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
  .page-movie {

    /* 桌面样式 */
    .top {
      padding-top: 100px;
      width: 100%;
      height: 250px;
      margin-bottom: 32px;
    }

    .cate-box {
      padding: 32px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;

      .cate-item {
        margin: 0 48px 24px 0;
        font-size: 26px;
      }

      .active-cate {
        border-radius: 10px;
        border-bottom: 5px solid #dc4891;
      }
    }

    .banners-h5 {
      display: none;
    }

    .banner-box {
      padding: 64px 0;
    }

    .banners {
      height: 480px;
      display: block;

      .carousel-img {
        height: 480px;
        width: auto;
        margin: 0 auto;
      }
    }
  }
}
</style>