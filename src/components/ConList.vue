<!-- 电影列表 -->
<template>
  <div>
    <!-- 广告 -->
    <div class="list-ad-box" v-if="props.midApps.length">
      <div @click="goAd(ad)" class="list-ad-box-item" v-for="ad in props.midApps" :key="ad.id">
        <img class="list-ad-box-img" :src="ad.image" alt="">
        <div class="list-ad-box-title">{{ ad.title }}</div>
        <div class="list-ad-box-btn">立即下载 </div>
      </div>
    </div>
    <!-- 更多广告 -->
    <div class="more-ads">
      <div class="more-title">站长亲测：安全APP无毒免费下载</div>
      <div class="more-list">
        <div class="more-item" :class="['more-' + Math.floor(i / 4)]" v-for="i in 20" :key="i">更多推荐</div>
      </div>
    </div>
    <!-- 视频列表 -->
    <div v-if="title" class="con-list-title">{{ title }}</div>
    <div class="maxwidth con-list">

      <template v-for="(item, i) in list">



        <!-- 视频 -->
        <div class="list-item" :class="{ 'ad-item': item.type == 'ad' }" @click="goInfo(item)">
          <img class="pic" :src="item.image" alt="">
          <div class="title">{{ item.title }}</div>
        </div>


      </template>

      <template v-if="props.onlyApp">
        <div class="list-ad-box" v-if="props.onlyApp && props.midApps.length">
          <div @click="goAd(ad)" class="list-ad-box-item" v-for="ad in props.midApps" :key="ad.id">
            <img class="list-ad-box-img" :src="ad.image" alt="">
            <div class="list-ad-box-title">{{ ad.title }}</div>
          </div>
        </div>
      </template>


      <div v-if="!props.onlyApp" class="loading_more" ref="moreRef">{{ finish ? '没有更多了' : (loading ? '加载中...' : '') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue"
import store from "@/store"

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false,
  },
  finish: {
    type: Boolean,
    default: false,
  },
  scrollBox: {
    type: String,
    default: '#app'
  },
  midApps: {
    type: Array,
    default: () => []
  },
  onlyApp: {
    type: Boolean,
    default: false
  },
  from: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
})
const emits = defineEmits(['more'])
const goInfo = item => {
  if (item.is_ad) { // 广告
    store.commit('openad', {
      type: 'inner',
      item
    })
    return
  }
  item.from = props.from
  store.commit('goVideoInfo', item)
}
const goAd = item => {
  store.commit('openad', {
    type: 'app',
    item
  })
}

const moreRef = ref()
const onScroll = e => {
  if (!moreRef.value) return
  if (isElementPartiallyInViewport(moreRef.value)) {
    if (!props.loading && !props.finish) {
      console.error('more')
      emits('more')
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    try {
      document.querySelector(props.scrollBox).addEventListener('scroll', onScroll)
    } catch { }
  }, 500)
})
onBeforeUnmount(() => {
  document.querySelector(props.scrollBox).removeEventListener('scroll', onScroll)
})

function isElementPartiallyInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  // 检查元素是否在视口中任何部分可见
  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  return (vertInView && horInView);
}
</script>

<style lang="less" scoped>
@keyframes colorchange {
  0% {
    filter: hue-rotate(0deg)
  }


  100% {
    filter: hue-rotate(-360deg)
  }
}

@keyframes bganimation {
  0% {
    background-position-x: 0;
    background-position-y: 50%;
  }


  100% {
    background-position-x: 100%;
    background-position-y: 50%;
  }
}

/* 默认样式 - 移动优先 (小于750px) */
.con-list-title {
  background-color: #218868;
  padding: 0 calc(var(--vw) * 4);
  border-radius: calc(var(--vw) * 2);
  line-height: calc(var(--vw) * 8);
  margin: calc(var(--vw) * 4) calc(var(--vw) * 2) calc(var(--vw) * 2) calc(var(--vw) * 2);
}

.con-list {
  /* 移动设备样式 */
  padding: calc(var(--vw) * 3);
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;



  .list-item {
    cursor: pointer;
    width: calc(var(--vw) * 46);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    color: #333;
    border-radius: calc(var(--vw) * 2);
    overflow: hidden;
    margin-bottom: calc(var(--vw) * 2);

    .pic {
      width: 100%;
      height: calc(var(--vw) * 28);
    }

    .title {
      margin: calc(var(--vw) * 2) 0;
      font-size: calc(var(--vw) * 3.6);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 calc(var(--vw) * 2);
      width: 100%;
    }
  }

  .loading_more {
    text-align: center;
    width: 100%;
    font-size: calc(var(--vw) * 3.2);
    color: #ccc;
    text-align: center;
    padding: calc(var(--vw) * 5) 0;
  }
}

.list-ad-box {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  padding: calc(var(--vw) * 2) 0;
  background-color: #fff;

  .list-ad-box-item {
    width: calc(var(--vw) * 18.3);
    cursor: pointer;
    text-align: center;
    margin-bottom: calc(var(--vw) * 3);

    .list-ad-box-img {
      width: calc(var(--vw) * 16);
      height: calc(var(--vw) * 16);
      border-radius: calc(var(--vw) * 2);
      overflow: hidden;
    }

    .list-ad-box-title {
      font-size: calc(var(--vw) * 3);
      text-align: center;
      font-weight: bold;
      color: #f35626;
      background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: colorchange 10s infinite linear;
    }

    .list-ad-box-btn {
      height: calc(var(--vw) * 6);
      line-height: calc(var(--vw) * 6);
      border: 1px solid #fff;
      border-radius: calc(var(--vw) * 6);
      color: white;
      background-color: #ff4ba1;
      font-size: 12px;
      margin-top: 5px;
      box-shadow: rgb(5 24 74 / 37%) 0px 2px 6px 0px;
      width: 90%;
      margin: 0 auto;
      background-image: linear-gradient(125deg, #e70f0f, #FF9800, #ff00f5d1, #f3e900);
      background-size: 400%;
      animation: bganimation 20s infinite;
    }
  }
}

.more-ads {
  .more-title {
    color: #ff00e3;
    height: calc(var(--vw) * 10);
    line-height: calc(var(--vw) * 10);
    text-align: center;
    font-size: calc(var(--vw) * 4);
    background-color: #000;
  }

  .more-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--vw) * 2);
    padding-bottom: 0;
    background-color: #fff;

    .more-item {
      margin-bottom: calc(var(--vw) * 2);
      width: calc(var(--vw) * 22);
      height: calc(var(--vw) * 8);
      border-radius: 2vw;
      background-color: #000;
      text-align: center;
      line-height: calc(var(--vw) * 8);
      color: #fff;
      font-size: calc(var(--vw) * 3.2);
    }

    .more-0 {
      color: #f59e0b;
    }

    .more-2 {
      color: #10b981;
    }

    .more-3 {
      color: #fff900;
    }

    .more-4 {
      color: #00c8ff;
    }

    .more-5 {
      color: #f65cec;
    }
  }

}

</style>