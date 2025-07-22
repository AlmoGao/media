<!-- 顶部 -->
<template>
    <div class="con-header">
        <!-- pc -->
        <div class="con-header-pc">
            <div class="maxwidth con-pc">
                <img @click="jump('home')" class="logo" :src="site.logo_image" alt="">
                <div style="flex: 1;"></div>
                <div class="navs">
                    <div class="nav" @click="jump(item.route)" :class="{ 'active_nav': route.name == item.route }" v-for="(item, i) in navs"
                        :key="i">{{ item.name }}</div>
                </div>
                <img class="search" @click="jump('search')" src="@/assets/search_icon.png" alt="">
            </div>
        </div>

        <!-- h5 -->
        <div class="con-header-h5">
            <img class="left-icon" @click="active = true" src="@/assets/app_menu_icon.webp" alt="">
            <img class="right-icon" @click="jump('search')" src="@/assets/app_search_icon.webp" alt="">
        </div>

        <!-- 左侧弹窗 -->
        <NDrawer v-model:show="active" :width="120" :placement="'left'">
            <NDrawerContent title="">
                <div class="header-left-dialog">
                    <img class="logo" :src="site.mobile_logo_image" alt="">
                    <div class="navs">
                        <div class="nav" @click="jump(item.route)" :class="{ 'active_nav': route.name == item.route }" v-for="(item, i) in navs"
                            :key="i">{{ item.name }}</div>
                    </div>
                </div>
            </NDrawerContent>
        </NDrawer>
    </div>
</template>

<script setup>
import { NDrawer, NDrawerContent } from "naive-ui"
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import router from "@/router"
import store from "@/store"

const site = computed(() => store.state.config.site || {})

const route = useRoute()
const active = ref(false)
const navs = ref([
    { name: '首页', route: 'home' },
    { name: '影片', route: 'movies' },
    { name: '福利', route: 'gift' },
    // { name: '消息', route: 'message' },
])


const jump = name => {
    active.value = false
    if (route.name == name) return
    router.push({
        name
    })
}
</script>

<style lang="less">
.header-left-dialog {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 12px;

    .logo {
        width: 60px;
        height: auto;
        margin-bottom: 48px;
        cursor: pointer;
    }

    .navs {
        .nav {
            font-size: 20px;
            cursor: pointer;
            margin-bottom: 32px;
        }

        .active_nav {
            color: #dc4891;
        }
    }
}
</style>
<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.con-header {

    /* 移动设备样式 */
    .con-header-pc {
        display: none;
    }

    .con-header-h5 {
        .left-icon {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 99;
            width: calc(var(--vw) * 12);
            height: calc(var(--vw) * 9);
            cursor: pointer;
        }

        .right-icon {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 99;
            width: calc(var(--vw) * 12);
            height: calc(var(--vw) * 9);
            cursor: pointer;
        }
    }
}

</style>