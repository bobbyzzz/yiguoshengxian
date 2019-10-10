<template>
  <div class="register-box">
    <div class="header-box">
      <!-- 短信验证 -->
      <van-cell-group class="sms">
        <van-field
          type="text"
          id="phone"
          maxlength="11"
          clearable
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          v-model="userName"
          center
          placeholder="请输入您的手机号"
        >
          <van-button class="sms-button" slot="button" size="small" type="primary">获取验证码</van-button>
        </van-field>
      </van-cell-group>
      <!-- 输入框 -->
      <input class="header-input" v-model="yzm" type="text" placeholder="请输入您的验证码" />
      <input class="header-input" v-model="password" type="password" placeholder="请设定您不少于6位数的密码" />
      <input class="header-input" v-model="newPassword" type="password" placeholder="请再次输入您的密码" />
    </div>
    <!-- 条款 -->
    <div class="clause-box">
      <input type="checkbox" v-model="checkbox" />
      <p class="clause-txt">
        我已阅读
        <span @click="toAgreement">《易果服务协议》</span>
        <span @click="toPrivacy">《隐私条款》</span>并同意
      </p>
    </div>
    <div class="button-box">
      <button @click="toRegister" class="button-txt">注册</button>
    </div>
    <div class="footer-box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      yzm: "",
      password: "",
      newPassword: "",
      checkbox: ""
    };
  },
  methods: {
    konData() {
      this.yzm = "";
      this.newPassword = "";
      this.password = "";
      this.userName = "";
      this.checkbox = ''
    },

    toRegister() {
      if (this.userName == "") {
        this.konData()
        this.$toast("手机号不能为空");
      } else if (this.userName.length < 11) {
        this.konData()
        this.$toast("请输入正确的手机号");
      } else if (this.yzm == "") {
        this.konData()
        this.$toast("验证码不能为空");
      } else if (this.yzm.length < 6 || this.yzm.length > 7) {
        this.konData()
        this.$toast("请输入6位数验证码");
      } else if (this.password == "") {
        this.konData()
        this.$toast("密码不能为空");
      } else if (this.password.length < 6) {
        this.konData()
        this.$toast("密码不能少于6位");
      } else if (this.newPassword == "" || this.newPassword != this.password) {
        this.konData()
        this.$toast("两次密码不一致");
      } else if (this.checkbox == "") {
        this.konData()
        this.$toast("请阅读协议并同意");
      } else {
        // 存储数据到本地
        var comment = { userName: this.userName, password: this.password };
        var userData = JSON.parse(sessionStorage.getItem("key1") || "[]");
        userData.unshift(comment);
        //重新保存最新的用户信息
        sessionStorage.setItem("key1", JSON.stringify(userData));
        this.userName = this.password = "";
        this.$emit("func");
        //清除key[1]的数据
        sessionStorage.removeItem("key1[1]");
        this.$router.push("/login");
      }
    },
    toAgreement() {
      this.$router.push("/agreement");
    },
    toPrivacy() {
      this.$router.push("/privacy");
    }
  }
};
</script>
<style scoped>
@import "../static/css/register.css";
</style>