<template>
  <div class="video_content">
    <transition
      enter-active-class="animate__animated  animate__bounceIn"
      enter-to-class="animate__animated  animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
      leave-to-class="animate__animated  animate__bounceOut"
    >
      <lAlert v-bind:message="fmessage" v-if="loading"></lAlert>
    </transition>
    <compLoading v-if="video.length == 0"></compLoading>
     <transition
      enter-active-class="animate__animated  animate__bounceInDown"
      enter-to-class="animate__animated  animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutDown"
      leave-to-class="animate__animated  animate__bounceOutDown"
    >
      <returnTop></returnTop>
    </transition>
    <ul class="video_list">
      <li v-for="item in video" :key="item.r.id">
        <div class="user">
          <div class="userIcon">
            <img :src="item.r.a.p" alt="" />
          </div>
          <div class="userName">{{ item.r.a.n }}</div>
          <i class="userLv">Lv{{ item.r.a.lvl }}</i>
        </div>
        <router-link
          :to="{
            path: '/information',
            query: { id: item.r.id, src: item.r.vfurl },
          }"
        >
          <div class="videoImg">
            <img :src="item.r.gif" alt="" />
            <div class="bi bi-play-circle button"></div>
          </div>
        </router-link>
        <div class="collect">
          <div class="iconBox">
            <span
              class="is"
              v-for="items in item.r.collect_users"
              :key="items.id"
            >
              <img :src="items.p" alt="" />
            </span>
            <span class="num">{{ item.r.collect_count_text }}</span>
          </div>
          <div class="bi bi-star"></div>
        </div>
        <div class="explnation">
          {{ item.r.n }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import lAlert from "../components/myAlert.vue";
import compLoading from "../components/comp-loading.vue"
import returnTop from "../components/returnTop.vue";
export default {
  name: "recommend_list",
  components: {
    lAlert,
    compLoading,
    returnTop
  },
  data() {
    return {
      video: [],
      TrueHeight: 0,
      chuangkou: 0,
      gundong: 0,
      limit: 20,
      delay: 500,
      fmessage: "好饭不怕晚~~~",
      loading: false,
    };
  },
  methods: {
    getVideoList(a) {
      if (a == undefined) {
        a = 20;
      }
      let promise = axios.get(
        `https://apis.netstart.cn/douguo/home/videos/0/${a}`
      );
      promise.then((data) => {
        if (data.status == 200) {
          this.video = data.data.result.list;
          this.video.splice(1, 1)
          this.loading = false;
        }
      });
    },
    debounce(fn, delay) {
      let timer = null;
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn();
        }, delay);
      };
    },
    getTop() {
      this.TrueHeight = document.body.clientHeight; //实际高度
      this.chuangkou = document.documentElement.clientHeight; //视口高度
      this.gundong = document.documentElement.scrollTop; //滚到高度
      // console.log(this.TrueHeight,this.chuangkou,this.gundong)
      if (this.TrueHeight - (this.chuangkou + this.gundong) <= 10) {
        this.loading = true;
        this.addData();
      }
    },
    addData() {
      this.limit += 10;
      this.getVideoList(this.limit);
    },
  },
  created() {
    this.getVideoList();
    // window.onscroll = this.debounce(this.getTop, this.delay);
    window.addEventListener("scroll",this.debounce(this.getTop, this.delay));
  },
};
</script>

<style lang="scss" scoped>
.video_content {
  width: 100%;
  a {
    color: black;
    text-decoration: none;
  }
  .video_list {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
    li {
      width: 100%;
      .user {
        width: 100%;
        height: 60px;
        display: flex;
        font-size: 16px;
        .userIcon {
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-top: 10px;
          }
        }
        .userName {
          font-weight: bold;
          height: 100%;
          line-height: 60px;
        }
        i {
          line-height: 60px;
          margin-left: 10px;
          color: #f6b157;
        }
      }
      .videoImg {
        width: 100%;
        position: relative;
        img {
          width: 100%;
          border-radius: 20px;
        }
        .button {
          position: absolute;
          bottom: 20px;
          right: 10px;
        }
      }
      .collect {
        width: 100%;
        height: 30px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconBox {
          height: 100%;
          display: flex;
          align-items: center;
          .is {
            padding-top: 5px;
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-left: 2px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .num {
            margin-left: 10px;
            display: inline-block;
            height: 100%;
            line-height: 40px;
          }
        }
        .bi-star {
          font-size: 20px;
          margin-right: 10px;
        }
      }
      .explnation {
        font-size: 20px;
      }
    }
  }
}
</style>