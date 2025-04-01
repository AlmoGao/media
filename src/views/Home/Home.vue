<!-- 首页 -->
<template>
  <div class="page-home">
    <!-- 顶部图片 -->
    <div class="top">
      <video class="video" autoplay muted webkit-playsinline="" playsinline="" preload="metadata"
        src="blob:https://sagj.me/1bc2ec15-925e-4398-be3f-680f27c4daf3" style="width: 100%;height: 100%;">
      </video>
      <img class="logo" src="@/assets/home/index_app_video_logo.webp" alt="">
    </div>

    <!-- banner -->
    <div v-if="ads.banner && ads.banner.length" class="maxwidth" style="margin: 0 auto">
      <img @click="openAd('banner', item)" style="width:100%;height:auto;display: block;cursor: pointer;"
        v-for="item in ads.banner" :key="item.id" :src="item.image" alt="">
    </div>

    <!-- 轮播 -->
    <NCarousel v-if="ads.carousel && ads.carousel.length" autoplay touchable draggable class="banners">
      <img style="cursor: pointer;" @click="openAd('carousel', item)" v-for="item in ads.carousel" :key="'b-' + item.id" class="banner" :src="item.image">
    </NCarousel>

    <!-- 电影 -->
    <div class="maxwidth movies">
      <div class="movie-title">
        <img class="movie-name" src="@/assets/home/our_movies_title.webp" alt="">
        <img class="btn" src="@/assets/home/more_icon.webp" alt="">
      </div>
    </div>
    <n-carousel v-if="videos.length" touchable :show-dots="false" class="movie-list" :slides-per-view="3" :space-between="10" :loop="false" draggable>
      <div class="movie-item" style="cursor: pointer;" @click="goInfo(item)" v-for="item in videos" :key="'b-' + item.id">
        <img style="width: 100%;height: 100%"
          :src="item.image" alt="">
      </div>
    </n-carousel>

    <!-- 合作 -->
    <div class="coop">
      <div class="coop-title">
        <img class="coop-name" src="@/assets/home/app_our_partner_title.webp" alt="">
        <img class="btn" src="@/assets/home/partner_more_btn.webp" alt="">
      </div>

      <div class="coop-box">
        <div class="coop-item" @click="openAd('app', item)" v-for="item in midApps" :key="item.id">
          <img style="width: 100%;height:100%"
            :src="item.image" alt="">
        </div>
      </div>
    </div>


    <!-- 底部 -->
    <div style="margin: 0 auto;width: 100%;max-width: 800px;">
      <img style="width: 100%;height: auto;" src="@/assets/home/our_about_img.webp" alt="">
    </div>


     <!-- 右侧广告 -->
     <ConAdRight :list="rightApps" v-if="rightApps.length" />
  </div>
</template>


<script setup>
import ConAdRight from "@/components/ConAdRight.vue"
import { NCarousel } from 'naive-ui'
import store from '@/store';
import { computed } from "vue"

store.dispatch('updateAds', 1)
const videos = computed(() => store.state.config.video || [])
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

const openAd = (type, item) => {
  store.commit('openad', {
    type,
    item
  })
}

const goInfo = item => {
  store.commit('goVideoInfo', item)
}
</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-home {
  background-color: #fff;

  /* 移动设备样式 */
  .top {
    width: 100%;
    height: 90vw;
    background-color: #000;
    position: relative;

    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 50%;
      height: auto;
    }
  }

  .banners {
    .banner {
      width: 100%;
      height: 40vw;
      cursor: pointer;
    }
  }

  .movies {
    margin: 0 auto;

    .movie-title {
      width: 100%;
      height: 20vw;
      background-image: url('@/assets/home/index_our_movies_bg.webp');
      background-size: 100% 240%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4vw;

      .movie-name {
        height: 16vw;
      }

      .btn {
        height: 6vw;
        cursor: pointer;
      }
    }
  }

  .movie-list {
    width: 100%;

    .movie-item {
      width: 40vw;
      height: 24vw;
      cursor: pointer;
    }
  }

  .coop {
    .coop-title {
      width: 100%;
      height: 24vw;
      background-image: url('@/assets/home/app_partner_bg.webp');
      background-size: 100% 240%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0 4vw;

      .coop-name {
        height: 10vw;
        margin-bottom: 2vw;
      }

      .btn {
        height: 6vw;
        cursor: pointer;
      }
    }

    .coop-box {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      position: relative;

      &::after {
        content: "";
        width: 4vw;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(to right, #fff, rgba(238, 238, 238, 0));
      }

      &::before {
        content: "";
        width: 4vw;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-image: linear-gradient(to left, #fff, rgba(238, 238, 238, 0));
      }

      .coop-item {
        width: 18vw;
        height: 18vw;
        margin-bottom: 1vw;
        cursor: pointer;
      }
    }
  }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
  .page-home {

    /* 平板样式 */
    .top {
      height: 80vw;

      .logo {
        width: 300px;
      }
    }

    .banners {
      .banner {
        height: 30vw;
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
          width: 18vw;
          height: 18vw;
          margin-bottom: 2vw;
        }
      }
    }
  }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
  .page-home {

    /* 桌面样式 */
    .top {
      padding-top: 100px;
      height: 700px;
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
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>