<!-- 底部 -->
<template>
    <div class="con-bottom">
        <div class="t">商务合作：<span style="user-select: all;">{{ site.telergam }}</span></div>
        <div>警告︰本網站只這合十八歲或以上人士觀看。內容可能令人反感；不可將本網站的內容派發、傳閱、出售、出租、交給或借予年齡未滿18歲的人士或將本網站內容向該人士出示、播放或放映。</div>
        <div>站点申明：我们立足于美利坚合众国，受北美法律保护,未满18岁或被误导来到这里，请立即离开！</div>
    </div>
</template>

<script setup>
import store from "@/store"
import { computed } from "vue"

const site = computed(() => store.state.config.site || {})

</script>

<style lang="less" scoped>
.con-bottom {
    background-color: #333;
    color: #aaa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: calc(var(--vw) * 4);
    text-align: center;
    font-size: calc(var(--vw) * 3.6);
    line-height: calc(var(--vw) * 8);
    .t {
        margin-bottom: calc(var(--vw) * 2);
        font-size: calc(var(--vw) * 4);
    }
}
</style>