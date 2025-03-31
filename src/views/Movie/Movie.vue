<!-- 首页 -->
<template>
  <div class="page-movie">
    <!-- 顶部图片 -->
    <div class="top">
      <img src="@/assets/movies_page_title.webp" alt="">
    </div>

    <!-- 分类 -->
    <div class="maxwidth cate-box">
      <div class="cate-item" @click="changeCate(item)" :class="{'active-cate': activeId == item.id}" v-for="item in category" :key="item.id">{{ item.name }}</div>
    </div>


    <!-- 轮播图 -->
    <div class="banner-box" style="background-color: #3b3b3b;">
      <!-- h5 -->
      <NCarousel autoplay touchable draggable class="banners-h5">
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
      </NCarousel>

      <!-- pc -->
      <NCarousel autoplay effect="card" class="banners" touchable draggable
        prev-slide-style="transform: translateX(-110%) translateZ(-200px);"
        next-slide-style="transform: translateX(10%) translateZ(-200px);">
        <NCarouselItem :style="{ width: '60%' }">
          <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
        </NCarouselItem>
        <NCarouselItem :style="{ width: '60%' }">
          <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
        </NCarouselItem>
        <NCarouselItem :style="{ width: '60%' }">
          <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
        </NCarouselItem>
        <NCarouselItem :style="{ width: '60%' }">
          <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
        </NCarouselItem>
      </NCarousel>
    </div>


    <!-- 电影列表 -->
    <ConList style="margin: 0 auto;" />

  </div>
</template>


<script setup>
import { NCarousel, NCarouselItem } from 'naive-ui'
import ConList from "@/components/ConList.vue"
import store from '@/store';
import { computed, watch, ref } from "vue"

const category = computed(() => store.state.category || [])
const activeId = ref('')

const getList = () => {
  console.error('获取历史')
}
const changeCate = item => {
  activeId.value = item.id
}

watch(() => category, val => {
  if (val.value && val.value.length && !activeId.value) {
    activeId.value = val.value[0].id
    getList()
  }
}, { immediate: true })

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
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 4vw;

    .cate-item {
      margin: 0 4vw 2vw 0;
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