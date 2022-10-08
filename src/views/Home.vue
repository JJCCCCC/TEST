<template>
  <div class="home">
    
    <home-top v-on:xunzhaozhong="myrev"></home-top>
    <!-- <keep-alive> -->
    <today-recommend v-if="!finding"></today-recommend>
    <!-- </keep-alive> -->
    <!-- <returnTop></returnTop> -->
  </div>
</template>

<script>
import homeTop from "../components/home_top.vue";
import todayRecommend from "../components/today_recommend.vue";
// import returnTop from "../components/returnTop.vue";

export default {
  name: "Home",
  components: {
    homeTop,
    todayRecommend,
    // returnTop,
  },
  data() {
    return {
      finding: false,
      caiming: "",
    };
  },
  created(){
    let love1 = [];
    let love2 = [];
    if(!localStorage.love1) {
      localStorage.setItem('love1',JSON.stringify(love1));
      localStorage.setItem('love2',JSON.stringify(love2));
    }
  },
  methods: {
    myrev(res) {
      // console.log(res);
      this.finding = res.finding;
    },
  },
  beforeRouteLeave(to,from,next) {
    this.finding = false;
    next();
  },
};
</script>

<style lang="scss" scoped>
.home{
  // overflow: hidden;
}
</style>
