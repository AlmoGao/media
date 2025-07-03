<!-- 底部 -->
<template>
    <div class="con-bottom">

        <div class="box">
            <div class="left">
                <div class="title">{{site.name}} | 华语片圈先驱者</div>
                <div class="left-con"> {{site.name}}创立至今，一直屹立于行业浪尖。作为华语片圈的先驱者，以用户全平台体验为核心，提供最新的全方位技术支持，致力打造最好的娱乐生态圈。</div>
            </div>
            <div class="line"></div>
            <div class="right">
                <div class="title">
                    <img class="icon" src="@/assets/telegram.png" alt="">
                    <span style="user-select: all;">{{ site.telergam }}</span>
                </div>

                <!-- <div class="qr-con">
                    <div class="qr-item">
                        <div class="qr"></div>
                        <div class="name">商务</div>
                    </div>
                    <div class="line2"></div>
                    <div class="qr-item">
                        <div class="qr"></div>
                        <div class="name">客服</div>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="line"></div>
        <div class="copyright">Copyright @ 2025 | {{site.name}}有限公司 保留所有权力。 </div>
    </div>
</template>

<script setup>
import store from "@/store"
import { computed } from "vue"

const site = computed(() => store.state.config.site || {})

</script>

<style lang="less" scoped>
.con-bottom {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #505acb, #d23c96, #ffc150);
    padding: 4vw 0;

    .box {
        .left {
            padding: 4vw;

            .title {
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 2vw;
            }

            .left-con {
                font-size: 15px;
            }
        }

        .right {
            padding: 4vw;

            .title {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 4vw;

                .icon {
                    height: 4vw;
                    margin-right: 2vw;
                    border-radius: 50%;
                    background-color: #fff;
                }
            }

            .qr-con {
                display: flex;
                align-items: flex-start;
                justify-content: center;

                .line2 {
                    width: 1px;
                    height: 30vw;
                    mix-blend-mode: overlay;
                    background-blend-mode: overlay;
                    background-image: linear-gradient(to bottom, #fff, #fff);
                    margin: 0 2vw;
                }

                .qr-item {
                    .qr {
                        width: 30vw;
                        height: 30vw;
                        background-color: #fff;
                    }

                    .name {
                        text-align: center;
                        margin-top: 2vw;
                        font-size: 6vw;
                    }
                }
            }
        }
    }

    .line {
        width: 100%;
        height: 1px;
        mix-blend-mode: overlay;
        background-blend-mode: overlay;
        background-image: linear-gradient(to bottom, #fff, #fff);
    }

    .copyright {
        text-align: center;
        padding-top: 4vw;
        font-size: 15px;
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
    .con-bottom {
        padding: 24px 0;

        .copyright {
            padding-top: 24px;
            font-size: 18px;
        }

        .box {
            .left {
                padding: 24px;

                .title {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 12px;
                }

                .left-con {
                    font-size: 18px;
                }
            }

            .right {
                padding: 24px;

                .title {
                    margin-bottom: 24px;

                    .icon {
                        height: 20px;
                        margin-right: 12px;
                    }
                }

                .qr-con {
                    .line2 {
                        height: 200px;
                        margin: 0 20px;
                    }

                    .qr-item {
                        .qr {
                            width: 200px;
                            height: 200px;
                        }

                        .name {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 24px;
                        }
                    }
                }
            }
        }
    }

}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
    .con-bottom {
        padding: 32px 0;

        .copyright {
            padding-top: 32px;
            font-size: 20px;
        }
        .box {
            display: flex;
            align-items: center;
            justify-content: center;
            .left {
                width: 400px;
                .title {
                    margin-bottom: 32px;
                }
            }
            .line {
                width: 1px;
                height: 200px;
            }
            .right {
                .qr-con {
                    .qr-item {
                        margin-right: 32px;
                        .qr {
                            width: 140px;
                            height: 140px;
                        }
                    }
                    .line2 {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>