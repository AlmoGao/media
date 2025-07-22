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
    width: calc(var(--vw) * 90);

    .ad-img {
        width: 100%;
        height: auto;
    }

    .close {
        margin-top: calc(var(--vw) * 5);
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: calc(var(--vw) * 10);
            height: calc(var(--vw) * 10);
            cursor: pointer;
        }
    }
}

</style>