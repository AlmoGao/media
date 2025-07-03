<!-- 详情页 -->
<template>
    <div class="page-info">
        <div class="h5_title">{{ video.title }}</div>


        <!-- 合作 -->
        <div>
            <ConList :midApps="midApps" :onlyApp="true" :loading="false" :finish="true" />
        </div>

        <div class="video-box" :style="{ backgroundImage: instance ? '' : `url(${video.image})` }">

            <div v-if="timeout" style="position: absolute;z-index: 100;top: 5%;right: 5%;color: #fff;font-size: 20px;border-radius: 20px;background-color: rgba(0,0,0,0.5);padding: 2px 12px;pointer-events: none;" >{{ timeout }}s</div>

            <img @click="openAd('vad', vad)" v-if="timeout" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 99;cursor: pointer;" :src="vad.image" alt="">
            <div class="video" id="video" ref="videoRef" style="width: 100%;height: 100%;"></div>
        </div>
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
        <ConList :from="video.from" :list="list" :midApps="midApps" :loading="false" :finish="false"
            style="margin: 0 auto;" />

        <!-- 右侧广告 -->
        <ConAdRight :list="rightApps" v-if="rightApps.length" />
    </div>
</template>


<script setup>
import ConList from "@/components/ConList.vue"
import ConAdRight from "@/components/ConAdRight.vue"
import store from '@/store';
import { computed, onMounted, onBeforeUnmount, ref } from "vue"
import Artplayer from "artplayer";

store.dispatch('updateAds', 6)
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
            timeout.value --;
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

    /* 移动设备样式 */
    .video-box {
        width: 100%;
        height: 60vw;
        background-color: #000;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .h5_title {
        white-space: nowrap;
        background-color: #000;
        font-size: 4vw;
        height: 8vw;
        line-height: 8vw;
        padding: 0 15vw;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
    }

    .video-info {
        white-space: nowrap;
        background-color: #000;
        font-size: 3.2vw;
        height: 6vw;
        line-height: 6vw;
        padding: 0 2vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        margin: 0 auto;
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .page-info {

        /* 平板样式 */
        .video-box {
            height: 50vw;
        }

        .h5_title {
            font-size: 24px;
            height: 80px;
            line-height: 80px;
            padding: 0 120px;
        }

        .video-info {
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            padding: 0 32px;
        }
    }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
    .page-info {

        /* 桌面样式 */
        .video-box {
            height: 700px;
            background-size: contain;
        }

        .h5_title {
            height: 101px;
        }
    }
}
</style>