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
            width: 12vw;
            height: 9vw;
            cursor: pointer;
        }

        .right-icon {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 99;
            width: 12vw;
            height: 9vw;
            cursor: pointer;
        }
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .con-header {

        /* 平板样式 */
        .con-header-pc {
            display: none;
        }

        .con-header-h5 {
            .left-icon {
                width: 80px;
                height: 60px;
            }

            .right-icon {
                width: 80px;
                height: 60px;
            }
        }
    }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
    .con-header {

        /* 桌面样式 */
        .con-header-pc {
            display: block;
            position: fixed;
            width: 100%;
            height: 100px;
            top: 0;
            left: 0;
            z-index: 10;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 5px #eee;

            .con-pc {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 0 20px;

                .logo {
                    height: 68px;
                    width: auto;
                    cursor: pointer;
                }

                .navs {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .nav {
                        padding: 0 20px;
                        margin-left: 32px;
                        cursor: pointer;
                    }

                    .active_nav {
                        color: #dc4891;
                    }
                }

                .search {
                    width: 24px;
                    height: 24px;
                    margin-left: 84px;
                    cursor: pointer;
                }
            }

        }

        .con-header-h5 {
            display: none;
        }
    }
}
</style>