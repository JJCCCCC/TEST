<template>
  <div class="classfitionList">
     <transition
      enter-active-class="animate__animated  animate__bounceIn"
      enter-to-class="animate__animated  animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
      leave-to-class="animate__animated  animate__bounceOut"
    >
    <myAlert v-bind:message="fmessage" v-if="loading"></myAlert>
     </transition>
    <div class="classfition_list">
      <div class="title">
        <span class="fanhui" @click="fanhuishangyiceng">&lt;</span>
        <span class="zhong">菜品分类</span>
        <span class="iconfont fangda">&#xe617;</span>
      </div>
      <div class="listContent">
        <div class="recommend_nav">
          <div
            class="innerBox"
            ref="box"
            @touchstart="listTouch"
            @touchmove="listMove"
          >
            <ul class="nav_list">
              <li
                v-for="(item, index) in nav"
                v-bind:key="item.id"
                :class="[{ chocied: a == index }]"
                @click="
                  a = index;
                  getData(index);
                "
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="navContent">
          <div
            class="item"
            v-for="(items, index) in currentTag"
            v-bind:key="index"
          >
            <router-link
              :to="{ path: '/findInfo', query: { name: items.name } }"
            >
              {{ items.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myAlert from '../components/myAlert.vue'
export default {
  name: "classfition_list",
  components:{
    myAlert
  },
  data() {
    return {
      a: 0,
      nav: [],
      currentTag: [],
      x: 0,
      x1: 0,
      loading:false,
      fmessage:"数据加载中..."
    };
  },
  methods: {
    getData(index) {
      this.loading = true
      let promise = axios.get(
        "https://apis.netstart.cn/douguo/recipe/flatcatalogs"
      );
      promise.then((data) => {
        this.a = index;
        if (data.status == 200) {
          this.nav = data.data.result.cs;
          this.currentTag = this.nav[this.a].cs;
          this.loading = false
        }
      });
    },
     fanhuishangyiceng(){
      this.$router.go(-1)
    },
    listTouch(e) {
      let box = this.$refs.box;
      this.x = e.targetTouches[0].pageX - box.offsetLeft;
    },
    listMove(e) {
      let box = this.$refs.box;
      this.x1 = e.targetTouches[0].pageX - this.x;
      let distance = (400 * window.innerWidth) / 320;
      if (this.x1 < -distance) {
        this.x1 = -distance;
      } else if (this.x1 > 0) {
        this.x1 = 0;
      }
      box.style.left = this.x1 + "px";
    },
  },
  created() {
    this.getData(0);
  },
};
</script>

<style lang="scss" scoped>
.classfitionList {
  width: 100%;
  padding-bottom: 160px;
  .classfition_list {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    //   overflow: hidden;
    // color: white;
    .title {
      width: 100%;
      height: 40px;
      // font-size: 16px;
      // background-color: pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // overflow: hidden;
      .fanhui,
      .fangda {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
      }
      .zhong {
        font-size: 20px;
        font-weight: bolder;
      }
      &::before {
        content: "";
        position: absolute;
        top: 40px;
        width: 91%;
        height: 0.25em;
        background: linear-gradient(
            135deg,
            transparent,
            transparent 45%,
            #f6b157,
            transparent 55%,
            transparent 100%
          ),
          linear-gradient(
            45deg,
            transparent,
            transparent 45%,
            #f6b157,
            transparent 55%,
            transparent 100%
          );
        background-size: 0.5em 0.5em;
        background-repeat: repeat-x, repeat-x;
      }
    }
    .listContent {
      width: 100%;
      // display: flex;
      margin-top: 10px;
      height: 700px;
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
          .nav_list {
            padding: 0;
            margin: 0;
            list-style: none;
            float: left;
            color: #7f7f7f;
            li {
              float: left;
              font-size: 16px;
              margin: 0 12px;
              position: relative;
            }
            .chocied {
              color: #f6b157;
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
      .navContent {
        width: 100%;
        //   height: 700px;
        // background-color: pink;
        padding-bottom: 100px;

        box-sizing: border-box;
        padding: 20px 10px;
        .item {
          display: inline-block;
          height: 40px;
          // background-color: #ccc;
          border: 2px solid #ccc;
          border-radius: 15px;
          margin-right: 10px;
          margin-bottom: 10px;
          text-align: center;
          line-height: 40px;
          padding: 2px 5px;
          a {
            text-decoration: none;
            color: #f6b157;
          }
        }
      }
    }
  }
}
</style>