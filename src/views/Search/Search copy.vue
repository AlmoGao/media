<!-- 搜索 -->
<template>
    <div class="page-search">
        <img class="title" src="@/assets/search/search_page_title.webp" alt="">

        <NSpin :show="loading">
            <div class="maxwidth search">
                <img class="icon" src="@/assets/search_icon.png" alt="">

                <input v-model.trim="keyWord" placeholder="输入搜索内容" class="ipt" type="text" @keydown.enter="reset">
            </div>
        </NSpin>
        <!-- 热搜 -->
        <div class="maxwidth hots">
            <div class="name">当前热搜：</div>
            <div class="hot" @click="clickHot(item)" v-for="(item, i) in hots" :key="i">{{ item }}</div>
        </div>

        <!-- 轮播 -->
        <n-carousel :autoplay="true" :interval="1000" v-if="ads.carousel && ads.carousel.length" touchable
            :show-dots="false" class="movie-list" :slides-per-view="3" :space-between="10" :loop="true" draggable>
            <div class="movie-item" style="cursor: pointer;" @click="openAd('carousel', item)"
                v-for="item in ads.carousel" :key="'b-' + item.id">
                <img style="width: 100%;height: 100%" :src="item.image" alt="">
            </div>
        </n-carousel>


        <!-- 文字 -->
        <div class="maxwidth ad-texts" v-if="ads.tad && ads.tad.length">
            <div @click="openAd('tad', item)" class="ad-text" v-for="item in ads.tad || []"
                :key="'ad' + item.id">{{ item.title }}</div>
        </div>

        <!-- banner -->
        <div v-if="ads.banner && ads.banner.length" class="maxwidth" style="margin: 0 auto">
            <img @click="openAd('banner', item)" style="width:100%;height:auto;display: block;cursor: pointer;"
                v-for="item in ads.banner" :key="item.id" :src="item.image" alt="">
        </div>

        <div class="maxwidth result-box" style="margin: 0 auto">
            <ConList :from="'search'" :midApps="midApps" @more="getList" :list="list" :loading="loading"
                :finish="finish" />
        </div>

        <!-- 右侧广告 -->
        <ConAdRight :list="rightApps" v-if="rightApps.length" />
    </div>
</template>


<script setup>
import ConAdRight from "@/components/ConAdRight.vue"
import { NSpin, NCarousel } from "naive-ui"
import ConList from "@/components/ConList.vue"
import https from '@/api';
import { ref, computed } from "vue"
import store from "@/store";




store.dispatch('updateAds', 7)
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
const openAd = (type, item) => {
    store.commit('openad', {
        type,
        item
    })
}



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


// 热搜
const hots = ref(['萝莉', '黑丝', '高潮', '后入', '抖音', '动漫', '麻豆', '福利'])
const clickHot = val => {
    keyWord.value = val
    setTimeout(() => {
        reset()
    }, 0)
}
</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-search {
    background-image: url('@/assets/search_page_bg.webp');
    background-size: 100% auto;
    background-repeat: no-repeat;

    .hots {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        position: relative;
        top: calc(var(--vw) * -2);
        margin: 0 auto;

        .name {
            margin-bottom: calc(var(--vw) * 2);
            font-size: calc(var(--vw) * 4);
            padding-left: calc(var(--vw) * 2);
        }

        .hot {
            font-size: calc(var(--vw) * 3.2);
            margin-left: calc(var(--vw) * 2);
            cursor: pointer;
            padding: calc(var(--vw) * 1) calc(var(--vw) * 3);
            border-radius: calc(var(--vw) * 5);
            background-color: #fff;
            color: #6a58bc;
            white-space: nowrap;

            margin-bottom: calc(var(--vw) * 2);
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

    /* 移动设备样式 */
    .title {
        display: block;
        margin: 0 auto;
        height: calc(var(--vw) * 15);
        margin-bottom: calc(var(--vw) * 4);
    }

    .search {
        margin: calc(var(--vw) * 6) auto;
        width: calc(var(--vw) * 80);
        height: calc(var(--vw) * 8);
        border-radius: calc(var(--vw) * 20);
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 calc(var(--vw) * 3);

        .icon {
            height: calc(var(--vw) * 4);
            margin-right: calc(var(--vw) * 2);
        }

        .ipt {
            flex: 1;
            font-size: calc(var(--vw) * 3.6);
        }
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .page-search {

        .hots {
            top: -24px;

            .name {
                margin-bottom: 20px;
                font-size: 24px;
                padding-left: 20px;
            }

            .hot {
                font-size: 20px;
                margin-left: 20px;
                padding: 6px 20px;
                border-radius: 30px;
                margin-bottom: 20px;
            }
        }

        /* 平板样式 */
        .title {
            height: 120px;
            margin-bottom: 32px;
        }

        .search {
            margin: 48px auto;
            width: calc(var(--vw) * 80);
            height: 64px;
            border-radius: 100px;
            padding: 0 32px;

            .icon {
                height: 32px;
                margin-right: 16px;
            }

            .ipt {
                flex: 1;
                font-size: 26px;
                height: 100%;
            }
        }
    }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
    .page-search {
        background-position-y: 100px;
        /* 桌面样式 */
        padding-top: 100px;

        .title {
            height: 150px;
            margin-bottom: 32px;
        }

        .search {
            margin: 48px auto;
            width: 1000px;
            height: 68px;
            border-radius: 100px;
            padding: 0 32px;

            .icon {
                height: 35px;
                margin-right: 18px;
            }

            .ipt {
                flex: 1;
                font-size: 28px;
            }
        }
    }
}
</style>