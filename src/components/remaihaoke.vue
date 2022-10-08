<template>
  <div class="remaihaoke">
    <div class="title">
      <h6>{{ctitle}}</h6>
      <span>更多</span>
    </div>
    <div class="box">
      <ul class="kecheng">
        <li v-for="(item,index) in course" v-bind:key="index">
          <div class="imgBox">
            <img
              :src="item.img"
              alt=""
            />
          </div>
          <div class="explnation">
            <p>
              {{item.title}}
            </p>
            <span class="study">{{item.study}}加入学习</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "remaihaoke",
  data() {
    return {
      course: [
        {
          img: "https://i1.douguo.com//static/img/huodong/2016/cartoon/cart2_1.jpg?v=171011",
          title:
            "一个人吃夜宵。随意看看手机。想想那些一起吃过夜宵、一起睡过觉的人。这种感觉。大概就是人生无常吧。",
          study: "1280",
        },
        {
          img: "https://i1.douguo.com//static/img/huodong/2016/cartoon/cart2_2.jpg?v=171011",
          title: "如果每天都有这么丰盛的早餐你还赖床不！！！",
          study: "3250",
        },
        {
          img: "https://i1.douguo.com//static/img/huodong/2016/cartoon/cart2_5.jpg?v=171011",
          title: "能跟你坐在一起吃火锅的人，说明是你们是同一个世界的人。",
          study: "1235",
        },
        {
          img: "https://i1.douguo.com//static/img/huodong/2016/cartoon/cart2_3.jpg?v=171011",
          title: "牛肉面就是清清的汤里一大份细细滑滑黄亮的面条,上面漂着几片白如碧玉的萝卜片和切得薄薄的棕色牛肉片,绿油油的香菜和青蒜苗浮在上面,色泽诱人,闻起来也香浓四溢.",
          study: "2556",
        },
        {
          img: "https://i1.douguo.com//static/img/huodong/2016/cartoon/cart2_4.jpg?v=171011",
          title: "想回家团圆就吃贝斯特汤圆!口感丝滑油香四溢，鲜美可口，吃了还想吃。",
          study: "545",
        },
        {
          img: "https://i1.douguo.com//static/img/huodong/2016/cartoon/cart2_6.jpg?v=171011",
          title: "给你一段健康悠闲的午间好时光“食”至芊芊午时，添活力、更健康。",
          study: "2572",
        },
      ],
    };
  },
  props:{
    ctitle:{
      type:String,
      default:''
    }
  },
  methods: {
    getKecheng() {
      let promise = axios.get();
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.remaihaoke {
  width: 100%;
  margin-bottom: 20px;
  .title {
    width: 100%;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    height: 30px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    h6 {
      margin: 0;
      float: left;
      font-size: 20px;
      line-height: 30px;
    }
    span {
      display: block;
      float: right;
      font-size: 14px;
      line-height: 30px;
      color: skyblue;
    }
  }
  .box {
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    overflow-x: auto;
    &::-webkit-scrollbar{
      display: none;
    }
    .kecheng {
      width: 330%;
      height: 300px;
      margin: 0;
      padding: 0;
      list-style: none;
      //   background-color: red;s
      li {
        width: 16%;
        height: 100%;
        border-radius: 10px;
        margin-right: 5px;
        border: 1px solid #f6b157;
        // border-bottom: none;
        background-image: url(http://img.sucai8.cn/forum/202111/25/171330jl9599p75argw5ea.jpg);
        background-size: cover;
        overflow: hidden;
        float: left;
        .imgBox {
          width: 100%;
          height: 80%;
          // border-radius: 15px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .explnation {
          // background-color: #ffffff;
          width: 100%;
          font-size: 16px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          // overflow: hidden;
          p {
            margin: 0;
            font-size: 14px;
            width: 100%;
            height: 38px;
            margin-bottom: 5px;
            margin-top: 2px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          span {
            height: 12px;
            font-size: 12px;
            color: tomato;
            float: right;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>