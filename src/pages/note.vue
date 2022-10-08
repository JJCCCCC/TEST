<template>
  <div class="note_content" ref="a">
    <transition
      enter-active-class="animate__animated  animate__bounceIn"
      enter-to-class="animate__animated  animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
      leave-to-class="animate__animated  animate__bounceOut"
    >
      <lAlert v-bind:message="fmessage" v-if="loading"></lAlert>
    </transition>
    <transition
      enter-active-class="animate__animated  animate__bounceInDown"
      enter-to-class="animate__animated  animate__bounceInDown"
      leave-active-class="animate__animated animate__bounceOutDown"
      leave-to-class="animate__animated  animate__bounceOutDown"
    >
      <returnTop></returnTop>
    </transition>
    <ul class="note">
      <li class="item">
        <div class="imgBox">
          <img
            src="http://i1.douguo.net/upload/note/4/4/8/4429aafb8dc53f5a715792b3ad274558.jpg"
            alt=""
          />
        </div>
        <div class="userInfo">
          <p>我的双蛋美食vlog年终短视频视频创作大赛</p>
          <div class="user">
            <span class="userIcon"> </span>
          </div>
          <div class="collect as">参与</div>
        </div>
      </li>
      <compLoading v-if="arr1.length == 0"></compLoading>
      <li class="item" v-for="(item, index) in arr1" v-bind:key="index + 'one'">
        <router-link
          :to="{ path: '/noteInformation', query: { id: arr1[index].note.id } }"
        >
          <div class="imgBox">
            <!-- <span>{{item.note.image_h}}</span> -->
            <img v-lazy="item.note.image_u" alt="" />
          </div>
          <div class="userInfo">
            <p>{{ item.note.title }}</p>
            <div class="user">
              <span class="userIcon">
                <img v-lazy="item.note.author.p" alt="" />
              </span>
              <span class="username">{{ item.note.author.n }}</span>
            </div>
            <div class="collect">{{ item.note.like_count }}</div>
          </div>
        </router-link>
      </li>
    </ul>
    <ul class="note">
      <li class="item">
        <div class="imgBox">
          <img
            src="http://i1.douguo.net/upload/note/7/b/f/7b01da6dc7d494b6dfc8ec8ea519447f.jpg"
            alt=""
          />
        </div>
        <div class="userInfo">
          <p>菜谱有奖征集|一学就会快手菜</p>
          <div class="user">
            <span class="userIcon"></span>
            <span class="username"></span>
          </div>
          <div class="collect as">参与</div>
        </div>
      </li>
      <compLoading v-if="arr1.length == 0"></compLoading>
      <li class="item" v-for="(item, index) in arr2" v-bind:key="index + 'two'">
        <router-link
          :to="{ path: '/noteInformation', query: { id: arr2[index].note.id } }"
        >
          <div class="imgBox">
            <!-- <span>{{item.note.image_h}}</span> -->
            <img v-lazy="item.note.image_u" alt="" />
          </div>
          <div class="userInfo">
            <p>{{ item.note.title }}</p>
            <div class="user">
              <span class="userIcon">
                <img v-lazy="item.note.author.p" alt="" />
              </span>
              <span class="username">{{ item.note.author.n }}</span>
            </div>
            <div class="collect">{{ item.note.like_count }}</div>
          </div>
        </router-link>
      </li>
    </ul>

    <div class="aaa" v-for="(item, index) in noteList" v-bind:key="index + 'one'" ref="b" v-show="false">
      <div class="imgBox">
        <img v-lazy="item.note.image_u" alt="" />
      </div>
      <div class="userInfo">
        <p>{{ item.note.title }}</p>
        <div class="user">
          <span class="userIcon">
            <img v-lazy="item.note.author.p" alt="" />
          </span>
          <span class="username">{{ item.note.author.n }}</span>
        </div>
        <div class="collect">{{ item.note.like_count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import lAlert from "../components/myAlert.vue";
import compLoading from "../components/comp-loading.vue";
import returnTop from "../components/returnTop.vue";
export default {
  name: "note_list",
  components: {
    lAlert,
    compLoading,
    returnTop,
  },
  data() {
    return {
      noteList: [],
      line1: 0,
      line2: 0,
      arr1: [],
      arr2: [],
      test: 0,
      TrueHeight: 0,
      chuangkou: 0,
      gundong: 0,
      limit: 100,
      delay: 500,
      arrHeight: [],
      gap: "",
      first: true,
      fmessage: "好饭不怕晚~~~",
      loading: false,
      page:0,
    };
  },
  methods: {
    getFoodList(a) {
      if (a == undefined) {
        a = 20;
      }
      // let num = this.page;
      let promise = axios.get(
        `https://apis.netstart.cn/douguo/home/notes/0/${a}`
      );
      promise.then((data) => {
        if (data.status == 200) {
          // console.log(data);
          let temp = data.data.result.list.slice(-20);
          temp.forEach((item, index) => {
            if (item.type == 1) {
              this.noteList.push(item);
              this.loading = false;
            }
          });
          this.countedHeight();
          // for(let i = 0 ; i < this.noteList.length ; i++){
          //   let img = new Image();
          //   img.src = this.noteList[i].note.image_u;
          //   img.onload = () =>{
          //     i++;
          //     if(i == this.noteList.length - 1){
          //       this.waterfall()
          //     }
          //   }
          // }
          // setTimeout(() => {
          //   this.waterfall()
          // }, 5000);
        }
      });
    },
    countedHeight() {
      this.noteList.forEach((item, index) => {
        if (item.note.image_h > 2000) {
          this.noteList.splice(index, 1);
        }
      });
      this.line1 = this.noteList[0].note.image_h;
      this.line2 = this.noteList[1].note.image_h;
      this.arr1.push(this.noteList[0]);
      this.arr2.push(this.noteList[1]);
      this.noteList.splice(0, 2);
      this.noteList.forEach((item) => {
        if (this.line1 > this.line2) {
          this.arr2.push(item);
          this.line2 += item.note.image_h;
        } else {
          this.arr1.push(item);
          this.line1 += item.note.image_h;
        }
      });
      console.log
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
      this.limit += 20;
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
    waterfall() {
      this.$nextTick(() => {
        if (this.$refs.a) {
          let arrHeight = []
          this.$refs.b.forEach((item, index) => {
            if (index < 2) {
              item.style.top = 0 + "px";
              item.style.left = (item.offsetWidth + 10) * index + "px";

              // 添加高度到数组中
              arrHeight.push(item.offsetHeight);
            } else {
              // 找到arrHeight里面最小值以及最小值对应的下标

              // 最小值
              let minVal = Math.min.apply(null, arrHeight);

              // 最小值所在下标
              let minIndex = arrHeight.indexOf(minVal);
              item.style.top = minVal  + "px";
              item.style.left = (item.offsetWidth + 10) * minIndex + "px";

              // 当前.item的高度
              let currentItemHeight = item.offsetHeight;

              // 更新列高度
              arrHeight[minIndex] = minVal + 10 + currentItemHeight;
            }
          });

          // 求出arrHeight数组最大值
          let maxVal = Math.max.apply(null, arrHeight);
          // 设置.box的高度
          this.$refs.a.style.height = maxVal + "px";
        }
      });
    },
  },
  created() {
    this.getFoodList();
  },
  mounted() {
    window.addEventListener("scroll", this.debounce(this.getTop, this.delay));
  },
  watch: {},
};
</script>



<style lang="scss" scoped>
a {
  color: black;
  text-decoration: none;
}
.as {
  color: #f6b157;
}

.note_content {
  display: flex;
  justify-content: space-around;
  position: relative;
  padding-bottom: 60px;
  width: 100%;

   .aaa{
      width: 45%;
      border-radius: 10px;
      overflow: hidden;
      position: absolute;
      .imgBox {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .userInfo {
        width: 100%;
        overflow: hidden;
        p {
          margin: 0;
          font-size: 16px;
          height: 45px;
          margin-bottom: 10px;
          // margin-top: 10px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .user {
          width: 80%;
          height: 30px;
          font-size: 16px;
          line-break: 30px;
          float: left;
          display: flex;
          vertical-align: middle;
          .userIcon {
            display: inline-block;
            width: 25px;
            height: 25px;
            vertical-align: middle;
            img {
              width: 100%;
              // height: 100%;
              border-radius: 50%;
            }
          }
          .username {
            display: inline-block;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // margin-left: 20px;
            // margin-top: 5px;
          }
        }
        .collect {
          float: right;
          font-size: 16px;
          vertical-align: middle;
          height: 26px;
          line-height: 30px;
        }
      }
    }

  .note {
    width: 50%;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      width: 90%;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 auto;
      margin-bottom: 20px;
      .imgBox {
        width: 100%;
        position: relative;
        span {
          position: absolute;
        }
        img {
          width: 100%;
        }
      }
      .userInfo {
        width: 100%;
        overflow: hidden;
        p {
          margin: 0;
          font-size: 16px;
          height: 45px;
          margin-bottom: 10px;
          // margin-top: 10px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .user {
          width: 80%;
          height: 30px;
          font-size: 16px;
          line-break: 30px;
          float: left;
          display: flex;
          vertical-align: middle;
          .userIcon {
            display: inline-block;
            width: 25px;
            height: 25px;
            vertical-align: middle;
            img {
              width: 100%;
              // height: 100%;
              border-radius: 50%;
            }
          }
          .username {
            display: inline-block;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // margin-left: 20px;
            // margin-top: 5px;
          }
        }
        .collect {
          float: right;
          font-size: 16px;
          vertical-align: middle;
          height: 26px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>