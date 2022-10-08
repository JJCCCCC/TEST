<template>
  <div class="huodong">
    <home-top v-bind:show="show"></home-top>
    <gonggao v-bind:gcurrent="current"></gonggao>
    <div class="box">
      <h4>热门活动上线中</h4>
      <compLoading v-if="loading"></compLoading>
      <div class="going item">
        <ul v-if="ongoing.length != 0">
          <li v-for="(item, index) in ongoing" v-bind:key="index + 'one'">
            <a :href="item.url">
              <div class="imgBox">
                <img :src="item.image" alt="" />
              </div>
              <div class="actInfo">
                <div class="title">
                  {{ item.name }}
                </div>
                <div class="join">立即参与</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <h4>往期回顾</h4>
      <compLoading v-if="loading"></compLoading>
      <div class="ended item">
        <ul v-if="ended.length != 0">
          <li v-for="(item, index) in ended" v-bind:key="index + 'one'">
            <a :href="item.url">
              <div class="imgBox">
                <img :src="item.image" alt="" />
              </div>
              <div class="actInfo">
                <div class="title">
                  {{ item.name }}
                </div>
                <div class="join">回顾经典</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import gonggao from "../components/gonggao.vue";
import homeTop from "../components/home_top.vue";
import compLoading from "../components/comp-loading.vue";
export default {
  name: "huodong",
  data() {
    return {
      ongoing: [],
      ended: [],
      current: false,
      show: false,
      loading: true,
    };
  },
  components: {
    gonggao,
    homeTop,
    compLoading,
  },
  methods: {
    getData() {
      let promise = axios.get(
        "https://apis.netstart.cn/douguo/home/events/getlists?offset=0limit=20"
      );
      promise.then((data) => {
        if (data.status == 200) {
          this.ongoing = data.data.data.ongoing.events;
          this.ended = data.data.data.ended.events;
          // console.log(1)
          this.loading = false;
        }
      });
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    // console.log(this.current)
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.current = true;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.current = false;
    // console.log( this.current)
    next();
  },
};
</script>

<style lang="scss" scoped>
.huodong {
  width: 100%;
  padding-bottom: 60px;
  .box {
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    width: 100%;
    h4 {
      margin-top: 20px;
      margin-bottom: 10px;
      // font-size: 18px;
      font-size: 20px;
    }
    .item {
      width: 100%;
      ul {
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          width: 100%;
          margin-bottom: 20px;
          a {
            display: block;
            width: 100%;
            color: black;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;
          }
          .imgBox {
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .actInfo {
            display: flex;
            font-size: 16px;
            height: 40px;
            .title {
              width: 70%;
              font-weight: bold;
            }
            .join {
              width: 30%;
              text-align: center;
              line-height: 40px;
              color: #f6b157;
            }
          }
        }
      }
    }
  }
}
</style>