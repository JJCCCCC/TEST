<template>
  <div class="findInfo">
    <div class="search">
      <h1>菜谱收藏</h1>
      <loading v-if="finding"></loading>
      <transition
        enter-active-class="animate__animated  animate__bounceIn"
        enter-to-class="animate__animated  animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
        leave-to-class="animate__animated  animate__bounceOut"
      >
      </transition>
      <div v-if="!finding">
        <div class="aa" v-if="arr.length == 0">您还没有收藏菜谱哦！</div>
        <ul class="findList" v-if="arr.length != 0">
          <li v-for="(item, index) in arr" :key="index">
            <div class="imgBox">
              <router-link
                :to="{ path: '/information', query: { id: item.cook_id } }"
              >
                <img :src="item.thumb_path" alt="" />
              </router-link>
            </div>
            <div class="info">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="user">
                <div class="userIcon">
                  <img v-lazy="item.user.user_photo" alt="" />
                </div>
                <div class="userName">
                  {{ item.user.nickname }}
                </div>
                <!-- <div>
                  <button @click="shanchu">删除</button>
                </div> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import loading from "../components/comp-loading.vue";
import alters from "../components/myAlert.vue";
export default {
  name: "findInfo",
  components: {
    loading,
    alters,
  },
  data() {
    return {
      findContent: [],
      show: false,
      caiming: "",
      finding: false,
      fmessage: "觅食中....",
      collection: [],
      arr: [],
    };
  },
  props: {
    imgUrl: {
      type: String,
    },
  },
  methods: {
    getData(id, index) {
      let promise = axios.get(
        `https://apis.netstart.cn/douguo/recipe/detail/${id}`
      );
      promise.then((data) => {
        let item = data.data.result.recipe;
        this.arr.push(item);
        if (this.arr.length == this.collection1.length) {
          this.finding = false;
          console.log(this.arr);
        } else {
          this.finding = true;
        }
      });
    },
    getAll() {
      this.finding = true;
      for (var i = 0; i < this.collection1.length; i++) {
        this.getData(this.collection1[i]);
      }
    },
    myrev(res) {
      this.caiming = res.name;
      this.finding = true;
      this.getData(this.caiming);
    },
    myrev2(res) {
      this.finding = true;
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
    this.collection1 = JSON.parse(localStorage.getItem("love1"));
    if (this.collection1.length == 0) {
      console.log("暂时没有收藏");
    } else {
      this.getAll();
    }
  },
};
</script>

<style lang="scss" scoped>
h1 {
  padding-left: 15px;
  font-size: 20px;
}
.aa {
  padding: 0 15px;
}
.findInfo {
  width: 100%;
  .search {
    width: 100%;
    margin-top: 20px;
    // padding-bottom: 60px;
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