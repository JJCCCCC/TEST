<template>
  <div class="gonggao">
    <div class="icon1">公告</div>
    <div class="neirong">
      <ul ref="ul" @transitionend="guduhou" v-if="list.length != 0">
        <li v-for="(item, index) in list" v-bind:key="index">
          <span class="nickname">{{ item.nickname }}</span>
          <span class="a">参加了活动</span>
          <span class="name">{{ item.name }}</span>
        </li>
        <li>
          <span class="nickname">{{ list[0].nickname }}</span>
          <span class="a">参加了活动</span>
          <span class="name">{{ list[0].name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "gonggaolan",
  data() {
    return {
      list: [],
      num: 0,
      time: null,
      i: 0,
      height: 0,
      time2: null,
    };
  },
  props: {
    gcurrent: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getData() {
      let promise = axios.get(
        "https://apis.netstart.cn/douguo/home/events/getlists?offset=0limit=20"
      );
      promise.then((data) => {
        if (data.status == 200) {
          this.list = data.data.data.banner;
          this.num = this.list.length;
        }
      });
    },
    autoPlay() {
      this.height = (40 * window.innerWidth) / 375;
      this.time = setInterval(() => {
        if (this.num == 0) {
          return;
        }
        this.i++;
        this.$refs.ul.style.transform = `translateY(-${
          this.i * this.height
        }px)`;
      }, 2000);
    },
    guduhou() {
      if (this.i == this.num) {
        this.i = 0;
        this.$refs.ul.style.transform = `translateY(-${
          this.i * this.height
        }px)`;
        this.$refs.ul.style.transition = `none`;
        this.time2 = setTimeout(() => {
          this.$refs.ul.style.transition = `all 1s`;
        }, 0);
      }
    },
    onOrOff() {
      // console.log(this.gcurrent);
      if (this.gcurrent == true) {
        if (this.time != null) {
          // console.log(111);
          return;
        } else {
          this.autoPlay();
        }
      } else {
        clearInterval(this.time);
        this.time = null;
      }
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.autoPlay();
  },
  beforeDestroy(){
    clearInterval(this.time)
  }
};
</script>

<style lang="scss" scoped>
.gonggao {
  margin-top: 20px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  height: 40px;
  .icon1 {
    width: 40px;
    height: 30px;
    float: left;
    background-color: #fec43b;
    font-size: 14px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-top: 5px;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
  }
  .neirong {
    width: 310px;
    height: 100%;
    float: right;
    // border: 1px solid black;
    position: relative;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 12px;
      width: 100%;
      transition: all 1s;
      li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        span {
          line-height: 40px;
        }
        .nickname {
          // float: left;
          width: 100px;
          // height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .a{
          font-size: 12px;
        }
        .name {
          // float: right;
          width: 120px;
          // height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>