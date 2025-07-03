<!-- 广告 -->
<template>

    <!-- 开屏广告 -->
    <div class="ad-popup">
        <NModal v-model:show="showModal">
            <div class="ad-popup-body" v-if="popup[0]">
                <a target="_blank" :href="popup[0].url">
                    <img class="ad-img" :src="popup[0].image" alt="">
                </a>

                <div class="close" @click="showModal = false">
                    <img src="@/assets/close.svg" alt="">
                </div>

            </div>
        </NModal>
    </div>

</template>

<script setup>
import { NModal } from "naive-ui"
import { ref, computed, watch } from "vue"
import store from "@/store"

const showModal = ref(false)
const popup = computed(() => store.state.config.popup || [])

watch(() => popup, val => {
    if (val.value && val.value.length) {
        showModal.value = true
    }
}, { immediate: true })

</script>

<style lang="less">
/* 默认样式 - 移动优先 (小于750px) */
.ad-popup-body {
    width: 90vw;

    .ad-img {
        width: 100%;
        height: auto;
    }

    .close {
        margin-top: 5vw;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 10vw;
            height: 10vw;
            cursor: pointer;
        }
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .ad-popup-body {
        width: 700px;

        .close {
            margin-top: 32px;

            img {
                width: 50px;
                height: 50px;
            }
        }
    }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
    .ad-popup-body {
        width: 1000px;
        .close {
            margin-top: 40px;

            img {
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>