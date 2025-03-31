<!-- 电影列表 -->
 <template>
    <div class="maxwidth con-list">
        <div class="list-item" v-for="i in 21" :key="i">
            <img class="pic" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg" alt="">
            <div class="title">sawy332-清纯JK学生妹被带到酒店调教成小母狗榨精-成片</div>
        </div>
    </div>
 </template>

 <script setup>

</script>

<style lang="less" scoped>
/* 默认样式 - 移动优先 (小于750px) */
.con-list {
  /* 移动设备样式 */
  padding: 3vw;
  display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-between;
    .list-item {
        cursor: pointer;
        width: 44vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .pic {
            width: 100%;
            height: 32vw;
        }
        .title {
            margin: 2vw 0;
            font-size: 3.6vw;
        }
    }
}

/* 平板设备 (750px及以上) */
@media (min-width: 750px) {
  .con-list {
    /* 平板样式 */
    padding: 2.5vw;
    .list-item {
        width: 30vw;
        .pic {
            width: 100%;
            height: 22vw;
        }
        .title {
            margin: 1vw 0;
            font-size: 22px;
        }
    }
  }
}

/* 桌面设备 (1200px及以上) */
@media (min-width: 1200px) {
  .con-list {
    /* 桌面样式 */
    padding: 32px 0;
    .list-item {
        width: 290px;
        .pic {
            width: 100%;
            height: 200px;
        }
        .title {
            margin: 12px 0;
            font-size: 22px;
        }
    }
  }
}

@media (min-width: 1240px) {
  .con-list {
    /* 桌面样式 */
    padding: 32px 0;
    .list-item {
        width: 300px;
        .pic {
            width: 100%;
            height: 210px;
        }
        .title {
            margin: 12px 0;
            font-size: 22px;
        }
    }
  }
}
@media (min-width: 1305px) {
  .con-list {
    /* 桌面样式 */
    padding: 32px 0;
    .list-item {
        width: 320px;
        .pic {
            width: 100%;
            height: 220px;
        }
        .title {
            margin: 12px 0;
            font-size: 22px;
        }
    }
  }
}

</style>