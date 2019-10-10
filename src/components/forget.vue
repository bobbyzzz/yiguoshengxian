<template>
  <div class="forget-box">
    <div class="header-box">
      <!-- 短信验证 -->
      <van-cell-group class="sms">
        <van-field
          type="text"
          id="phone"
          maxlength="11"
          clearable
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          v-model="sms"
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
    <div class="button-box">
      <button @click="toReturn" class="button-return">返回</button>
      <button @click="toRegister" class="button-txt">确认</button>
    </div>
    <div class="footer-box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sms: "",
      yzm: "",
      password: "",
      newPassword: "",
      checkbox: ""
    };
  },
  methods: {
    toRegister() {
      if (this.sms == "") {
        this.$toast("手机号不能为空");
      } else if (this.sms.length < 11) {
        this.$toast("请输入正确的手机号");
      } else if (this.yzm == "") {
        this.$toast("验证码不能为空");
      } else if (this.yzm.length < 6 || this.yzm.length > 7) {
        this.$toast("请输入6位数验证码");
      } else if (this.password == "") {
        this.$toast("密码不能为空");
      } else if (this.password.length < 6) {
        this.$toast("密码不能少于6位");
      } else if (this.newPassword == "" || this.newPassword != this.password) {
        this.$toast("两次密码不一致");
      } else {
        this.$router.push("/login");
      }
    },
    toReturn() {
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
@import "../static/css/forget.css";
</style>