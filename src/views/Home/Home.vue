<!-- 首页 -->
<template>
  <div class="page-home">
    <!-- 顶部图片 -->
    <div class="top">
      <!-- <video class="video" autoplay muted webkit-playsinline="" playsinline="" preload="metadata"
        src="blob:https://sagj.me/1bc2ec15-925e-4398-be3f-680f27c4daf3" style="width: 100%;height: 100%;">
      </video> -->
      <!-- <img class="logo" src="@/assets/home/index_app_video_logo.webp" alt=""> -->
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
    <div class="maxwidth ad-texts" v-if="top_tad && top_tad.length">
      <div @click="openAd('top_tad', item)" class="ad-text" v-for="item in top_tad || []"
        :key="'ad' + item.id">{{ item.title }}</div>
    </div>

    <!-- banner -->
    <div v-if="banner && banner.length" class="maxwidth" style="margin: 0 auto">
      <img @click="openAd('banner', item)" style="width:100%;height:auto;display: block;cursor: pointer;"
        v-for="item in banner" :key="item.id" :src="item.image" alt="">
    </div>

    <!-- 电影 -->
    <div class="maxwidth movies">
      <div class="movie-title" @click="jump('movies')">
        <img class="movie-name" src="@/assets/home/our_movies_title.webp" alt="">
        <img class="btn" src="@/assets/home/more_icon.webp" alt="">
      </div>
    </div>
    <n-carousel v-if="videos.length" touchable :show-dots="false" class="movie-list" :slides-per-view="3"
      :space-between="10" :loop="false" draggable>
      <div class="movie-item" style="cursor: pointer;" @click="goInfo(item)" v-for="item in videos"
        :key="'b-' + item.id">
        <img style="width: 100%;height: 100%" :src="item.image" alt="">
      </div>
    </n-carousel>

    <!-- 合作 -->
    <div class="coop">
      <div class="coop-title" @click="jump('gift')">
        <img class="coop-name" src="@/assets/home/app_our_partner_title.webp" alt="">
        <img class="btn" src="@/assets/home/partner_more_btn.webp" alt="">
      </div>

      <div class="coop-box">
        <div class="coop-line" ref="scroll1Ref">
          <div class="coop-item" ref="app1Ref" @click="openAd('app', item)" v-for="item in midApps" :key="item.id">
            <img style="width: 100%;height:100%" :src="item.image" alt="">
          </div>
        </div>
        <div class="coop-line" ref="scroll2Ref">
          <div class="coop-item" @click="openAd('app', item)" v-for="item in midApps" :key="item.id">
            <img style="width: 100%;height:100%" :src="item.image" alt="">
          </div>
        </div>
        <div class="coop-line" ref="scroll3Ref">
          <div class="coop-item" @click="openAd('app', item)" v-for="item in midApps" :key="item.id">
            <img style="width: 100%;height:100%" :src="item.image" alt="">
          </div>
        </div>
        <div class="coop-line" ref="scroll4Ref">
          <div class="coop-item" @click="openAd('app', item)" v-for="item in midApps" :key="item.id">
            <img style="width: 100%;height:100%" :src="item.image" alt="">
          </div>
        </div>
      </div>
    </div>

    <!-- 电影列表 -->
    <div class="maxwidth" style="margin: 0 auto;">
      <ConList :from="'home2'" :list="new_video" :loading="false" :finish="false" />
    </div>

    <!-- 底部 -->
    <div style="margin: 0 auto;width: 100%;max-width: 800px;">
      <img style="width: 100%;height: auto;" src="@/assets/home/our_about_img.webp" alt="">
    </div>




    <!-- 右侧广告 -->
    <ConAdRight :list="rightApps"  />
  </div>
</template>


<script setup>
import ConList from "@/components/ConList.vue"
import ConAdRight from "@/components/ConAdRight.vue"
import { NCarousel, NCarouselItem } from 'naive-ui'
import store from '@/store';
import { computed, onMounted, ref, onBeforeUnmount } from "vue"
import router from "@/router";

store.dispatch('updateAds', 1)
const videos = computed(() => store.state.config.video || [])
const banner = computed(() => store.state.config?.banner || [])
const top_tad = computed(() => store.state.config?.top_tad || [])
const new_video = computed(() => {

  // 替换内部广告
  if (innerAds.value && innerAds.value.length) {
    store.state.config.new_video.forEach((item, i) => {
      innerAds.value.forEach(ad => {
        if (i + 1 == ad.weigh) {
          store.state.config.new_video[i] = ad
          store.state.config.new_video[i].is_ad = true
        }
      })
    })
  }
  return store.state.config.new_video || []
})


const ads = computed(() => store.state.ads[1] || {})
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

const openAd = (type, item) => {
  store.commit('openad', {
    type,
    item
  })
}

const goInfo = item => {
  item.from = 'home'
  store.commit('goVideoInfo', item)
}

const jump = name => {
  router.push({ name })
}


// 推荐模块动画
const scroll1Ref = ref()
const scroll3Ref = ref()
const scroll2Ref = ref()
const scroll4Ref = ref()
const app1Ref = ref([])
let scrollInterval = null
const startAni = () => {
  if (app1Ref.value && app1Ref.value.length) {
    let max = 0
    app1Ref.value.forEach(item => {
      max += item.clientWidth
      max += 8
    })
    const step = 1
    if (scroll1Ref.value) { // 1
      scroll1Ref.value.scrollLeft = 0
      scroll3Ref.value.scrollLeft = 0
      let loading1 = false
      let loading3 = false

      scroll2Ref.value.scrollLeft = max
      scroll4Ref.value.scrollLeft = max
      let loading2 = false
      let loading4 = false


      scrollInterval = setInterval(() => {
        let b1 = scroll1Ref.value.scrollLeft
        scroll1Ref.value.scrollLeft += step

        let b3 = scroll3Ref.value.scrollLeft
        scroll3Ref.value.scrollLeft += step

        scroll2Ref.value.scrollLeft -= step

        scroll4Ref.value.scrollLeft -= step

        if (b1 == scroll1Ref.value.scrollLeft && !loading1) {
          loading1 = true
          setTimeout(() => {
            scroll1Ref.value.scrollLeft = 0
            loading1 = false
          }, 3000)
        }

        if (b3 == scroll3Ref.value.scrollLeft && !loading3) {
          loading3 = true
          setTimeout(() => {
            scroll3Ref.value.scrollLeft = 0
            loading3 = false
          }, 3000)
        }

        if (scroll2Ref.value.scrollLeft == 0 && !loading2) {
          loading2 = true
          setTimeout(() => {
            scroll2Ref.value.scrollLeft = max
            loading2 = false
          }, 3000)
        }

        if (scroll4Ref.value.scrollLeft == 0 && !loading4) {
          loading4 = true
          setTimeout(() => {
            scroll4Ref.value.scrollLeft = max
            loading4 = false
          }, 3000)
        }
      }, 1000 / 60)
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    startAni()
  }, midApps.value.length ? 1000 : 5000)
})
onBeforeUnmount(() => {
  if (scrollInterval) clearInterval(scrollInterval)
})
</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-home {
  background-color: #fff;

  /* 移动设备样式 */
  .top {
    // width: 100%;
    // height: 90vw;
    // background-color: #000;
    // position: relative;

    // .logo {
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   transform: translateX(-50%) translateY(-50%);
    //   width: 50%;
    //   height: auto;
    // }
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

  .movies {
    margin: 0 auto;

    .movie-title {
      width: 100%;
      height: calc(var(--vw) * 20);
      background-image: url('@/assets/home/index_our_movies_bg.webp');
      background-size: 100% 240%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 calc(var(--vw) * 4);

      .movie-name {
        height: calc(var(--vw) * 16);
      }

      .btn {
        height: calc(var(--vw) * 6);
        cursor: pointer;
      }
    }
  }

  .movie-list {
    width: 100%;

    .movie-item {
      width: calc(var(--vw) * 40);
      height: calc(var(--vw) * 24);
      cursor: pointer;
    }
  }

  .coop {
    .coop-title {
      width: 100%;
      height: calc(var(--vw) * 24);
      background-image: url('@/assets/home/app_partner_bg.webp');
      background-size: 100% 240%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0 calc(var(--vw) * 4);

      .coop-name {
        height: calc(var(--vw) * 10);
        margin-bottom: calc(var(--vw) * 2);
      }

      .btn {
        height: calc(var(--vw) * 6);
        cursor: pointer;
      }
    }

    .coop-box {
      width: 100%;
      position: relative;

      &::after {
        content: "";
        width: calc(var(--vw) * 4);
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(to right, #fff, rgba(238, 238, 238, 0));
      }

      &::before {
        content: "";
        width: calc(var(--vw) * 4);
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-image: linear-gradient(to left, #fff, rgba(238, 238, 238, 0));
      }

      .coop-line {
        white-space: nowrap;
        overflow-x: auto;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      }

      .coop-item {
        display: inline-block;
        width: calc(var(--vw) * 18);
        height: calc(var(--vw) * 18);
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
  .page-home {


    .banner-box {
      padding: 32px 0;
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

    /* 平板样式 */
    .top {
      // height: 80vw;

      // .logo {
      //   width: 300px;
      // }
    }

    .banners {
      .banner {
        height: calc(var(--vw) * 30);
      }
    }

    .movies {
      .movie-title {
        height: 160px;
        padding: 0 20px;

        .movie-name {
          height: 120px;
        }

        .btn {
          height: 40px;
        }
      }
    }

    .coop {
      .coop-title {
        height: 220px;
        padding: 0 32px;

        .coop-name {
          height: 90px;
          margin-bottom: 20px;
        }

        .btn {
          height: 50px;
        }
      }

      .coop-box {
        width: 100%;

        &::after {
          width: 24px;
        }

        &::before {
          width: 24px;
        }

        .coop-item {
          width: calc(var(--vw) * 12);
          height: calc(var(--vw) * 12);
          margin-right: 8px;
        }
      }
    }
  }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
  .page-home {

    .banner-box {
      padding: 64px 0;
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

    /* 桌面样式 */
    .top {
      padding-top: 100px;
      // height: 700px;
    }

    .banners {
      .banner {
        height: 400px;
      }
    }

    .movies {
      .movie-title {
        height: 200px;
        padding: 0 32px;

        .movie-name {
          height: 150px;
        }

        .btn {
          height: 50px;
        }
      }
    }

    .coop {
      display: flex;
      align-items: stretch;
      justify-content: center;
      padding-right: 5%;

      .coop-title {
        padding: 0 32px;
        height: auto;
        flex: 1;
        align-items: flex-end;

        .coop-name {
          height: 90px;
          margin-bottom: 20px;
        }

        .btn {
          height: 50px;
        }
      }

      .coop-box {
        width: 800px;
        padding: 32px 0;
        background-image: url('@/assets/home/app_partner_bg.webp');
        background-size: cover;

        &::after {
          width: 32px;
        }

        &::before {
          width: 32px;
        }

        .coop-item {
          width: 119px;
          height: 119px;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>