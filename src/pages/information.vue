<template>
  <div class="informationBox">
    <loading v-if="over"></loading>
    <div class="information" v-if="recipe.length != 0">
      <transition
        enter-active-class="animate__animated  animate__bounceInDown"
        enter-to-class="animate__animated  animate__bounceInDown"
        leave-active-class="animate__animated animate__bounceOutDown"
        leave-to-class="animate__animated  animate__bounceOutDown"
      >
        <returnTop></returnTop>
      </transition>
      <span class="iconfont fanhui" @click="fanhuishangyiceng">&#xe616;</span>
      <div class="imgBox">
        <img
          :src="recipe[0].photo_path"
          alt=""
          v-if="recipe[0].src == undefined"
        />
        <video-process
          v-if="recipe[0].src != undefined"
          v-bind:src="recipe[0].src"
        ></video-process>
      </div>
      <div class="box">
        <div class="foodTitle">
          <p class="foodName">{{ recipe[0].title }}</p>
          <div class="tag">
            <span>精品</span><span class="pot">·</span><span>独家</span
            ><span class="pot">·</span
            ><span>浏览{{ recipe[0].views_count_text }}</span
            ><span class="pot">·</span
            ><span>收藏{{ recipe[0].favo_counts }}</span>
          </div>
        </div>

        <div class="guanzhuBox">
          <div class="userInfo">
            <div class="useIcon">
              <img :src="recipe[0].user.user_photo" alt="" />
            </div>
            <div class="userName">{{ recipe[0].user.nickname }}</div>
            <i class="userLevel">LV.{{ recipe[0].user.lvl }}</i>
          </div>
          <div class="guanzhu" @click="love">{{guanzhu}}</div>
        </div>

        <div class="activity" v-if="recipe[0].cookstorys.length != 0">
          参与活动:<span>#有奖征集|一学就会快手菜#</span>
        </div>

        <div class="listFood">
          <div class="title">
            <span class="one">食材清单</span>
            <span class="two">加入采购清单</span>
          </div>
          <ul class="list">
            <li v-for="(item, index) in recipe[0].major" v-bind:key="index">
              <span>{{ item.title }}</span>
              <span>{{ item.note }}</span>
            </li>
          </ul>
        </div>

        <div class="yingyangfenxi">
          <div class="title">
            <span class="one">营养分析</span>
            <span class="two">查看详情</span>
          </div>
          <div
            class="fenxiContent"
            v-if="recipe[0].nutrition_facts.length != 0"
            ref="box11"
          >
            <!-- <div class="circle"></div> -->
            <canvas class="circle" ref="canvas"></canvas>
            <div class="yingyang">
              <div
                class="fat"
                v-for="(item, index) in recipe[0].nutrition_facts"
                v-bind:key="index + '1'"
              >
                <span
                  class="yuan"
                  :style="`background:${item.pie_chart_color}`"
                ></span
                ><span class="wuzhi">{{ item.nutrient }}</span>
                <span class="weight" ref="weight">{{ item.amount }}</span>
              </div>
            </div>
            <div class="totalKa">
              <div class="totalKaBox">
                <div class="num">{{ recipe[0].energy }}</div>
                <div class="danwei">千卡</div>
              </div>
            </div>
          </div>
          <div class="yingyangshuoming">
            <span>💡</span>
            {{ recipe[0].nutrition_facts_hint_text }}
          </div>
        </div>

        <!-- 烹饪部分 -->
        <div class="cooking">
          <div class="title">
            <span class="one">烹饪分析</span>
            <span class="two">点击图片进入烹饪模式</span>
          </div>
          <div
            class="step"
            v-for="(item, index) in recipe[0].cookstep"
            v-bind:key="index"
          >
            <p>步骤{{ index + 1 }}/{{ recipe[0].cookstep.length }}</p>
            <div class="stepImg">
              <img :src="item.image" alt="" />
            </div>
            <div class="shuoming">{{ item.content }}</div>
          </div>
        </div>

        <!-- 评论 -->
        <div class="comments">
          <div class="title">
            <span class="one">热门评论</span>
            <span class="two">{{ comments.length }}条评论</span>
          </div>
          <div class="public">
            <input type="text" placeholder="说点什么吧，让TA也认识爱做饭的你" />
          </div>
          <div class="notComments" v-if="comments.length == 0">
            还没有人评论，赶快来参与讨论吧！！
          </div>
          <div class="box" v-for="item in comments" v-bind:key="item.id">
            <div class="reader">
              <div class="readerInfo">
                <div class="readerIcon">
                  <img :src="item.u.p" alt="" />
                </div>
                <div class="readerName">
                  <div class="name">{{ item.u.n }}</div>
                  <div class="city">{{ item.city }}</div>
                </div>
                <i class="lvl">Lv{{ item.u.lvl }}</i>
              </div>
              <div class="collectCount">
                <i class="bi bi-heart"></i
                >{{ item.like_count == 0 ? "赞" : item.like_count }}
              </div>
            </div>
            <div class="content">
              <div class="big">
                {{ item.content[0].c }}
              </div>
              <div class="small">
                <div
                  class="smaller"
                  v-for="items in item.child_comments"
                  v-bind:key="items.id"
                >
                  <div class="smallerName">{{ items.reply_user.n }}：</div>
                  <div class="smallContent">{{ items.content[0].c }}</div>
                </div>
                <div class="num">
                  共 {{ item.child_comments.length }} 条回复
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import returnTop from "../components/returnTop.vue";
import videoProcess from "../components/videoProcess.vue";
import loading from "../components/comp-loading.vue";
export default {
  name: "information",
  components: {
    videoProcess,
    loading,
    returnTop,
  },
  data() {
    return {
      recipe: [],
      comments: [],
      xianshi: false,
      over: true,
      id: "",
      guanzhu:"关注"
    };
  },
  methods: {
    getData(id, src) {
      let promise = axios.get(
        `https://apis.netstart.cn/douguo/recipe/detail/${id}`
      );
      promise.then((data) => {
        if (data.status == 200) {
          data.data.result.recipe.src = src;
          this.recipe.push(data.data.result.recipe);
          this.over = false;
        }
      });
      let promise2 = axios.get(
        `https://apis.netstart.cn/douguo/recipe/flatcomments/${id}/0/20`
      );
      promise2.then((data) => {
        if (data.status == 200) {
          // console.log(data);
          this.comments = data.data.result.comments;
          // console.log(this.comments);
        }
      });
    },
    love() {
      if(!localStorage.getItem('login')){
        this.$router.push('/login')
      }else{
        let arr =JSON.parse(localStorage.getItem('love1'));
        var index = arr.indexOf(this.id);
        if(index > -1){
          arr.splice(index,1)
          this.guanzhu = "关注"
        }else{
          arr.push(this.id)
          this.guanzhu = "已关注"
        }
        localStorage.setItem('love1',JSON.stringify(arr))
      }
    },
    loveOr(){
       let arr =JSON.parse(localStorage.getItem('love'));
        var index = arr.indexOf(this.id);
        if(index > -1){
          arr.splice(index,1)
          this.guanzhu = "已关注"
        }else{
          this.guanzhu = "关注"
        }
    },
    huayuan() {
      this.$nextTick(() => {
        setTimeout(() => {
          let arr = [];
          let sum = 0;
          this.recipe[0].nutrition_facts.forEach((item, index) => {
            let a = item.amount.substring(0, item.amount.length - 2) - 0;
            arr.push(a);
          });
          if (this.$refs["box11"]) {
            // 获取canvas元素
            let canvas = this.$refs["canvas"];
            let ctx = canvas.getContext("2d");
            canvas.width = 70;
            canvas.height = 70;
            // 封装绘制圆形的方法
            // 定义圆心
            for (let i = 0; i < arr.length; i++) {
              sum += arr[i];
            }
            let x = ctx.canvas.width / 2;
            let y = ctx.canvas.height / 2;
            let startAngle = 0;
            let endAngle = 0;
            let radius = canvas.width / 2;
            let angelArr = [];
            for (let z = 0; z < arr.length; z++) {
              angelArr.push((arr[z] / sum) * 360 * (Math.PI / 180));
            }
            let colorArr = [
              "rgb(255, 112, 41)",
              "rgb(39, 180, 81)",
              "rgb(255, 178, 25)",
            ];
            for (let o = 0; o < arr.length; o++) {
              // 计算结束弧度
              endAngle = startAngle + angelArr[o];
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.arc(x, y, radius, startAngle, endAngle);
              ctx.fillStyle = colorArr[o];
              ctx.fill();
              startAngle = endAngle;
            }
          }
        }, 2000);
      });
    },
    fanhuishangyiceng() {
      this.$router.go(-1);
    },
  },
  created() {
    this.id = this.$route.query.id;
    let src = this.$route.query.src;
    this.getData(this.id, src);
    this.over = true;
  },
  mounted() {
    this.huayuan();
    this.loveOr();
  },
};
</script>


<style lang="scss" scoped>
.yuan {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
}
.title {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .one {
    font-size: 16px;
    font-weight: bold;
  }
  .two {
    font-size: 12px;
    color: #f6b157;
  }
}

.information {
  width: 100%;
  padding-bottom: 120px;
  overflow-x: hidden;
  position: relative;
  .fanhui {
    z-index: 99999;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    top: 5px;
    left: 10px;
    text-decoration: none;
    color: #f6b157;
    // line-height: 40px;
    border-radius: 50%;
    // background-color: rgba();
    // background-color: rgba(250, 194, 73,0.6);
    // transition: all .5s;
    // opacity: 0;
    text-align: center;
    font-size: 32px;

    // span{
    //   display: inline-block;
    //   width: 100%;
    //   height: 100%;
    //   text-align: center;
    //   line-height: 40px;
    // }
  }
  .imgBox {
    width: 100%;
    img {
      width: 100%;
    }
    video {
      width: 100%;
      height: 300px;
      object-fit: fill;
    }
  }
  .box {
    margin-top: 10px;
    > div {
      margin-bottom: 20px;
    }
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    .foodTitle {
      width: 100%;
      font-size: 12px;
      .foodName {
        margin: 0;
        font-size: 22px;
        margin-bottom: 5px;
      }
      .tag {
        color: #ccc;
        span {
          display: inline-block;
          margin-right: 5px;
        }
        .pot {
          font-weight: bold;
        }
      }
    }
    .guanzhuBox {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .userInfo {
        height: 100%;
        div {
          margin-right: 10px;
        }
        .useIcon {
          width: 40px;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .userName {
          font-size: 14px;
          font-weight: bold;
          float: left;
          height: 40px;
          line-height: 40px;
        }
        .userLevel {
          font-size: 12px;
          float: left;
          height: 40px;
          line-height: 40px;
          color: #f6b157;
        }
      }
      .guanzhu {
        width: 70px;
        font-size: 14px;
        height: 30px;
        background-color: #fac249;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
      }
    }
    .activity {
      font-size: 16px;
      span {
        color: #f6b157;
      }
    }
    .listFood {
      width: 100%;
      .list {
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          width: 100%;
          height: 32px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .yingyangfenxi {
      width: 100%;
      .fenxiContent {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .circle {
          height: 100%;
          width: 70px;
          // border-radius: 50%;
          // background-color: red;
          // border: 1px solid red;
        }
        .yingyang {
          font-size: 14px;
          .fat {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 2px;
            span {
              margin-right: 10px;
            }
          }
        }
        .totalKa {
          height: 100%;
          font-size: 14px;
          width: 100px;
          .totalKaBox {
            width: 100%;
            height: 50%;
            border-left: 1px solid #ccc;
            box-sizing: border-box;
            text-align: center;
            .num {
              margin-top: 20px;
              font-weight: bold;
              font-size: 16px;
            }
            .danwei {
              color: #ccc;
            }
          }
        }
      }
      .yingyangshuoming {
        margin-top: 10px;
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          color: #f6b157;
        }
      }
    }
    .cooking {
      width: 100%;
      .step {
        width: 100%;
        p {
          margin: 10px 0;
          font-size: 14px;
          // padding-left: 10px;
        }
        .stepImg {
          width: 100%;
          img {
            display: block;
            width: 100%;
            border-radius: 10px;
          }
        }
        .shuoming {
          font-size: 18px;
          // margin: 10px 0;
          margin-top: 10px;
        }
      }
    }
    .comments {
      .box {
        margin-bottom: 30px;
      }
      width: 100%;
      .public {
        width: 100%;
        margin-bottom: 20px;
        margin-top: 10px;
        input {
          padding-left: 20px;
          display: block;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          background-color: #ccc;
          border-radius: 15px;
          outline: none;
          border: none;
          height: 30px;
        }
      }
      .notComments {
        width: 100%;
        height: 40px;
        font-size: 20px;
      }
      .reader {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .readerInfo {
          display: flex;
          height: 40px;
          font-size: 16px;
          .readerIcon {
            width: 40px;
            height: 100%;
            margin-right: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .readerName {
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .name {
              font-size: 14px;
              font-weight: bold;
            }
            .city {
              font-size: 13px;
              color: #ccc;
              margin-top: 5px;
            }
          }
          .lvl {
            margin-left: 5px;
            font-size: 12px;
            vertical-align: baseline;
            color: #f6b157;
          }
        }
        .collectCount {
          font-size: 14px;
        }
      }
      .content {
        width: 100%;
        box-sizing: border-box;
        padding-left: 50px;
        .big {
          font-size: 16px;
          line-height: 25px;
        }
        .small {
          background-color: #fafaea;
          padding-top: 5px;
          width: 100%;
          .smaller {
            display: flex;
            margin-bottom: 10px;
            .smallerName {
              font-size: 13px;
              font-weight: bold;
            }
            .smallContent {
              font-size: 13px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: 1;
            }
          }
          .num {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>