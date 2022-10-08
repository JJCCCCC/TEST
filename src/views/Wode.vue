<template>
  <!-- <div class="wode">
    <h1>欢迎使用简单菜谱</h1>
    <div class="userBox">
      <div class="userIcon"><img src="https://i1.douguo.com/upload/caiku/e/9/9/140_e9153058cf670caa19f43c5d45cb0a19.jpg" alt=""></div>
      <div class="userName">admin</div>
    <div >我的收藏</div>
    </div>
  </div> -->

  <div class="personal">
    <div class="userInfo">
      <div class="useIcon">
        <img src="../assets/img/avatar.jpg" alt="" />
      </div>
      <div class="userName">
        HJC
        <div class="id">
        吃货不是在吃，就是在吃的路上            
        <i></i>
        </div>
      </div>
      <div class="setting">
        <i class="bi bi-gear"></i>
      </div>
    </div>
    <div class="order">
      <div class="title" @click="jump">
        <div>我的收藏</div>
        <div>全部收藏<i class="bi bi-chevron-right"></i></div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
// h1{
//   background-color: #f6b157 !important;
//   text-align: center;
//   font-size: 24px;
//   margin: 0;
// }
// .userBox{
//   display: flex;
//   line-height: 60px;
//   background-color: #f6b157 !important;
//   .userIcon{
//     width: 60px;
//     height: 60px;
//     border-radius: 50%;
//     overflow: hidden;
//     margin-left: 20px;
//     img{
//       width: 100%;
//       height: 100%;
//     }
//   }
// }


.personal {
  width: 100%;
  overflow-x: hidden;
  min-height: 667px;
  background-color: rgb(245, 245, 245);

  .userInfo {
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    background-color: rgb(246, 177, 87);
    position: relative;
    height: 95px;
    .useIcon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userName {
      margin-left: 10px;
      font-size: 14px;
      color: #fff;
      .id {
        margin-top: 2px;
        color: hsla(0, 0%, 100%, 0.6);
      }
    }
    .box {
      position: relative;
      width: 90px;
      height: 100%;
      .level {
        background-color: rgba(0, 0, 0, 0.2);
        width: 76px;
        height: 18px;
        border-radius: 10px;
        font-size: 12px;
        color: #fff;
        text-align: right;
        padding-right: 5px;
        box-sizing: border-box;
        position: absolute;
        right: 5px;
        top: 30px;
      }
    }
    .setting {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 20px;
      top: 25px;
      color: #fff;
      font-size: 20px;
    }
  }
  .myMoney {
    width: 100%;
    height: 70px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    position: relative;
    .mark {
      width: 100%;
      height: 30px;
      background-color: rgb(233, 51, 35);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
    }
    .money {
      width: 355px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      background-color: white;
      align-items: center;
      position: absolute;
      border-radius: 5px;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // border: 1px solid black;
      li {
        flex-basis: 33%;
        display: flex;
        height: 50px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #eee;
        .title {
          //   margin-top: 10px;
          //   margin-bottom: 5px;
          color: #aaa;
          font-size: 14px;
          width: 100%;
          text-align: center;
          height: 17px;
        }
        .item {
          //   margin-bottom: 5px;
          width: 100%;
          text-align: center;
          height: 21px;
          color: #282828;
          font-size: 18px;
        }
      }
    }
  }
  .order {
    width: 100%;
    box-sizing: border-box;
    // margin-top: 10px;
    border-radius: 5px;
    color: #666;
    .title {
      width: 100%;
      height: 44px;
      padding-left: 15px;
      padding-right: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      background-color: white;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      border-bottom: 1px dashed #eee;
    }
    .orderContent {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      box-sizing: border-box;
      background-color: white;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      height: 80px;
      display: flex;
      font-size: 14px;
      color: #454545;
      .item {
        flex-basis: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .imgBox {
          width: 100%;
          height: 21px;
          text-align: center;
          margin-top: 12px;
          img {
            height: 100%;
            width: 24.5px;
          }
        }
        .text {
          margin-bottom: 12px;
        }
      }
    }
  }
  .poster {
    width: 345px;
    height: 272px;
    margin: 20px auto;
    overflow: hidden;
    border-radius: 15px;
    img {
      width: 100%;
    }
  }
}
</style>

<script>
export default {
  name: "wode",
  created() {
    // console.log(window.clearInterval(time))
  },
  methods: {
    jump() {
      this.$router.push("/shoucang");
    },
  },
};
</script>