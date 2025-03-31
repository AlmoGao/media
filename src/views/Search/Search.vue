<!-- 搜索 -->
<template>
    <div class="page-search">
        <img class="title" src="@/assets/search/search_page_title.webp" alt="">

        <div class="maxwidth search">
            <img class="icon" src="@/assets/search_icon.png" alt="">

            <input placeholder="输入搜索内容" class="ipt" type="text">
        </div>


    </div>
</template>


<script setup>

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.page-search {
    background-image: url('@/assets/search_page_bg.webp');
    background-size: 100% auto;
    background-repeat: no-repeat;

    /* 移动设备样式 */
    .title {
        display: block;
        margin: 0 auto;
        height: 15vw;
        margin-bottom: 4vw;
    }

    .search {
        margin: 6vw auto;
        width: 80vw;
        height: 8vw;
        border-radius: 20vw;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 3vw;

        .icon {
            height: 4vw;
            margin-right: 2vw;
        }

        .ipt {
            flex: 1;
            font-size: 3.6vw;
        }
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .page-search {

        /* 平板样式 */
        .title {
            height: 120px;
            margin-bottom: 32px;
        }

        .search {
            margin: 48px auto;
            width: 80vw;
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