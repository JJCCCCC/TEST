<template>
  <div class="fenlei">
    <ul>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '面包' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mianbaolingshishipinxiaomianbao"></use>
          </svg>
          <span>面包</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '甜点' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tiandian"></use>
          </svg>
          <span>甜点</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '中式面点' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baozi"></use>
          </svg>
          <span>中式面点</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '特色小吃' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaochi"></use>
          </svg>
          <span>特色小吃</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '家常菜' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chaocai-"></use>
          </svg>
          <span>家常菜</span>
        </router-link>
      </li>
    </ul>
    <ul>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '蛋糕' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dangao"></use>
          </svg>
          <span>蛋糕</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '饮品' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinpin"></use>
          </svg>
          <span>饮品</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '热销月饼' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yuebing"></use>
          </svg>
          <span>热销月饼</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: '宝宝辅食' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-naozhong"></use>
          </svg>
          <span>宝宝辅食</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ path: '/findInfo', query: { name: 'VIP免费' } }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huangguan"></use>
          </svg>
          <span>VIP免费</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
a {
  -webkit-tap-highlight-color: transparent;
}
.fenlei {
  width: 100%;
  overflow: hidden;
  margin-top: 30px;
  ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    height: 60px;
    margin-bottom: 20px;
    li {
      flex-basis: 15%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: black;
        -webkit-tap-highlight-color: transparent;
        svg {
          display: block;
          width: 100%;
          height: 70%;
        }
        span {
          display: block;
          width: 100%;
          height: 30%;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
}
</style>