<template>
  <div class="findInfo">
    <findInfoTop
      v-bind:show="show"
      v-on:sousuocaiming="myrev"
      v-on:biaoqiancaiming="myrev2"
    ></findInfoTop>
    <div class="search">
      <loading v-if="findContent.length == 0"></loading>
       <transition
      enter-active-class="animate__animated  animate__bounceIn"
      enter-to-class="animate__animated  animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
      leave-to-class="animate__animated  animate__bounceOut"
    >
      <alters v-bind:message="fmessage" v-if="finding"></alters>
    </transition>
      <ul class="findList" v-if="findContent.length != 0">
        <li v-for="(item, index) in findContent" :key="item.r.id + index">
          <div class="imgBox">
            <router-link
              :to="{ path: '/information', query: { id: item.r.id } }"
            >
              <img :src="item.r.img" alt="" />
            </router-link>
          </div>
          <div class="info">
            <div class="title">
              {{ item.r.n }}
            </div>
            <div class="fenshu">
              <span v-if="item.r.rate != 0">{{ item.r.rate }}分 ·</span
              ><span v-if="item.r.dc != 0"> {{ item.r.dc }}人学做</span>
            </div>
            <div class="tag">
              <span
                v-for="(items, index) in item.r.recipe_list_tags"
                :key="index"
                >{{ items.text }}</span
              >
            </div>
            <div class="user">
              <div class="userIcon">
                <img v-lazy="item.r.a.p" alt="" />
              </div>
              <div class="userName">
                {{ item.r.a.n }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import findInfoTop from "../components/findInfo_top.vue";
import loading from '../components/comp-loading.vue'
import alters from "../components/myAlert.vue"
export default {
  name: "findInfo",
  components: {
    findInfoTop,
    loading,
    alters
  },
  data() {
    return {
      findContent: [],
      show: false,
      caiming: "",
      finding:false,
      fmessage:"觅食中...."
    };
  },
  props: {
    imgUrl: {
      type: String,
    },
  },
  methods: {
    getData(name) {
      let promise = axios.get(
        `https://apis.netstart.cn/douguo/recipe/search?keyword=${name}`
      );
      promise.then((data) => {
        if (data.status == 200) {
          let arr = data.data.result.list;
          let arr1 = [];
          arr.forEach((item) => {
            if (item.r == undefined) {
              return;
            } else {
              arr1.push(item);
            }
          });
          this.findContent = arr1;
          this.finding = false
        }
      });
    },
    myrev(res) {
      this.caiming = res.name;
      this.finding = true
      this.getData(this.caiming);
    },
    myrev2(res) {
      this.finding = true
      this.getData(res.name);
    },
  },
  watch: {
    imgUrl: {
      immediate: true, // 首次变化，立即执行回调函数
      handler: function (value) {
        // console.log("图片的路径:",value);
        // 创建图片的实例
        let image = new Image();
        // 请求图片
        image.src = value;
        // 加载图片
        image.onload = () => {
          // 如果图片路径有问题，那么就不执行当前这个onload事件函数
          // this.src = value;
          // 替换图片
          let d = setTimeout(() => {
            this.src = value;
            clearTimeout(d);
          }, 1000);
        };
      },
    },
  },
  created() {
    let name = this.$route.query.name;
    this.getData(name);
  },
};
</script>

<style lang="scss" scoped>
.findInfo {
  width: 100%;
  .search {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 60px;
    .findList {
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      padding: 0 15px;
      box-sizing: border-box;
      li {
        height: 150px;
        width: 100%;
        margin-bottom: 10px;
        // background-color: pink;
        display: flex;
        .imgBox {
          height: 100%;
          width: 170px;
          border-radius: 15px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          height: 100%;
          font-size: 16px;
          width: 184px;
          padding-left: 8px;
          box-sizing: border-box;
          .title {
            width: 100%;
            font-weight: bold;
            margin-top: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 14px;
          }
          .fenshu {
            font-size: 14px;
            margin-bottom: 10px;
            width: 100%;
            height: 20px;
            font-weight: bold;
          }
          .tag {
            width: 100%;
            height: 21px;
            margin-bottom: 16px;
            span {
              display: inline-block;
              font-size: 12px;
              color: #737071;
              background-color: #ccc;
              box-sizing: border-box;
              padding: 0 2px;
              margin-right: 3px;
              border-radius: 5px;
              line-height: 16px;
              text-align: center;
            }
          }
          .user {
            display: flex;
            height: 14px;
            font-size: 14px;
            color: #ccc;
            .userIcon {
              width: 14px;
              height: 14px;
              margin-right: 5px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>