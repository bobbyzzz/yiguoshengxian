<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title'></router-view>
    <myFooter class="footer"></myFooter>
  </div>
</template>

<script>
import myFooter from './components/footer.vue'

export default {
  name: 'app',
  components: {
    myFooter
  }
}

// 屏幕自适应宽度
setFont();

function setFont() {
  var width = document.documentElement.clientWidth || document.body.clientWidth;
  document.querySelector("html").style.fontSize = width / 3.75 + "px";
}
document.body.onresize = function() {
  setFont();
};
</script>

<style scoped>
@import './static/css/base.css';
</style>