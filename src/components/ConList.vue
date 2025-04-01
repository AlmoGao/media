<!-- 电影列表 -->
<template>
  <div class="maxwidth con-list">
    <div class="list-item" :class="{'ad-item': item.type == 'ad'}" v-for="item in list" :key="item.id" @click="goInfo(item)">
      <img class="pic" :src="item.image" alt="">
      <div class="title">{{ item.title }}</div>
    </div>

    <div class="loading_more" ref="moreRef">{{ finish ? '没有更多了' : (loading ? '加载中...' : '') }}</div>
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
  }
})
const emits = defineEmits(['more'])
const goInfo = item => {
  if (item.type == 'ad') {
    store.commit('openad', {
      type: 'app',
      item
    })
  } else {
    store.commit('goVideoInfo', item)
  }
}

const moreRef = ref()
const onScroll = e => {
  if (!moreRef.value) return
  if (isElementPartiallyInViewport(moreRef.value)) {
    if (!props.loading && !props.finish) {
      console.error('加载更多')
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
/* 默认样式 - 移动优先 (小于750px) */
.con-list {
  /* 移动设备样式 */
  padding: 3vw;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;

  .list-item {
    cursor: pointer;
    width: 44vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .pic {
      width: 100%;
      height: 32vw;
    }

    .title {
      margin: 2vw 0;
      font-size: 3.6vw;
    }
  }

  .loading_more {
    text-align: center;
    width: 100%;
    font-size: 3.2vw;
    color: #999;
    text-align: center;
    padding: 5vw 0;
  }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
  .con-list {
    /* 平板样式 */
    padding: 2.5vw;

    .list-item {
      width: 30vw;

      .pic {
        width: 100%;
        height: 22vw;
      }

      .title {
        margin: 1vw 0;
        font-size: 22px;
      }
    }

    .loading_more {
      font-size: 16px;
      padding: 20px 0;
    }
  }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
  .con-list {
    /* 桌面样式 */
    padding: 32px 0;

    .list-item {
      width: 290px;

      .pic {
        width: 100%;
        height: 200px;
      }

      .title {
        margin: 12px 0;
        font-size: 22px;
      }
    }

    .loading_more {
      font-size: 18px;
      padding: 24px 0;
    }
  }
}

@media (min-width: 1240px) {
  .con-list {
    /* 桌面样式 */
    padding: 32px 0;

    .list-item {
      width: 300px;

      .pic {
        width: 100%;
        height: 210px;
      }

      .title {
        margin: 12px 0;
        font-size: 22px;
      }
    }
  }
}

@media (min-width: 1305px) {
  .con-list {
    /* 桌面样式 */
    padding: 32px 0;

    .list-item {
      width: 320px;

      .pic {
        width: 100%;
        height: 220px;
      }

      .title {
        margin: 12px 0;
        font-size: 22px;
      }
    }
  }
}
</style>