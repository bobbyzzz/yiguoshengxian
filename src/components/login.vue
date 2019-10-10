<template>
  <div class="login-box">
    <!-- 输入框 -->
    <div class="header">
      <div class="username-box">
        <img
          src="../static/img/icon_username.png"
          class="ueser-icon"
        />
        <input v-model="userName" class="uesername" type="text" placeholder="请输入您的用户名" />
      </div>
      <div class="password-box">
        <img
          src="../static/img/icon_password.png"
          class="ueser-icon"
        />
        <input v-model="password" class="password" type="password" placeholder="请输入您的密码" />
      </div>

      <!-- 随机验证 -->
      <div class="code-box">
        <input class="code-input" type="text" v-model="inputInfo" placeholder="请输入验证码" />
        <span class="code-style" @click="createCode">{{verificationCode}}</span>
      </div>

      <!-- 短信验证 -->
      <!-- <van-cell-group class="sms">
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>-->
    </div>
    <!-- 忘记密码 -->
    <div class="forget-box" @click="toForget">忘记密码？</div>
    <!-- 提交按钮 -->
    <div class="submit-box">
      <button class="submit-login" @click="confirmTheCode">登录</button>
      <button class="submit-register" @click="toRegister">立即注册</button>
    </div>
    <!-- logo -->
    <div class="logo-box">
      <img src="//img02.yiguo.com/e/web/150924/00982/140710/yiguo_logo.png" alt />
    </div>
    <div class="footer-box"></div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      sms: "",
      userName: "",
      password: "",
      inputInfo: "", //用户输入信息
      verificationCode: "" //生成的验证码
    };
  },
  methods: {
    createCode() {
      //通过随机数生成验证码
      this.verificationCode = "";
      var code = "";
      var codeLength = 4; //验证码长度
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36);
        code += random[index];
      }
      this.verificationCode = code;
    },
    confirmTheCode() {
      //获取本地存储的数据
      var userData = JSON.parse(sessionStorage.getItem("key1") || '[]')
      // console.log(userData[0])
      //验证函数
      var customerCode = this.inputInfo.toUpperCase(); //把你输入的小写转化为大写
      if (this.userName == "") {
        this.$toast("用户名不能为空");
      } else if (this.password == "") {
        this.$toast("密码不能为空");
      } else if (customerCode == 0) {
        this.createCode();
        this.inputInfo = "";
        this.$toast("请输入验证码");
      } else if (customerCode != this.verificationCode) {
        this.createCode();
        this.inputInfo = "";
        this.$toast("验证码不正确，请重新输入");
      }else if(this.userName != userData[0].userName || this.password != userData[0].password){
        this.createCode();
        this.inputInfo = "";
        this.$toast("用户名或密码错误，请重新输入");
      } else {
        this.$router.push("/mine");
      }
    },

    //注册跳转
    toRegister() {
      this.$router.push("/register");
    },

    //忘记密码跳转
    toForget() {
      this.$router.push("/forget");
    }
  },
  mounted() {
    this.createCode();
  }
};
</script>
<style scoped>
@import "../static/css/login.css";
</style>