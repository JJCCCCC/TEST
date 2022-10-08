<template>
  <div class="returnTop" @click="returnTop" v-if="isShow">
    <span class="iconfont">&#xe85e;</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TrueHeight: 0,
      chuangkou: 0,
      gundong: 0,
      isShow: false,
    };
  },
  methods: {
    returnTop() {
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 500) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.returnTop {
  width: 50px;
  height: 50px;
  position: fixed;
  z-index: 9999999;
  // background-color: black;
  right: 20px;
  bottom: 70px;
  span {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 48px;
    text-align: center;
    line-height: 50px;
    color: #f6b157;
  }
}
</style>