<!-- 福利 -->
<template>
    <div class="page-gift">
        <img class="title" src="@/assets/gift/partner_page_title.webp" alt="">


        <!-- 广告 -->
        <img v-for="i in 30" :key="i" class="banner"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">

    </div>
</template>


<script setup>

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-gift {

    /* 移动设备样式 */
    .title {
        display: block;
        margin: 0 auto;
        height: 15vw;
        margin-bottom: 4vw;
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