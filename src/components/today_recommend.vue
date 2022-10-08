<template>
  <div class="recommend">
    <div class="recommend_nav">
      <div
        class="innerBox"
        ref="box"
        @touchstart="listTouch"
        @touchmove="listMove"
      >
        <h6>今日推荐</h6>
        <ul class="nav_list">
          <li :class="[{ active: index == 0 }]" @click="index = 0">推荐</li>
          <li :class="[{ active: index == 1 }]" @click="index = 1">笔记</li>
          <li :class="[{ active: index == 2 }]" @click="index = 2">视频</li>
          <li :class="[{ active: index == 3 }]" @click="index = 3">母婴</li>
          <li :class="[{ active: index == 4 }]" @click="index = 4">安佳烘焙</li>
        </ul>
      </div>
      <div class="bi bi-plus-circle"></div>
    </div>
    <!-- 列表部分 -->
    <keep-alive>
      <recommend-content v-if="index == 0"></recommend-content>
      <note v-if="index == 1"></note>
      <video1 v-if="index == 2"></video1>
    </keep-alive>
  </div>
</template>


<script>
import recommendContent from "../pages/recommend_content.vue";
import note from "../pages/note.vue";
import video1 from "../pages/video.vue";
export default {
  name: "recommend",
  components: {
    recommendContent,
    note,
    video1,
  },
  data() {
    return {
      foodList1: [],
      foodList2: [],
      isLoading: false,
      x: 0,
      x1: 0,
      index: 0,
    };
  },
  methods: {
    listTouch(e) {
      let box = this.$refs.box;
      this.x = e.targetTouches[0].pageX - box.offsetLeft;
    },
    listMove(e) {
      let box = this.$refs.box;
      this.x1 = e.targetTouches[0].pageX - this.x;
      let distance = (110 * window.innerWidth) / 320;
      if (this.x1 < -distance) {
        this.x1 = -distance;
      } else if (this.x1 > 0) {
        this.x1 = 0;
      }
      box.style.left = this.x1 + "px";
    },
  },
  created() {
    // if(this.foodList.length != 0){
    //     this.isLoading = true
    // }
  },
};
</script>


<style lang="scss" scoped>
.active {
  color: #f6b157;
}
.recommend {
  overflow: hidden;
  padding-left: 15px;
  padding-right: 15px;
  margin: 10px 0;
  margin-bottom: 0;
  padding-bottom: 80px;
  .recommend_nav {
    height: 40px;
    width: 100%;
    overflow: hidden;
    font-size: 16px;
    line-height: 40px;
    position: relative;
    .innerBox {
      position: absolute;
      width: 1000px;
      transition: all 0.5s;
      h6 {
        margin: 0;
        float: left;
        font-size: 20px;
        margin-right: 12px;
      }
      .nav_list {
        padding: 0;
        margin: 0;
        list-style: none;
        float: left;
        color: #7f7f7f;
        li {
          float: left;
          font-size: 16px;
          margin-right: 12px;
        }
      }
    }
    .bi {
      position: absolute;
      right: 0;
      top: 0;
      height: 40px;
      width: 45px;
      z-index: 99;
      background-color: white;
      text-align: center;
      box-shadow: -6px 0 5px white;
      font-size: 20px;
      color: #ccc;
    }
  }
  .recommend_content {
    width: 100%;
    .content_list {
      list-style: none;
      width: 100%;
      padding: 0;
      margin: 0;
      li {
        margin-bottom: 20px;
        width: 100%;
        .userInfo {
          width: 100%;
          height: 30px;
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          margin-bottom: 10px;
          .user {
            width: 200px;
            height: 100%;
            display: flex;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .userIcon {
              height: 100%;
              width: 30px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .username {
              line-height: 30px;
            }
          }
          .foodCollect {
            line-height: 30px;
          }
        }
        .imgBox {
          width: 100%;
          img {
            width: 100%;
            border-radius: 20px;
          }
        }
        .foodInfo {
          height: 30px;
          width: 100%;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>