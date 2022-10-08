<template>
  <div class="recommend_content">
    <transition
      enter-active-class="animate__animated  animate__bounceIn"
      enter-to-class="animate__animated  animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
      leave-to-class="animate__animated  animate__bounceOut"
    >
      <lAlert v-bind:message="fmessage" v-if="loading"></lAlert>
    </transition>
    <compLoading v-if="foodList1.length == 0"></compLoading>
    <transition
      enter-active-class="animate__animated  animate__bounceInDown"
      enter-to-class="animate__animated  animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutDown"
      leave-to-class="animate__animated  animate__bounceOutDown"
    >
      <returnTop></returnTop>
    </transition>
    <ul class="content_list" v-if="foodList1.length != 0">
      <li v-for="(item, index) in foodList1" v-bind:key="index">
        <div class="userInfo">
          <div class="user">
            <div class="userIcon">
              <img v-lazy="item.r.a.p" alt="" />
            </div>
            <div class="username">
              {{ item.r.a.n }}
            </div>
          </div>
          <div class="foodCollect">
            {{ item.r.collect_count_text }}
          </div>
        </div>
        <router-link
          :to="{ path: '/information', query: { id: foodList1[index].r.id } }"
        >
          <div class="imgBox">
            <img v-lazy="item.r.img" alt="" />
          </div>
        </router-link>
        <div class="foodInfo">
          {{ item.r.n }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import lAlert from "../components/myAlert.vue";
import compLoading from "../components/comp-loading.vue";
import returnTop from "../components/returnTop.vue"
export default {
  name: "recommend_list",
  components: {
    lAlert,
    compLoading,
    returnTop
  },
  data() {
    return {
      foodList1: [],
      TrueHeight: 0,
      chuangkou: 0,
      gundong: 0,
      limit: 10,
      delay: 500,
      fmessage: "好饭不怕晚~~~",
      loading: false,
    };
  },
  methods: {
    getFoodList(a) {
      if (a == undefined) {
        a = 10;
      }
      let promise = axios.get(
        `https://apis.netstart.cn/douguo/home/recommended/0/${a}`
      );
      promise.then((data) => {
        if (data.status == 200) {
          data.data.result.list.forEach((item, index) => {
            if (item.type == 1) {
              this.foodList1.push(item);
              this.loading = false;
            }
          });
        }
      });
    },
    getTop() {
      this.TrueHeight = document.body.clientHeight; //实际高度
      this.chuangkou = document.documentElement.clientHeight; //视口高度
      this.gundong = document.documentElement.scrollTop; //滚到高度
      if (this.TrueHeight - (this.chuangkou + this.gundong) <= 10) {
        this.loading = true;
        this.addData();
      }
    },
    addData() {
      this.limit += 10;
      this.getFoodList(this.limit);
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
  },
  created() {
    this.getFoodList();
    // console.log(111);
  },
  mounted() {
    window.addEventListener("scroll", this.debounce(this.getTop, this.delay));
  },
};
</script>



<style lang="scss" scoped>
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
      a {
        display: block;
        width: 100%;
      }
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
            margin-right: 5px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
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
        height: 40px;
        width: 100%;
        font-size: 16px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 10px;
      }
    }
  }
}
</style>