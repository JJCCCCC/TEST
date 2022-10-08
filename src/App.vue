<template>
  <div id="app">
    <bottom-nav></bottom-nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <returnTop></returnTop> -->
  </div>
</template>

<script>
import obj from "../src/assets/js/gonggong";
import bottomNav from "./components/bottom_nav.vue";
// import returnTop from "./components/returnTop.vue";
global.historyFood = obj.historyFood;
global.quchong = obj.quchong;
export default {
  name: "app",
  data(){
    return{
      isShow:false
    }
  },
  components: {
    bottomNav,
  },
};
</script>


<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  position: relative;
}
</style>
