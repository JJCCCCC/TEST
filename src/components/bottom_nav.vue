<template>
  <div class="bottom_nav">
    <ul class="nav">
      <li>
        <keep-alive>
          <router-link to="/home" exact-active-class="active">
            <div class="bi bi-house"></div>
            <span class="title">首页</span>
          </router-link>
        </keep-alive>
      </li>
      <!-- <li>
        <router-link to="/ketang" exact-active-class="active">
          <div class="bi bi-journal-text"></div>
          <span class="title">课堂</span>
        </router-link>
      </li> -->
      <li>
        <router-link to="/huodong" exact-active-class="active">
          <div class="bi bi-gift"></div>
          <span class="title">活动</span>
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/shoucang" exact-active-class="active">
          <div class="bi bi-gem"></div>
          <span class="title">收藏</span>
        </router-link>
      </li> -->
      <li>
        <router-link to="/wode" exact-active-class="active">
          <div class="bi bi-person-circle"></div>
          <span class="title">我的</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
.bottom_nav {
  width: 100%;
  background-color: white;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  .nav {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    display: flex;
    list-style: none;
    justify-content: space-around;
    li {
      flex-basis: 20%;
      text-align: center;
      a {
        width: 100%;
        height: 100%;
        text-decoration: none;
        display: block;
        color: #ccc;
        -webkit-tap-highlight-color: transparent;
      }
      .bi {
        width: 100%;
        height: 50%;
        font-size: 20px;
        line-height: 32px;
      }
      .title {
        display: block;
        width: 100%;
        height: 50%;
        font-size: 16px;
        line-height: 25px;
      }
    }
  }
  .active {
    color: #f6b157 !important;
  }
}
</style>