<!-- 右侧悬浮广告 -->
<template>
    <div class="right-apps">
        <div @click="clickItem(item)" class="right-app" v-for="item in props.list" :key="'ra' + item.id">
            <img :src="item.image" style="width: 100%;height: 100%;" alt="">
        </div>
    </div>
</template>


<script setup>
import store from '@/store'

const props = defineProps({
    list: {
        type: Array,
        default: []
    }
})

const clickItem = item => {
    store.commit('openad', {
        type: 'app',
        item
    })
}

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.right-apps {
    /* 移动设备样式 */
    position: fixed;
    z-index: 99;
    bottom: 160px;
    right: 10px;
    .right-app {
        margin-top: calc(var(--vw) * 1);
        width: calc(var(--vw) * 15);
        height: calc(var(--vw) * 15);
        cursor: pointer;
        border: 2px solid red;
        border-radius: calc(var(--vw) * 2);
        overflow: hidden;
    }
}

</style>