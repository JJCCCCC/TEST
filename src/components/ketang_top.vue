<template>
  <div class="ketang_top">
    <div class="search">
      <input type="text" placeholder="搜索感兴趣的课程" />
      <span>已购买</span>
      <div class="icon"></div>
    </div>
    <div class="banner">
      <lunbo></lunbo>
    </div>
  </div>
</template>

<script>
import lunbo from "../pages/lunbo.vue";
export default {
  name: "ketang_top",
  components: {
    lunbo,
  },
  data() {
    return {
      imgBox: [],
    };
  },
};
</script>


<style lang="scss" scoped>
.ketang_top {
  width: 100%;
  padding-top: 30px;
  height: 150px;
  background-color: #f7f7f7;
  .search {
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    width: 100%;
    input {
      display: block;
      width: 70%;
      height: 30px;
      outline: none;
      border: none;
      background-color: #eeeeee;
      padding: 5px 0;
      padding-left: 40px;
      float: left;
      border-radius: 5px;
    }
    span {
      font-size: 16px;
      float: right;
      display: block;
      height: 35px;
      line-height: 35px;
      color: skyblue;
    }
  }
  .banner {
    margin-top: 20px;
    width: 100%;
    height: 130px;
    overflow: hidden;
  }
}
</style>