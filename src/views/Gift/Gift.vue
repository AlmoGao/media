<!-- 福利 -->
<template>
    <div class="page-gift">
        <img class="title" src="@/assets/gift/partner_page_title.webp" alt="">

        <!-- banner -->
        <div v-if="ads.banner && ads.banner.length" class="maxwidth" style="margin: 0 auto">
            <img @click="openAd('banner', item)" style="width:100%;height:auto;display: block;cursor: pointer;"
                v-for="item in ads.banner" :key="item.id" :src="item.image" alt="">
        </div>

        <!-- 右侧广告 -->
        <ConAdRight :list="rightApps" v-if="rightApps.length" />
    </div>
</template>


<script setup>
import ConAdRight from "@/components/ConAdRight.vue"
import { computed } from "vue"
import store from '@/store';
store.dispatch('updateAds', 3)
const ads = computed(() => store.state.ads[3] || {})
const rightApps = computed(() => { // 右侧广告
    if (!ads.value || !ads.value.app || !ads.value.app.length) return []
    return ads.value.app.filter(item => item.flag == 1) || []
})

const openAd = (type, item) => {
    store.commit('openad', {
        type,
        item
    })
}
</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-gift {

    padding-bottom: 50px;

    /* 移动设备样式 */
    .title {
        display: block;
        margin: 0 auto;
        height: calc(var(--vw) * 15);
        margin-bottom: calc(var(--vw) * 4);
    }

    .banner {
        display: block;
        width: 100%;
        height: auto;
        margin-bottom: 1px;
        cursor: pointer;
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .page-gift {

        /* 平板样式 */
        .title {
            height: 120px;
            margin-bottom: 32px;
        }
    }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
    .page-gift {
        /* 桌面样式 */
        padding-top: 100px;

        .title {
            height: 150px;
            margin-bottom: 32px;
        }
    }
}
</style>