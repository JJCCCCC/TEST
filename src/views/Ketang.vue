<template>
  <div class="ketang">
    <ketangTop></ketangTop>
    <classfition></classfition>
    <remaihaoke :ctitle="obj1.title"></remaihaoke>
    <remaihaoke :ctitle="obj2.title"></remaihaoke>
    <remaihaoke :ctitle="obj3.title"></remaihaoke>
  </div>
</template>


<script>
import ketangTop from "../components/ketang_top.vue";
import classfition from "../components/classfition.vue";
import remaihaoke from "../components/remaihaoke.vue";

export default {
  name: "ketang",
  components: {
    ketangTop,
    classfition,
    remaihaoke,
  },
  data() {
    return {
      obj1: { title: "热卖好课" ,},
      obj2: { title: "精品新课" ,},
      obj3: { title: "最新上架" ,},
      obj4: { title: "电子书" ,},
    };
  },
};
</script>

<style lang="scss" scoped>
.ketang {
  padding-bottom: 60px;
}
</style>