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
    right: 20px;
    .right-app {
        margin-top: 1vw;
        width: 15vw;
        height: 15vw;
        cursor: pointer;
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .right-apps {
        /* 平板样式 */
        .right-app {
            margin-top: 4px;
            width: 120px;
            height: 120px;
        }
    }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
    .right-apps {
        /* 桌面样式 */
        .right-app {
            margin-top: 6px;
            width: 150px;
            height: 150px;
        }
    }
}
</style>