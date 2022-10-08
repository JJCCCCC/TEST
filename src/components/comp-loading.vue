<template>
  <div class="loading">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  ul {
    display: flex;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 0;
    list-style: none;
    li {
      height: 60px;
      width: 3px;
      background-color: #f6b157;
      margin: 0 7px;
      animation-name: myAnimate;
      animation-duration: .5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      &:nth-child(1) {
          animation-delay: 0s;
      }
      &:nth-child(2) {
          animation-delay: .2s;
      }
      &:nth-child(3) {
          animation-delay: .1s;
      }
      &:nth-child(4) {
          animation-delay: .3s;
      }
      &:nth-child(5) {
          animation-delay: .4s;
      }
    }
  }
}

// 1.0 定义动画
@keyframes myAnimate {
  0% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1.5);
  }
  100% {
    transform: scaleY(.5);
  }
}
</style>