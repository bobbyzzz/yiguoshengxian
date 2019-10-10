<template>
  <div class="mime-box">
    <!-- 头部 -->
    <div class="header">
      <div class="header-left">
        <img
          class="user-img"
          src="../static/img/no-pic.jpg"
          alt="用户头像"
        />
        <a href="javascript:;" @click="toLogin">
          <p class="text">
            <span>登录</span>
            /
            <span>注册</span>
          </p>
          <!-- <div class="userName" v-show="isShow1">
            <p class="text" v-show="isShow1" v-for="(items, indexs) in userNameData" :key="indexs">
              <span>{{items}}</span>
            </p>
            <button v-show="isShow1" @click.stop="tuichu" >退出</button>
          </div> -->
        </a>
      </div>
      <div class="header-right">
        <i class="header-icon" @click="getSetData"></i>
      </div>
    </div>
    <!-- 余额 -->
    <div class="pice-box">
      <div class="pice-balance" @click="toLogin">
        <p>-</p>
        <p>卡包余额</p>
      </div>
      <div class="pice-coin" @click="toLogin">
        <p>-</p>
        <p>悠币</p>
      </div>
    </div>
    <!-- 待支付 -->
    <div class="order-box">
      <div class="order-left">
        <a
          href="javascript:;"
          class="order"
          v-for="(item, index) in mineData.OrderIcons"
          :key="index"
          @click="toLogin"
        >
          <img class="order-icon" :src="item.IconUrl" alt />
          <p class="order-txt">{{item.IconText}}</p>
        </a>
      </div>
      <div class="order-right">
        <a class="right-a" href="javascript:;" @click="toLogin">
          <img
            class="right-icon"
            src="../static/img/allorder.png"
            alt
          />
          <p class="right-txt">全部订单</p>
        </a>
      </div>
    </div>
    <!-- 小图标链接 -->
    <div class="link-box">
      <a
        href="javascript:;"
        @click="toLogin"
        class="link"
        v-for="(items, indexs) in mineData.IconList"
        :key="indexs"
      >
        <img class="link-icon" :src="items.IconUrl" alt />
        <p class="link-txt">{{items.IconName}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mineData: "",
      // userNameData: "",
      // isShow: true,
      // isShow1: false
    };
  },
  methods: {
    getMineData() {
      this.$axios
        .get(
          "https://mock.yonyoucloud.com/mock/2164/mine/mineList"
        )
        .then(res => {
          // console.log(res.data.Data.UserInfo);
          this.mineData = res.data.Data.UserInfo;
        });
    },
    // userData() {
    //   var userData = JSON.parse(localStorage.getItem("key1") || "[]");
    //   this.userNameData = userData[0];
    //   console.log(this.userNameData);
    //   if (this.userNameData != "") {
    //     this.isShow = false;
    //     this.isShow1 = true;
    //   }
    // },
    // tuichu(){
    //   localStorage.removeItem('key1');
    //   this.isShow = true
    //   this.isShow1= false
    // },
    toLogin() {
      this.$router.push("/login");
    },
    getSetData(){
      this.$router.push("/set");
    },
  },
  created() {
    this.getMineData();
    // this.userData();
  }
};
</script>

<style scoped>
@import "../static/css/mine.css";
</style>
