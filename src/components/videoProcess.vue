<template>
  <div class="process">
    <video
      :src="src"
      muted
      autoplay
      ref="el"
      @canplay="getTime"
      @timeupdate="getcurrentTime"
      @touchstart="videoStatus"
    ></video>
    <transition
      enter-active-class="animate__animated  animate__backInUp"
      enter-to-class="animate__animated  animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
      leave-to-class="animate__animated  animate__backOutDown"
    >
      <div class="control" v-show="!switch1">
        <div class="currentTime" ref="bianju">{{ currenTime }}</div>
        <div class="processLine" @touchstart="changeTime">
          <div class="pot" ref="dian"></div>
          <div class="out" ref="line1"></div>
          <div class="in" ref="line2"></div>
        </div>
        <div class="totalTime">{{ totalTime }}</div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "videoProcess",
  data() {
    return {
      totalTime: 0,
      currenTime: 0,
      bili: 0,
      switch1: true,
      x: 0,
      move: false,
    };
  },
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  methods: {
    getTime() {
      // 获取总时长
      this.totalTime = this.timeFormat(this.$refs.el.duration);
    },
    getcurrentTime() {
      this.currenTime = this.timeFormat(this.$refs.el.currentTime);
      this.bili = this.$refs.el.currentTime / this.$refs.el.duration;
      this.$refs.line2.style.width =
        this.$refs.line1.offsetWidth * this.bili + "px";
      this.$refs.dian.style.left =
        this.$refs.line1.offsetWidth * this.bili -
        this.$refs.dian.offsetWidth / 2 +
        "px";
    },
    timeFormat(seconds) {
      let m = this.zeroFill(Math.floor((seconds / 60) % 60));
      let s = this.zeroFill(Math.floor(seconds % 60));
      return `${m}:${s}`;
    },
    zeroFill(num) {
      return num < 10 ? "0" + num : num;
    },
    videoStatus() {
      this.switch1 = !this.switch1;
      if (this.switch1 == true) {
        this.$refs.el.play();
      } else {
        this.$refs.el.pause();
      }
    },
    changeTime(e) {
      this.x =
        e.targetTouches[0].pageX -
        this.$refs.line1.offsetLeft -
        this.$refs.bianju.offsetWidth;
      this.$refs.dian.style.left = this.x + "px";
      this.$refs.el.currentTime =
        (this.x / this.$refs.line1.offsetWidth) * this.$refs.el.duration;
      this.$refs.line2.style.width = this.x + "px";
    },
  },
  created() {},
  mounted() {},
  beforeDestroy(){
      this.$refs.el.pause();
  }
};
</script>

<style lang="scss" scoped>
.process {
  width: 100%;
  height: 320px;
  position: relative;
  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .control {
    position: absolute;
    width: 100%;
    font-size: 16px;
    display: flex;
    height: 30px;
    background-color: rgba(255,255,255,0.5);
    // opacity: 0.6;
    bottom: 0px;
    border-radius: 10px;
  }
  .currentTime,
  .totalTime {
    width: 60px;
    height: 100%;
    line-height: 30px;
    text-align: center;
  }
  .processLine {
    flex: 1;
    height: 100%;
    position: relative;
    .out {
      width: 100%;
      height: 10px;
      border-radius: 5px;
      background-color: white;
      margin-top: 10px;
    }
    .pot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #f6b157;
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
    }
    .in {
      width: 0;
      height: 10px;
      border-radius: 5px;
      background-color: #f6b157;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

