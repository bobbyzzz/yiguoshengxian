<template>
  <div>
    <van-tabbar v-model="active" route fixed>
      <van-tabbar-item v-for="(item, index) in imgData" :key="index" :to="item.routerName">
        <span>{{item.name}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      imgData: [
        {
          name: "首页",
          normal: require("../static/img/footer/home.png"),
          active: require("../static/img/footer/home_active.png"),
          routerName: "/home"
        },
        {
          name: "分类",
          normal: require("../static/img/footer/sort.png"),
          active: require("../static/img/footer/sort_active.png"),
          routerName: "/sort"
        },
        {
          name: "吃饭吧",
          normal: require("../static/img/footer/eat.png"),
          active: require("../static/img/footer/eat.png"),
          routerName: "/eat"
        },
        {
          name: "购物车",
          normal: require("../static/img/footer/shopcar.png"),
          active: require("../static/img/footer/shopcar_active.png"),
          routerName: "/shopcar"
        },
        {
          name: "我的易果",
          normal: require("../static/img/footer/mine.png"),
          active: require("../static/img/footer/mine_active.png"),
          routerName: "/mine"
        }
      ]
    };
  }
};
</script>

<style scoped>
.footer {
  width: 3.75rem;
  height: 0.5rem !important;
  font-size: 0.13rem !important;
  margin-top: 0rem !important;
}
.footer .van-hairline--top-bottom {
  width: 3.75rem;
  height: 0.5rem !important;
}
.footer .van-hairline--top-bottom .van-tabbar-item {
  height: 0.5rem !important;
}
.van-tabbar-item--active {
  color: #11b57c;
}
.van-tabbar-item__icon > img {
  width: 0.308rem;
  height: 0.22rem;
  /* height: .2173rem; */
}
.van-tabbar-item__text span{
  font-size: 0.13rem !important;
}
</style>
