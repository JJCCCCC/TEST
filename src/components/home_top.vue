<template>
  <div class="home_top">
    <div class="search">
      <div class="bi bi-plus add"></div>
      <div class="searchBox">
        <input
          ref="el"
          type="text"
          placeholder="搜索菜谱"
          @focus="sousuo"
          v-model="keyword"
          @keydown.enter="searchFood"
        />
        <span class="iconfont fangda">&#xe617;</span>
        <span class="iconfont close" v-show="finding" @click="findingEnd"
          >&#xf01f1;
        </span>
      </div>
      <router-link to="shoucang"><span class="bi bi-bell"></span></router-link>
    </div>
    <transition
      enter-active-class="animate__animated  animate__fadeIn"
      enter-to-class="animate__animated  animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      leave-to-class="animate__animated  animate__fadeOut"
    >
      <div class="searchConetnt" v-if="finding">
        <div class="history" v-if="historyFood.length != 0">
          <h6>
            历史搜索
            <span class="iconfont shanchu" @click="qingkong">&#xe66b;</span>
          </h6>
          <div class="historyConetnt">
            <div
              class="findItem"
              v-for="(item, index) in historyFood"
              v-bind:key="index"
            > 
              <router-link
                :to="{ path: '/findInfo', query: { name: item.name } }"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="hotFind">
          <h6>热门搜索</h6>
          <div class="hotContent">
            <div
              class="findItem"
              v-for="(item, index) in hotfind"
              :key="index"
              @click="finding = false"
            >
              <router-link
                :to="{ path: '/findInfo', query: { name: item.name } }"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <ul class="director" v-if="show">
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '新手菜谱' } }">
          <div class="bi bi-calendar2-minus"></div>
          <span>新手菜谱</span>
        </router-link>
      </li>
      <li>
        <router-link to="/classfition_list">
          <div class="bi bi-diagram-3"></div>
          <span>菜品分类</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home">
          <div class="bi bi-award"></div>
          <span>排行榜</span>
        </router-link>
      </li>
      <li>
        <router-link to="/home">
          <div class="bi bi-gift"></div>
          <span>签到奖励</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "homeTop",
  data() {
    return {
      finding: false,
      hotfind: [],
      findContent: [],
      keyword: "",
      time1: null,
      findItemName: "",
      historyFood: [],
    };
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    sousuo() {
      this.finding = true;
      this.$emit("xunzhaozhong", { finding: this.finding });
      this.getData("https://apis.netstart.cn/douguo/recipe/search/hot");
    },
    getData(url, bianliang) {
      if (bianliang == undefined) {
        bianliang = null;
      }
      let promise = axios.get(url);
      promise.then((data) => {
        if (data.status == 200) {
          if (bianliang == null) {
            this.hotfind = data.data.result.suggests;
          }
        }
      });
    },
    findingEnd() {
      this.finding = false;
      this.$emit("xunzhaozhong", { finding: this.finding });
    },
    searchFood() {
      if (this.keyword === "") {
        return;
      } else {
        this.finding = false;
        this.$refs.el.blur();
        this.$router.push({ path: "/findInfo", query: { name: this.keyword } });
        global.historyFood.push({ name: this.keyword });
        global.historyFood = global.quchong(global.historyFood);
        localStorage.setItem("history", JSON.stringify(global.historyFood));
        this.historyFood = global.historyFood;
        // localStorage.setItem("history", JSON.stringify(global.historyFood));
        this.keyword = "";
      }
    },
    qingkong() {
      global.historyFood = [];
      this.historyFood = global.historyFood;
      localStorage.setItem("history", JSON.stringify(global.historyFood));
    },
  },
  watch: {
    keyword: {
      handler(old, newValue) {
        if (this.time1) {
          clearTimeout(this.time1);
        }
        this.timer = setTimeout(() => {
          // this.searchFood();
          this.keyword = this.keyword.trim("");
        }, 200);
      },
      deep: true,
    },
  },
  // beforeRouteLeave(to, from, next) {

  //   console.log(111);
  //   console.log(this.keyword);
  //   next();
  // },
  created() {
    this.historyFood = JSON.parse(localStorage.getItem("history"));
    if (this.historyFood == undefined) {
      this.historyFood = [];
    }
  },
};
</script>



<style lang="scss" scoped>
.home_top {
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding-top: 30px;
  position: relative;
  a {
    -webkit-tap-highlight-color: transparent;
  }
  .search {
    width: 100%;
    height: 40px;
    display: flex;
    align-content: center;
    .add {
      flex-basis: 10%;
      text-align: center;
      line-height: 40px;
      font-size: 30px;
    }
    .searchBox {
      flex-basis: 80%;
      text-align: center;
      line-height: 40px;
      position: relative;
      input {
        display: block;
        width: 100%;
        height: 40px;
        background-color: #eeeeee;
        outline: none;
        border: none;
        padding: 5px 5px;
        padding-left: 40px;
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: bold;
        font-size: 16px;
        color: #060606;
        &::placeholder {
          color: #ccc;
          font-weight: normal;
          font-size: 16px;
        }
      }
      .fangda {
        position: absolute;
        top: 0px;
        left: 20px;
        font-size: 16px;
      }
      .close {
        position: absolute;
        top: 0px;
        right: 10px;
        font-size: 20px;
      }
    }
    a {
      flex-basis: 10%;
      text-align: center;
      color: black;
      line-height: 40px;
      font-size: 22px;
    }
  }
  .searchConetnt {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    position: absolute;
    background-color: #f7f7f7;
    z-index: 99999;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding-top: 20px;
    .findItem {
      display: inline-block;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: white;
      border-radius: 10px;
      padding: 0px 5px;
      margin-right: 5px;
      a {
        color: black;
        text-decoration: none;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .history {
      width: 100%;
      h6 {
        width: 100%;
        margin: 0;
        height: 30px;
        line-height: 30px;
        .shanchu {
          display: block;
          float: right;
          color: #ccc;
          // margin-right: 10px;
          font-size: 20px;
        }
      }
    }
    .hotFind {
      width: 100%;
      margin-top: 20px;
      h6 {
        width: 100%;
        margin: 0;
        height: 30px;
        line-height: 30px;
      }
      .hotContent {
        width: 100%;
        padding-bottom: 20px;
      }
      .findItem:nth-child(1) a {
        border: 1px solid #cd8f7d;
        color: #cd8f7d;
      }
      .findItem:nth-child(2) a {
        border: 1px solid #94b4b3;
        color: #94b4b3;
      }
    }
  }
  .director {
    width: 100%;
    height: 80px;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
    padding-bottom: 20px;
    li {
      flex-basis: 21%;
      height: 100%;
      text-align: center;
      a {
        width: 100%;
        height: 100%;
        display: block;
        color: #79787d;
        text-decoration: none;
        .bi {
          width: 80%;
          height: 70%;
          font-size: 32px;
          line-height: 60px;
          margin: 0 auto;
          background-color: white;
          border-radius: 15px;
          color: #f6b157;
        }
        span {
          display: block;
          width: 100%;
          height: 25%;
          font-size: 16px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>