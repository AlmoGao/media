<!-- 详情页 -->
<template>
    <div class="page-info">


        <!-- 顶部 -->
        <div class="top">
            {{ site.name }}
        </div>


        <!-- 文字 -->
        <div class="maxwidth ad-texts" v-if="top_tad && top_tad.length">
            <div @click="openAd('top_tad', item)" class="ad-text" v-for="item in top_tad || []" :key="'ad' + item.id">{{
                item.title }}</div>
        </div>

        <!-- 板块 -->
        <div class="ad-block" v-if="banner_on_tad && banner_on_tad.length">
            <div class="block-item" @click="openAd('banner_on_tad', item)" v-for="(item, i) in banner_on_tad" :key="i">
                {{ item.title }}</div>
        </div>

        <!-- banner -->
        <div v-if="banner && banner.length" class="maxwidth" style="margin: 0 auto">
            <img @click="openAd('banner', item)"
                style="width:100%;height:auto;display: block;cursor: pointer;max-height: 120px;"
                v-for="item in banner" :key="item.id" :src="item.image" alt="">
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


        <!-- 合作 -->
        <div>
            <ConList :midApps="midApps" :onlyApp="true" :loading="false" :finish="true" />
        </div>

        <div class="video-box" :style="{ backgroundImage: instance ? '' : `url(${video.image})` }">

            <div v-if="timeout"
                style="position: absolute;z-index: 100;top: 5%;right: 5%;color: #fff;font-size: 20px;border-radius: 20px;background-color: rgba(0,0,0,0.5);padding: 2px 12px;pointer-events: none;">
                {{ timeout }}s</div>

            <img @click="openAd('vad', vad)" v-if="timeout"
                style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 99;cursor: pointer;"
                :src="vad.image" alt="">
            <div class="video" id="video" ref="videoRef" style="width: 100%;height: 100%;"></div>
        </div>
        <div class="h5_title">{{ video.title }}</div>
        <div style="background-color: #000;">
            <div class="maxwidth video-info">
                <span>观看次数：{{ video.views }}</span>
                <span>点赞次数: {{ video.likes }}</span>
            </div>
        </div>
        <!-- banner -->
        <div v-if="ads.banner && ads.banner.length" class="maxwidth" style="margin: 0 auto">
            <img @click="openAd('banner', item)" style="width:100%;height:auto;display: block;cursor: pointer;"
                v-for="item in ads.banner" :key="item.id" :src="item.image" alt="">
        </div>

        <!-- 电影列表 -->
        <ConList :title="'为您推荐'" :from="video.from" :list="list" :midApps="midApps" :loading="false" :finish="false"
            style="margin: 0 auto;" />

        <!-- 右侧广告 -->
        <ConAdRight :list="rightApps" />
    </div>
</template>


<script setup>
import ConList from "@/components/ConList.vue"
import ConAdRight from "@/components/ConAdRight.vue"
import store from '@/store';
import { computed, onMounted, onBeforeUnmount, ref } from "vue"
import Artplayer from "artplayer";

store.dispatch('updateAds', 6)
const site = computed(() => store.state.config.site || {})
const top_tad = computed(() => store.state.config?.top_tad || [])
const banner_on_tad = computed(() => store.state.config?.banner_on_tad || [])
const banner = computed(() => store.state.config?.banner || [])
const category = computed(() => store.state.category || [])
const ads = computed(() => store.state.ads[6] || {})
const video = computed(() => store.state.video || {})
if (!video.value.m3u8) {
    router.replace({ name: 'home' })
}
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

const instance = ref(null)
const videoRef = ref()
const initPlayer = () => {
    instance.value = new Artplayer({
        container: videoRef.value,
        url: video.value.m3u8,
        poster: video.value.image,
        theme: '#dc4891',
        autoSize: true,
        autoMini: true,
        playbackRate: true,
        hotkey: true,
        mutex: true,
        fullscreen: true,
        miniProgressBar: true,
        playsInline: true,
        customType: {
            m3u8: playM3u8,
        },
    });
}


// 播放前广告
const vad = computed(() => store.state.config.vad || {})
const timeout = ref(5)
let interval = null
onMounted(() => {
    if (vad.value.image) {
        interval = setInterval(() => {
            timeout.value--;
            if (timeout.value <= 0) {
                clearInterval(interval);
                initPlayer()
            }
        }, 1000)
    } else {
        initPlayer()
    }
})
onBeforeUnmount(() => {
    if (interval) clearInterval(interval);
    instance.value && instance.value.destroy(false)
})

const changeCate = item => {
    sessionStorage.setItem('movie_activeId', item.id)
    router.replace({
        name: 'movies',
    })
}

function playM3u8(video, url, art) {
    if (Hls.isSupported()) {
        if (art.hls) art.hls.destroy();
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        art.hls = hls;
        art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
    } else {
        art.notice.show = 'Unsupported playback format: m3u8';
    }
}



// 数据列表 ，  根据不同的 from 来取不同的值
const list = ref([])
switch (video.value.from) {
    case 'home':
        list.value = store.state.config.video || []
        break
    case 'home2':
        list.value = store.state.config.new_video || []
        break
    case 'movies':
        try {
            list.value = JSON.parse(sessionStorage.getItem('movie_list') || '[]')
        } catch {
            list.value = []
        }
        break
    case 'search':
        try {
            list.value = JSON.parse(sessionStorage.getItem('search_list') || '[]')
        } catch {
            list.value = []
        }
        break
    default:
        list.value = store.state.config.video || []
        break
}

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-info {

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

    /* 移动设备样式 */
    .video-box {
        width: 100%;
        height: calc(var(--vw) * 60);
        background-color: #000;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .h5_title {
        white-space: nowrap;
        background-color: #000;
        font-size: calc(var(--vw) * 4);
        height: calc(var(--vw) * 8);
        line-height: calc(var(--vw) * 8);
        padding: 0 calc(var(--vw) * 2);
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
    }

    .video-info {
        white-space: nowrap;
        background-color: #000;
        font-size: calc(var(--vw) * 3.2);
        height: calc(var(--vw) * 6);
        line-height: calc(var(--vw) * 6);
        padding: 0 calc(var(--vw) * 2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        margin: 0 auto;
    }
}
</style>