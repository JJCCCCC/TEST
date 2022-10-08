<template>
  <div class="noteInformation">
    <loading v-if="note.length == 0"></loading>
    <div class="publickerInfo" v-if="note.length != 0">
      <router-link to="/home"><span class="iconfont">&#xe628;</span></router-link>
      <div class="publicer">
        <div class="ic">
          <img
            :src="note[0].author.p"
            alt=""
          />
        </div>
        <div class="ccc">
          <div class="name">
            {{note[0].author.n}}
            <span class="vip">vip</span>
            <span class="lvl">Lv{{note[0].author.lvl}}</span>
          </div>
          <div class="time">{{note[0].straight_text}}</div>
        </div>
        <div class="box"></div>
        <div class="guanzhu">关注</div>
        <div class="pot">...</div>
      </div>
    </div>
    <div class="imgBox" v-if="note.length != 0">
      <img
        :src="note[0].images[0].u"
        alt=""
      />
    </div>
    <div class="noteContent" v-if="note.length != 0">
      <h6 class="title">{{note[0].title}}</h6>
      <div class="text">
          <span class="textItem" v-for="(items,index) in note[0].contents" v-bind:key="index" :style="`color:${items.color}`">
              {{items.c}}
          </span>
      </div>
      <div class="textbottom">
        <div class="time">{{note[0].publishtime}}</div>
        <div class="count">{{note[0].like_count_text}}次赞</div>
      </div>
      <div class="comments">
        <h6 class="title">笔记讨论</h6>
        <div class="public">
            <input type="text" placeholder="说点什么，让TA也认识爱做饭的你">
        </div>
        <ul class="commentList">
            <li v-for="item in note[0].cs" v-bind:key="item.id">
                <div class="readerInfo">
                    <div class="readerIcon">
                        <img :src="item.u.p" alt="">
                    </div>
                    <div class="reader">
                        <div class="readerName">{{item.u.n}}<i>Lv{{item.u.lvl}}</i></div>
                        <div class="city">{{item.at}}</div>
                    </div>
                    <div class="like">
                        <i class="bi bi-heart"></i>
                        {{item.like_count == 0 ? '赞' : item.like_count}}
                    </div>
                </div>
                <div class="content">
                    {{item.content[0].c}}
                </div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import loading from '../components/comp-loading.vue'
export default {
  name: "noteInformation",
  components:{
    loading
  },
  data() {
    return {
        note:[]
    };
  },
  methods: {
    getData(id) {
      let promise = axios.get(
        `https://apis.netstart.cn/douguo/note/detail/${id}`
      );
      promise.then((data) => {
        if (data.status == 200) {
          //   this.recipe.push(data.data.result.recipe);
          this.note.push(data.data.result.note)
          // console.log(this.note)
        }
      });
    },
  },
  created() {
    let id = this.$route.query.id;
    this.getData(id);
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
}
.noteInformation {
  padding-bottom: 60px;
  width: 100%;
  .publickerInfo {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    display: flex;
    padding: 0 15px;
    box-sizing: border-box;
    a {
      display: block;
      color: black;
      text-decoration: none;
      width: 40px;
      height: 100%;
      text-align: center;
      line-height: 40px;
      font-size: 26px;
      span{
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
      }
    }
    .publicer {
      height: 100%;
      display: flex;
      align-items: center;
    //   justify-content: space-between;
      .ic {
        width: 40px;
        height: 100%;
        margin: 0 10px;
        img {
          width: 100%;
          height: 40px;
          border-radius: 50%;
        }
      }
      .ccc {
        height: 100%;
        font-size: 16px;
        // flex: 1;
        .name {
          font-weight: bold;
        }
        .time {
          margin-top: 3px;
          color: #ccc;
          font-size: 14px;
        }
      }
      .logo {
        font-size: 14px;
        .vip {
          margin-right: 2px;
        }
      }
      .box{
          width: 20px;
          height: 100%;
          flex: 1;
      }
      .guanzhu {
        background-color: #fac548;
        text-align: center;
        width: 70px;
        height: 30px;
        border-radius: 15px;
        line-height: 30px;
        font-size: 16px;
        // margin-left: 40px;
        // flex: 1;
        // margin-left: 20px;
      }
      .pot {
        font-size: 18px;
        font-weight: bold;
        margin-left: 15px;
        height: 100%;
        line-height: 30px;
      }
    }
  }
  .imgBox {
    width: 100%;
    margin-top: 10px;
    img {
      width: 100%;
    }
  }
  .noteContent {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .text {
      color: #333333;
      font-size: 18px;
      .activity {
        color: #fac548;
      }
    }
    .textbottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #ccc;
      margin-top: 10px;
    }
    .comments{
        width: 100%;
        .public{
            width: 100%;
            height: 40px;
            margin-bottom: 10px;
            input{
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 20px;
                border: none;
                outline: none;
                background-color: #f6f6f6;
                box-sizing: border-box;
                padding-left: 20px;
            }
        }
        .commentList{
            margin: 0;
            padding: 0;
            list-style: none;
            width: 100%;
            li{
                border-bottom: 2px dashed #fac548;
                padding-bottom: 5px;
                width: 100%;
                .readerInfo{
                    height: 50px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    .readerIcon{
                        width: 50px;
                        height: 100%;
                        text-align: center;
                        line-height: 50px;
                        img{
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                        }
                    }
                    .reader{
                        font-size: 16px;
                        flex: 1;
                        .readerName{
                            font-weight: bold;
                            i{
                                font-weight: normal;
                                display: inline-block;
                                margin-left: 5px;
                                color: #fac548;
                            }
                        }
                        .city{
                            color: #ccc;
                            font-size: 14px;
                        }
                    }
                    .like{
                        font-size: 16px;
                        // margin-left: 150px;
                    }
                }
                .content{
                    padding-left: 50px;
                    font-size: 16px;
                    margin-top: 3px;
                }
            }
        }
    }
  }
}
</style>