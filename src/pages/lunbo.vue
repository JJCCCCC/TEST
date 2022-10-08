<template>
  <div class="banner" ref="a">
    <ul
      class="banner-box"
      @transitionend="guoduhou"
      @mouseover="pause"
      @mouseout="rePlay"
      v-bind:style="`transform: translate(-${distance}px);transition:${xiaoguo};`"
    >
      <li v-for="item in arr" v-bind:key="item.id">
        <a href=""><img v-bind:src="item.src" alt="" /></a>
      </li>
    </ul>
    <ol class="banner-point">
      <li
        v-bind:class="[{ active: i == 0 || i == 3 }]"
        @click="changeImg(0)"
      ></li>
      <li v-bind:class="[{ active: i == 1 }]" @click="changeImg(1)"></li>
      <li v-bind:class="[{ active: i == 2 }]" @click="changeImg(2)"></li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "lunbo",
  data() {
    return {
      arr: [
        {
          src: "http://i1.douguo.net/upload/note/e/e/6/ee459f13f5a6594af218a01da6d9a3d6.jpg",
          id: "xxx1",
        },
        {
          src: "http://i1.douguo.net/upload/note/c/3/d/c3078ee1bfaec70a2259fa0965cdc01d.jpg",
          id: "xxx2",
        },
        {
          src: "http://i1.douguo.net/upload/note/a/e/5/ae9557cc8ca61ee9b9f161d9ba294825.jpg",
          id: "xxx3",
        },
        {
          src: "http://i1.douguo.net/upload/note/e/e/6/ee459f13f5a6594af218a01da6d9a3d6.jpg",
          id: "xxx4",
        },
      ],
      time: null,
      i: 0,
      imgWidth: 0,
      distance: 0,
      xiaoguo: "all 0.5s",
    };
  },
  methods: {
    autoPlay() {
      let self = this;
      self.time = setInterval(function () {
        self.i++;
        self.distance = self.i * self.imgWidth;
        self.xiaoguo = "all 0.5s";
      }, 2000);
    },
    guoduhou() {
      if (this.i >= 3) {
        this.i = 0;
        this.distance = this.i * this.imgWidth;
        this.xiaoguo = "none";
      }
    },
    pause() {
      clearInterval(this.time);
      this.time = null;
    },
    rePlay() {
      if (this.time == null) {
        this.autoPlay();
      }
    },
    changeImg(index) {
      this.i = index;
      this.pause();
      this.distance = index * this.imgWidth;
      this.xiaoguo = "all 0.5s";
    },
    minimize() {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden === true) {
          this.pause();
        } else {
          this.rePlay();
        }
      });
    },
  },
  mounted() {
    this.imgWidth = window
      .getComputedStyle(this.$el, null)
      .getPropertyValue("width")
      .replace("px", "");
    this.autoPlay();
    this.minimize();
  },
};
</script>

<style lang="scss" scoped>
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0;
}

img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.banner {
  width: 100%;
  position: relative;
  overflow: hidden;
  font-size: 0;
  margin-bottom: 20px;
}

.banner-box {
  width: 400%;
  height: 100%;
}

.banner-box li {
  width: 25%;
  height: 100%;
  float: left;
}

.banner-point {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 20px;
}

.banner-point li {
  float: left;
  width: 20px;
  height: 5px;
//   border: 1px solid #ccc;
  background-color: #ccc;
  opacity: 0.5;
  margin: 0 10px;
  cursor: pointer;
}

.banner-point li.active {
  background-color: white;
  opacity: 1;
}
</style>